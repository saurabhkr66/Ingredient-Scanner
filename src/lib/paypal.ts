import axios from "axios";
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID as string;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET as string;

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

export async function generateAccessToken(): Promise<string> {
  const auth = `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`;
  try {
    const { data } = await axios.post(
      `${BASE_URL}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
        },
      },
    );
    return data.access_token;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error;
  }
}
