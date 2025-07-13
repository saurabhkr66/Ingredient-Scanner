import { NextResponse, NextRequest } from "next/server";
import History from "@/models/History.model";
import { dbConnect } from "@/lib/db";
import openai from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import UserModel, { IUser } from "@/models/User.model";

const food = `You are a health and nutrition expert. A user will enter a list of ingredients.
1. Categorize each ingredient as **Healthy, Neutral, or Unhealthy**, explaining why with percentage 0 to 100 according to safety.
2. Provide a **Health Score (1-100)** based on overall ingredient quality.
3. Highlight **positive & negative aspects**.
4. Give a **Daily Consumption Guide** (Safe / Moderate / Avoid).
5. Warn about **allergens & health risks**.
6. Output in **JSON format** with structure:
{
  title: string,
  ingredients: {
    name: string,
    category: "Healthy" | "Neutral" | "Unhealthy",
    reason: string,
    percentage: string
  }[],
  health_score: number,
  positive_aspects: string[],
  negative_aspects: string[],
  daily_consumption_guide: string,
  allergens_health_risks: string[],
  healthier_alternatives: string[],
  eco_friendliness: {
    vegan: "true" | "false",
    Cruelty_Free: "true" | "false",
    Biodegradable: "true" | "false"
  },
  usageInstructions: {
    whenToUse: string,
    howMuchToUse: string,
    howToUse: string
  }
}
If ingredients are invalid, respond with: "Please upload a valid food product ingredient list."`;

const cosmetic = `You are a cosmetic ingredient analysis expert. A user will enter a list of cosmetic ingredients.
1. Categorize each as **Healthy, Neutral, or Unhealthy** with explanations.
2. Provide a **Care Rating (1-100)** based on safety & effectiveness.
3. Highlight **long-term effects (skin damage, toxicity, aging)**.
4. Warn about **allergenic and irritating ingredients**.
5. Recommend **better alternative ingredients**.
6. Output in **JSON format** with structure:
{
  title: string,
  ingredients: {
    name: string,
    category: "Healthy" | "Neutral" | "Unhealthy",
    reason: string
  }[],
  care_rating: number,
  long_term_effects: {
    name: string, category: string, notes: string
  }[],
  eco_friendliness: {
    vegan: "true" | "false",
    Cruelty_Free: "true" | "false",
    Biodegradable: "true" | "false"
  },
  allergenic_warning: string,
  recommended_alternatives: {
    name: string,
    replacement_for: string,
    benefit: string
  }[],
  usageInstructions: {
    whenToUse: string,
    howMuchToUse: string,
    howToUse: string
  },
  positive_aspects: string[],
  negative_aspects: string[]
}
If input is invalid, respond with: "Please upload a valid cosmetic product ingredient list."`;

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: "unauthorized access" }, { status: 400 });
    }

    const formData = await req.formData();
    const rawIngredients = formData.get("ingredients") as string;
    const type = formData.get("type") as string;

    if (!rawIngredients) {
      return NextResponse.json({ success: false, error: "No ingredients provided." }, { status: 400 });
    }

    let ingredients: string[];
    try {
      ingredients = JSON.parse(rawIngredients);
    } catch {
      return NextResponse.json({ success: false, error: "Invalid ingredients format." }, { status: 400 });
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({ success: false, error: "Ingredients must be a non-empty list." }, { status: 400 });
    }

    const user = await UserModel.findOne({ userId }).lean<IUser>();
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found." }, { status: 400 });
    }

    if (user.credits && user.credits < 1000) {
      return NextResponse.json({ success: false, error: "Insufficient credits." }, { status: 400 });
    }

    const promptText = `The following are ingredients from a ${type} product:\n${ingredients.join(
      ", "
    )}\n\nPlease analyze them according to the instructions.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: type === "food" ? food : cosmetic,
        },
        {
          role: "user",
          content: promptText,
        },
      ],
      temperature: 1,
      max_tokens: 2000,
    });

    const messages = response.choices[0].message;
    const temp = messages.content?.replace(/^```json\n?|```$/g, "").trim();

    let report;
    try {
      report = JSON.parse(temp || "");
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to parse response from AI. Try clearer input.",
          raw: temp,
        },
        { status: 400 }
      );
    }

    const newHistory = new History({
      messages,
      userId,
      choice: type,
      imageUrl: null, // no image
      imageName: null,
      historyTitle: report.title,
      creditsUsed: response.usage?.total_tokens,
    });

    const savedHistory = await newHistory.save();

    if (user.credits && response.usage?.total_tokens) {
      user.credits = user.credits - response.usage.total_tokens;
      await UserModel.updateOne({ userId }, { credits: user.credits });
    }

    return NextResponse.json(
      { success: true, id: savedHistory._id, choice: type },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error in generate-report route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
