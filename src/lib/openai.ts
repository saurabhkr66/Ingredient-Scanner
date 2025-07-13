import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
  dangerouslyAllowBrowser: true,
});
export default openai;
