import mongoose, { Schema, Document, model } from "mongoose";
export interface IUser extends Document {
  userId: string;
  firstName?: string;
  lastName?: string;
  emailAddress: string;
  createdAt?: Date;
  totalBalance?: number;
  credits?: number;
}
const UserSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    totalBalance: { type: Number, default: 0 },
    credits: { type: Number, default: 0 },
  },
  { timestamps: true },
);
export default mongoose.models.User || model<IUser>("User", UserSchema);
