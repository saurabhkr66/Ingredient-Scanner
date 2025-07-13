import { NextResponse, NextRequest } from "next/server";
import History from "@/models/History.model";
import { ChatCompletionContentPart } from "openai/resources/index.mjs";
import { dbConnect } from "@/lib/db";
import openai from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import s3Client, { R2_BUCKET_NAME, R2_WORKSPACE_PUB_ENDPOINT } from "@/lib/cloudflare";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import UserModel, { IUser } from "@/models/User.model";

const food = `You are a health and nutrition expert. A user will upload an image of a food product's ingredient list.
1. Extract the **ingredients** from the image.
2. Categorize each ingredient as **Healthy, Neutral, or Unhealthy**, explaining why with percentage 0 to 100 according to safety of the each ingredient
3. Provide a **Health Score (1-100)** based on overall ingredient quality.
4. Highlight **positive & negative aspects**.
5. Give a **Daily Consumption Guide** (Safe / Moderate / Avoid).
6. Warn about **allergens & health risks**.

8. Output in ** JSON formate ** for better readability and follow structure :"{
    title: string,
    ingredients: {
        name: string,
        category: "Healthy" | "Neutral" | "Unhealthy",
        reason: string;
        percentage:string;
    }[],
    health_score: number,
    positive_aspects: string[],
    negative_aspects: string[],
    daily_consumption_guide: string,
    allergens_health_risks: string[],
    healthier_alternatives: string[],
    eco_friendliness: {
        vegan: "true" | "false"
        Cruelty_Free: "true" | "false",
        Biodegradable: "true" | "false",
    },
    usageInstructions: {
    whenToUse: string;
    howMuchToUse: string;
    howToUse: string;
    
    },
}".
9. Generate an title for product according to product data.
If the image is not a valid cosmetic product ingredient list, or it contains ingredients for a non-cosmetic item, respond with:
"Please upload a valid food product ingredient list."`;
const cosmetic = `You are a cosmetic ingredient analysis expert. A user will upload an image of a personal care product's ingredient list.
1. Extract the **ingredients** from the image.
2. Categorize each as **Safe, Moderate Risk, or Harmful** with explanations.
3. Provide a **Care Rating (1-100)** based on safety & effectiveness.
4. Highlight **long-term effects (skin damage, toxicity, aging)**.
6. Warn about **allergenic and irritating ingredients**.
7. Recommend **better alternative ingredients** if needed.
8. Output in ** JSON formate **  for better readability and follow structure : "{
    title: string,
    ingredients: {
        name: string,
        category: "Healthy" | "Neutral" | "Unhealthy",
        reason: string;
    }[],
    care_rating: number,
    long_term_effects: {
        name: string, category: string, notes: string
    }[],
    eco_friendliness: {
        vegan: "true" | "false"
        Cruelty_Free: "true" | "false",
        Biodegradable: "true" | "false",
    },
    allergenic_warning: string,
    recommended_alternatives: {
        name: string,
        replacement_for: string,
        benefit: string
    }[],
     usageInstructions: {
    whenToUse: string;
    howMuchToUse: string;
    howToUse: string;
    
    },
    positive_aspects: string[],
    negative_aspects: string[],
}".
9. Generate an title for product according to product data.
If the image is not a valid cosmetic product ingredient list, or it contains ingredients for a non-cosmetic item, respond with:
"Please upload a valid cosmetic product ingredient list."`;

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false, error: "unauthorize access" }, { status: 400 });
    }
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const type = formData.get("type") as string;
    console.log("file:", file);
console.log("type:", type);

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }
    const authData = await auth();
console.log("authData:", authData);

    const buffer = Buffer.from(await file.arrayBuffer());
    const imageName = `${Date.now()}-${userId}-${file.name}`;
    const uploadParams = {
      Bucket: R2_BUCKET_NAME,
      Key: imageName,
      Body: buffer,
      ContentType: file.type,
    };
    await s3Client.send(new PutObjectCommand(uploadParams));
    const imageUrl = `${R2_WORKSPACE_PUB_ENDPOINT}/${imageName}`;

    if (!imageUrl || typeof imageUrl !== "string" || !imageUrl.startsWith("http")) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid image URL. Please provide a valid URL.",
        },
        { status: 400 },
      );
    }
      console.log("✅ Buffer created. Size:", buffer.length);
    const prompt: ChatCompletionContentPart[] = [
      {
        type: "text",
        text: `Here is an image containing a ${type} product's ingredient list:`,
      },
      { type: "image_url", image_url: { url: imageUrl } },
    ];
        console.log("✅ Image uploaded to R2. URL:", imageUrl);

    const user = await UserModel.findOne({ userId }).lean<IUser>();
    console.log("userId:", user);
    if (!user) {
      
      return NextResponse.json(
        { success: false, error: "user with this id does not exist" },
        { status: 400 },
      );
    }
    console.log("user:",user);
    if (user.credits && user.credits < 2000) {
      return NextResponse.json({ success: false, error: "Insufficent credits" }, { status: 400 });
    }
    console.log("Prompt going to OpenAI:", JSON.stringify(prompt, null, 2));
