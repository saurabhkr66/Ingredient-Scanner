import mongoose from "mongoose";
const url = process.env.MONGODB_URI || ("" as string);
if (!url) {
  throw new Error("please define the mongodb url in env");
}
export async function dbConnect(): Promise<void> {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
