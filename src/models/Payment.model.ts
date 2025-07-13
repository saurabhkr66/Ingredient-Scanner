import mongoose, { Schema, Document, model } from "mongoose";

export interface IPayment extends Document {
  userId: string;
  amount: number;
  gateway: "paypal" | "razorpay";
  txnId: string; // external payment ID
  status: "pending" | "success" | "failed";
  createdAt?: Date;
}
const PaymentSchema = new Schema<IPayment>(
  {
    amount: { type: Number, required: true },
    userId: { type: String, required: true },
    gateway: { type: String, enum: ["paypal", "razorpay"], required: true },
    txnId: { type: String, unique: true, required: true },
    status: {
      type: String,
      enum: ["pending", "failed", "success"],
      required: true,
      default: "pending",
    },
  },
  { timestamps: true },
);
export default mongoose.models.Payment || model<IPayment>("Payment", PaymentSchema);
