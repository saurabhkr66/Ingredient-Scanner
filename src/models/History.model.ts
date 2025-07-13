import mongoose, { Schema, Document, model } from "mongoose";

export interface IHistory extends Document {
  userId: string;
  historyTitle: string;
  messages: {
    role: string;
    content: any;
  }[];
  creditsUsed?: number;
  choice?: "food" | "cosmetic";
  createdAt?: Date;
  imageUrl: string;
  imageName: string;
  hidden?: boolean;
}
const HisotrySchema = new Schema<IHistory>(
  {
    userId: { type: String, required: true },
    historyTitle: { type: String, required: true },
    messages: [
      {
        role: {
          type: String,
          enum: ["system", "user", "assistant"],
          required: true,
        },
        content: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
      },
    ],
    creditsUsed: {
      type: Number,
      default: 0,
    },
    choice: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      
    },
    imageName: {
      type: String,
      
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.History || model<IHistory>("History", HisotrySchema);
