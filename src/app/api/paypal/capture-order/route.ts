import { NextRequest, NextResponse } from "next/server";
import { BASE_URL, generateAccessToken } from "@/lib/paypal";
import { dbConnect } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import axios, { AxiosError } from "axios";
import PaymentModel from "@/models/Payment.model";
import UserModel, { IUser } from "@/models/User.model";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user: IUser | null = await UserModel.findOne({ userId });
    if (!user) {
      return NextResponse.json(
        { message: "user with this id does not exist is db" },
        { status: 400 },
      );
    }
    const { orderID } = await req.json();
    if (!orderID) {
      return NextResponse.json({ message: "orderID is required" }, { status: 400 });
    }

    const payment = await PaymentModel.findOne({ txnId: orderID });
    if (!payment) {
      return NextResponse.json(
        { message: "No payment record found for this orderID" },
        { status: 400 },
      );
    }
    try {
      const accessToken = await generateAccessToken();
      const { data } = await axios.post(
        `${BASE_URL}/v2/checkout/orders/${orderID}/capture`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json; charset=UTF-8",
          },
        },
      );

      payment.status = "success";
      user.totalBalance = user.totalBalance ?? 0 + payment.amount;
      await payment.save();
      await user.save();
      return NextResponse.json({ success: true, order: data }, { status: 200 });
    } catch (err) {
      console.error("PayPal capture error:", err);

      payment.status = "failed";
      await payment.save();

      const errorMessage = err instanceof AxiosError ? err.response?.data || err.message : err;

      return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
  } catch (err) {
    console.error("Server error while capturing payment:", err);
    const errorMessage = err instanceof AxiosError ? err.response?.data || err.message : err;
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
