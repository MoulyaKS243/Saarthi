import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// 👇 Add this line
console.log("KEY:", process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are Saarthi, an AI Digital Banking Assistant.

Rules:
- Explain banking in very simple English.
- Help beginners understand UPI, NEFT, IMPS, ATM, Debit Card, Credit Card, and Net Banking.
- Warn users about OTP scams, phishing, and fraud.
- Never ask for PIN, password, or OTP.
- Keep answers short and friendly.

User: ${message}
`,
    });

    return NextResponse.json({
      reply: response.text,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        reply: "Sorry, something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}