console.log("Model:", "gpt-4o");
console.log("imageUrl:", imageUrl);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: type == "food" ? food : cosmetic,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const messages = response.choices[0].message;
   const temp = messages.content?.replace(/^```json\n?|```$/g, "").trim();

let report;
try {
  report = JSON.parse(temp || "");
} catch (err) {
  console.error("❌ Failed to parse OpenAI response as JSON:", temp);
 return NextResponse.json(
  {
    success: false,
    error: "Failed to parse response from AI. Try a clearer image.",
    raw: temp,
  },
  { status: 400 }
);

}


    const newHistory = new History({
      messages,
      userId,
      choice: type,
      imageUrl,
      imageName,
      historyTitle: report.title,
      creditsUsed: response.usage?.total_tokens,
    });

    const savedHistory = await newHistory.save();
    if (user.credits && response?.usage?.total_tokens) {
      user.credits = user.credits - response?.usage?.total_tokens;
      user.save();
    }
    return NextResponse.json(
      { success: true, id: savedHistory._id, choice: type },
      { status: 201 },
    );
  } catch (error) {
    console.log("❌ Error in generate-report route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "internal server error",
      },
      {
        status: 500,
      },
    );
  }
}


// export async function POST(req: NextRequest) {
//   try {
//     await dbConnect();
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ success: false, error: "unauthorized access" }, { status: 400 });
//     }

//     const formData = await req.formData();
//     const file = formData.get("file") as File;
//     const type = formData.get("type") as string;

//     if (!file) {
//       return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());
//     const imageName = `${Date.now()}-${userId}-${file.name}`;
//     const uploadParams = {
//       Bucket: R2_BUCKET_NAME,
//       Key: imageName,
//       Body: buffer,
//       ContentType: file.type,
//     };

//     await s3Client.send(new PutObjectCommand(uploadParams));
//     const imageUrl = `${R2_WORKSPACE_PUB_ENDPOINT}/${imageName}`;

//     if (!imageUrl.startsWith("http")) {
//       return NextResponse.json({ success: false, error: "Invalid image URL" }, { status: 400 });
//     }

//     const prompt: ChatCompletionContentPart[] = [
//       {
//         type: "text",
//         text: `Here is an image containing a ${type} product's ingredient list:`,
//       },
//       { type: "image_url", image_url: { url: imageUrl } },
//     ];

//     const user = await UserModel.findOne({ userId }).lean<IUser>();
//     if (!user) {
//       return NextResponse.json({ success: false, error: "User not found" }, { status: 400 });
//     }

//     if (user.credits && user.credits < 2000) {
//       return NextResponse.json({ success: false, error: "Insufficient credits" }, { status: 400 });
//     }

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o",
//       messages: [
//         {
//           role: "system",
//           content: type === "food" ? food : cosmetic,
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       temperature: 1,
//       max_tokens: 2000,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     });

//     const messages = response.choices[0].message;

//     let report;
//     try {
//       const rawContent = messages.content;
//       console.log("🔍 OpenAI Raw Response:", rawContent);

//       if (!rawContent || !rawContent.includes("{")) {
//         return NextResponse.json(
//           { success: false, error: "OpenAI did not return a valid JSON response." },
//           { status: 400 }
//         );
//       }

//       const cleaned = rawContent.replace(/^```json\n?|```$/g, "").trim();
//       report = JSON.parse(cleaned);
//     } catch (err) {
//       console.error("❌ Failed to parse OpenAI JSON response:", messages.content);
//       return NextResponse.json(
//         { success: false, error: "AI response was not valid JSON format." },
//         { status: 400 }
//       );
//     }

//     const newHistory = new History({
//       messages,
//       userId,
//       choice: type,
//       imageUrl,
//       imageName,
//       historyTitle: report.title,
//       creditsUsed: response.usage?.total_tokens,
//     });

//     const savedHistory = await newHistory.save();

//     if (user.credits && response.usage?.total_tokens) {
//       user.credits -= response.usage.total_tokens;
//       await UserModel.updateOne({ userId }, { credits: user.credits });
//     }

//     return NextResponse.json(
//       { success: true, id: savedHistory._id, choice: type },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("❌ Unexpected Error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: error instanceof Error ? error.message : "Internal server error",
//       },
//       { status: 500 }
//     );
//   }
// }
