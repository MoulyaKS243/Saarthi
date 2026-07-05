import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is missing in .env.local");
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});