// pages/api/paypal/create-order.ts
import { NextRequest, NextResponse } from "next/server";
import { BASE_URL, generateAccessToken } from "@/lib/paypal";
import { dbConnect } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import PaymentModel from "@/models/Payment.model";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { orderPrice } = await req.json();
    if (!orderPrice) {
      return NextResponse.json({ message: "orderPrice is required" }, { status: 400 });
    }
    const accessToken = await generateAccessToken();

    // PayPal order payload as per documentation

    const { data: order } = await axios.post(
      `${BASE_URL}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: "USD", value: `${orderPrice}` } }],
        description: `Order for ${userId}`,
        custom_id: userId,
        application_context: {
          brand_name: "Purley-Scan",
          return_url: process.env.PAYPAL_RETURN_URL || "http://localhost:3000/pricing",
          cancel_url: process.env.PAYPAL_CANCEL_URL || "http://localhost:3000/pricing",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const payment = new PaymentModel({
      userId,
      amount: orderPrice,
      gateway: "paypal",
      txnId: order.id,
      status: "pending",
    });
    await payment.save();
    // Return only the order id to the client
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    );
  }
}
