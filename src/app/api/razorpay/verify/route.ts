import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import PaymentModel, { IPayment } from "@/models/Payment.model";
import UserModel, { IUser } from "@/models/User.model";
const generatedSignature = (razorpayOrderId: string, razorpayPaymentId: string) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    throw new Error("Razorpay key secret is not defined in environment variables.");
  }
  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "unauthorize" }, { status: 400 });
    }
    const user: IUser | null = await UserModel.findOne({ userId });
    if (!user) {
      return NextResponse.json({ message: "no user with this id exist" }, { status: 400 });
    }
    const { orderCreationId, razorpayPaymentId, razorpaySignature } = await request.json();
    const payment: IPayment | null = await PaymentModel.findOne({ txnId: orderCreationId });
    if (!payment) {
      return NextResponse.json({
        success: false,
        message: `no order this is  ${orderCreationId} exist in database`,
      });
    }
    const signature = generatedSignature(orderCreationId, razorpayPaymentId);
    if (signature !== razorpaySignature) {
      payment.status = "failed";
      await payment.save();
      return NextResponse.json(
        { message: "payment verification failed", isOk: false },
        { status: 400 },
      );
    }
    payment.status = "success";
    user.totalBalance = user.totalBalance ?? 0 + payment.amount;
    await payment.save();
    await user.save();
    return NextResponse.json(
      { message: "payment verified successfully", success: true },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "payment verified falied",
        err: err instanceof Error ? err.message : String(err),
        success: false,
      },
      { status: 500 },
    );
  }
}
