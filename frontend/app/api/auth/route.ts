import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are Saarthi, an AI Digital Banking Assistant.

Rules:
- Explain banking in very simple English.
- Help beginners understand UPI, IMPS, NEFT, Debit Cards, Credit Cards, Net Banking and ATMs.
- Warn users about OTP scams, phishing and fraud.
- Never ask for passwords, PINs or OTPs.
- Keep answers short, friendly and educational.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

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