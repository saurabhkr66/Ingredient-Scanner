import { NextRequest, NextResponse } from "next/server";
import History from "@/models/History.model";
import { dbConnect } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Report } from "@/types";
import s3Client, { R2_BUCKET_NAME } from "@/lib/cloudflare";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Types } from "mongoose";
export async function GET(_req: NextRequest) {
  try {
    const { userId } = await auth();
    await dbConnect();
    if (!userId) {
      return NextResponse.json({ success: false, error: "unauthorize" }, { status: 400 });
    }
    const history = await History.find({ userId }).lean<Report[]>();

    const reports = history.map(({ messages: _m, ...reports }) => {
      return reports;
    });
    return NextResponse.json({ success: true, reports }, { status: 200 });
  } catch (err) {

    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "internal server error",
      },
      { status: 500 },
    );
  }
}
// export async function POST(req: NextRequest) {
//   try {
//     await dbConnect();
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ success: false, error: "unauthorize" }, { status: 400 });
//     }
//     const { id } = await req.json();
//     const history = await History.findById(id).lean<Report>();
//     if (!history) {
//       return NextResponse.json(
//         { success: false, error: "no report found with this id" },
//         { status: 500 },
//       );
//     }
//     const { messages, ...report } = history;
//     if (!messages) {
//       return NextResponse.json(
//         { success: false, error: "no content found in this report" },
//         { status: 500 },
//       );
//     }
//     return NextResponse.json(
//       {
//         success: true,
//         data: { messages, type: report.choice, imageUrl: report.imageUrl },
//       },
//       { status: 200 },
//     );
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       {
//         success: false,
//         error: err instanceof Error ? err.message : "internal server error",
//       },
//       { status: 500 },
//     );
//   }
// }


// Optional: Zod validation if you prefer it
// import { z } from "zod";
// const schema = z.object({ id: z.string().length(24) });

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: "unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const id = typeof body.id === "string" ? body.id : body.id?.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid report ID" }, { status: 400 });
    }

    // 👇 Add type inference here
    const history = await History.findById(id).lean<IHistory>();
    if (!history) {
      return NextResponse.json(
        { success: false, error: "No report found with this ID" },
        { status: 404 }
      );
    }

    const { messages, choice, imageUrl } = history;

    if (!messages) {
      return NextResponse.json(
        { success: false, error: "No content found in this report" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          messages,
          type: choice,
          imageUrl,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in report route:", err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: "unauthorize" }, { status: 400 });
    }
    const { id } = await req.json();
    const history = await History.findOneAndDelete({ _id: id }).lean<Report>();
    if (!history) {
      return NextResponse.json(
        { success: false, error: "no history with this id exist " },
        { status: 400 },
      );
    }
    if (history.imageName) {
      const deleteParams = {
        Bucket: R2_BUCKET_NAME,
        Key: history.imageName,
      };
      await s3Client.send(new DeleteObjectCommand(deleteParams));
    }

    return NextResponse.json(
      { success: true, message: "history deleted successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      
      {
        success: false,
        error: err instanceof Error ? err.message : "internal server error",
      },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: "unauthorize" }, { status: 400 });
    }
    const { id, tittle, hidden, type } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, error: "history id is required" },
        { status: 400 },
      );
    }
    let updatedHistory: Report | null = null;

    if (typeof hidden === "boolean" && tittle) {
      updatedHistory = await History.findByIdAndUpdate(
        id,
        { hidden, historyTitle: tittle },
        { new: true, runValidators: true },
      ).lean<Report>();
    } else if (tittle) {
      updatedHistory = await History.findByIdAndUpdate(
        id,
        { historyTitle: tittle },
        { new: true, runValidators: true },
      ).lean<Report>();
    } else if (typeof hidden === "boolean") {
      updatedHistory = await History.findByIdAndUpdate(
        id,
        { hidden },
        { new: true, runValidators: true },
      ).lean<Report>();
    }
    if (type) {
      updatedHistory = await History.findByIdAndUpdate(
        id,
        { choice: type },
        { new: true, runValidators: true },
      ).lean<Report>();
    }
    if (!updatedHistory) {
      return NextResponse.json(
        { success: false, error: "no history found with give id" },
        { status: 400 },
      );
    }
    const { messages: _m, ...report } = updatedHistory;

    return NextResponse.json({ success: true, report }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "internal server error",
      },
      { status: 500 },
    );
  }
}
