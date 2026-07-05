import { groq } from "@/lib/groq";
import { SYSTEM_PROMPTS } from "./prompts";

export type Intent =
  | "learning"
  | "transaction"
  | "fraud"
  | "support"
  | "general";

export interface IntentResult {
  intent: Intent;
  confidence: number;
}

const VALID_INTENTS: Intent[] = [
  "learning",
  "transaction",
  "fraud",
  "support",
  "general",
];

export async function detectIntent(
  message: string
): Promise<IntentResult> {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      temperature: 0,

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPTS.intent,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const content =
      completion.choices[0].message.content ?? "{}";

    const result = JSON.parse(content);

    const intent: Intent = VALID_INTENTS.includes(result.intent)
      ? result.intent
      : "general";

    return {
      intent,
      confidence: Number(result.confidence) || 80,
    };
  } catch (error) {
    console.error("Intent Agent Error:", error);

    return {
      intent: "general",
      confidence: 0,
    };
  }
}