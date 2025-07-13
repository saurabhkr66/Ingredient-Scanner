import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import { dbConnect } from "@/lib/db";

// export async function POST(req: NextRequest) {
//   try {
//     await dbConnect();

//     const CLERK_SIGNING = process.env.CLERK_CLERK_SIGNING;

//     if (!CLERK_SIGNING) {
//       throw new Error("Error: Please add CLERK_SIGNING from Clerk Dashboard to .env or .env");
//     }

//     // Create new Svix instance with secret
//     const wh = new Webhook(CLERK_SIGNING);

//     // Get headers
//     const svix_id = req.headers.get("svix-id");
//     const svix_timestamp = req.headers.get("svix-timestamp");
//     const svix_signature = req.headers.get("svix-signature");

//     if (!svix_id || !svix_timestamp || !svix_signature) {
//       return NextResponse.json("Error: Missing Svix headers", {
//         status: 400,
//       });
//     }

//     const payload = await req.json();
//     const body = JSON.stringify(payload);

//     let _evt: WebhookEvent;
//     try {
//       _evt = wh.verify(body, {
//         "svix-id": svix_id,
//         "svix-timestamp": svix_timestamp,
//         "svix-signature": svix_signature,
//       }) as WebhookEvent;
//     } catch (err) {
//       console.error("Error: Could not verify webhook:", err);
//       return NextResponse.json("Error: Verification error", {
//         status: 400,
//       });
//     }

//     const { id, first_name, last_name, created_at, email_addresses } = payload.data;

//     // const newUser = new User({
//     //   userId: id,
//     //   firstName: first_name,
//     //   lastName: last_name,
//     //   createdAt: created_at,
//     //   emailAddress: email_addresses[0],
//     // });
//      const newUser = new User({
//       userId: "client_2vUIaFkUFU38AIRuKarn0YyRXyG",
//       firstName: "saurabh",
//       lastName: "kumar",
//       createdAt: created_at,
//       emailAddress: "sauravkum4200@gmail.com",
//     });
//    console.log("💾 Saving user to DB...");

// await newUser.save();

// console.log("✅ User saved successfully");

//     return NextResponse.json({ message: "user created successfully " }, { status: 201 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ message: "Internal erorr occured ", err }, { status: 500 });
//   }
// }
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "GET request received" });
}
export async function POST(req: NextRequest) {
  try {
    console.log("📡 Webhook POST received");

    await dbConnect();
    console.log("🔌 Connected to MongoDB");

const CLERK_SIGNING = process.env.CLERK_SIGNING_SECRET;
    if (!CLERK_SIGNING) {
      console.error("❌ Missing CLERK_CLERK_SIGNING in env");
      throw new Error("Please add CLERK_CLERK_SIGNING to .env");
    }

    const wh = new Webhook(CLERK_SIGNING);

    // Extract headers
    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("❌ Missing Svix headers");
      return NextResponse.json("Missing Svix headers", { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);
    console.log("📦 Payload received:", body);

    let _evt: WebhookEvent;
    try {
      _evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
      console.log("✅ Webhook verified successfully");
    } catch (err) {
      console.error("❌ Webhook verification failed:", err);
      return NextResponse.json("Webhook verification failed", { status: 400 });
    }

    const { id, first_name, last_name, created_at, email_addresses } = payload.data;

    console.log("👤 Creating new user with data:");
    console.log("ID:", id);
    console.log("First name:", first_name);
    console.log("Last name:", last_name);
    console.log("Created at:", created_at);
    console.log("Email:", email_addresses?.[0]);

    const newUser = new User({
      userId: id,
      firstName: first_name,
      lastName: last_name,
      createdAt: created_at,
emailAddress: email_addresses?.[0]?.email_address,
    });

    console.log("💾 Saving user to DB...");
    await newUser.save();
    console.log("✅ User saved to MongoDB");

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (err) {
    console.error("❌ Internal server error:", err);
    return NextResponse.json({ message: "Internal error occurred", error: err }, { status: 500 });
  }


}
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const CLERK_SIGNING = process.env.CLERK_SIGNING_SECRET;

    if (!CLERK_SIGNING) {
      throw new Error("Error: Please add CLERK_SIGNING from Clerk Dashboard to .env or .env");
    }

    // Create new Svix instance with secret
    const wh = new Webhook(CLERK_SIGNING);

    // Get headers
    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json("Error: Missing Svix headers", {
        status: 400,
      });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    let _evt: WebhookEvent;
    try {
      _evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error: Could not verify webhook:", err);
      return NextResponse.json("Error: Verification error", {
        status: 400,
      });
    }
    const { id, first_name, last_name, created_at, email_addresses } = payload.data;

    const updatedUser = await User.findOneAndUpdate(
      { userId: id },
      {
        userId: id,
        firstName: first_name,
        lastName: last_name,
        createdAt: created_at,
        emailAddress: email_addresses[0],
      },
      { new: true },
    );
    if (!updatedUser) {
      NextResponse.json({ message: "erorr occur while updating user data " }, { status: 500 });
    }
    NextResponse.json({ message: "user data updated" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "erorr occur", err }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const CLERK_SIGNING = process.env.CLERK_SIGNING;

    if (!CLERK_SIGNING) {
      throw new Error("Error: Please add CLERK_SIGNING from Clerk Dashboard to .env or .env");
    }

    // Create new Svix instance with secret
    const wh = new Webhook(CLERK_SIGNING);

    // Get headers
    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json("Error: Missing Svix headers", {
        status: 400,
      });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    let _evt: WebhookEvent;
    try {
      _evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error: Could not verify webhook:", err);
      return NextResponse.json("Error: Verification error", {
        status: 400,
      });
    }
    const { id } = payload.data;

    const deletedUser = await User.findOneAndDelete({ userId: id }, { new: true });
    if (!deletedUser) {
      return NextResponse.json({ message: "error while deleting user data" }, { status: 500 });
    }
    return NextResponse.json({ message: "  user info deleted" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "erorr occur", err }, { status: 500 });
  }
}
