import razorpay from "@/lib/razorpay";
import PaymentModel, { IPayment } from "@/models/Payment.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "unauthorize" }, { status: 400 });
    }
    const { amount, currency } = await request.json();
    const options = {
      amount: amount,
      currency: currency,
      receipt: "rcp1",
    };
    const order = await razorpay.orders.create(options);
    const payment = new PaymentModel({
      txnId: order.id,
      userId,
      status: "pending",
      gateway: "razorpay",
    }) as IPayment;
    await payment.save();
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err instanceof Error ? err.message : err }, { status: 500 });
  }
}
