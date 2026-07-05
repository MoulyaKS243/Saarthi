import { groq } from "@/lib/groq";
import { SYSTEM_PROMPTS } from "./prompts";

export type FraudRisk =
  | "SAFE"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export interface FraudAnalysis {
  risk: FraudRisk;
  score: number;
  safe: boolean;
  reason: string;
  actions: string[];
}

const VALID_RISKS: FraudRisk[] = [
  "SAFE",
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
];

export async function analyzeFraud(
  message: string
): Promise<FraudAnalysis> {
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
          content: SYSTEM_PROMPTS.fraud,
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

    return {
      risk: VALID_RISKS.includes(result.risk)
        ? result.risk
        : "SAFE",

      score: Number(result.score) || 0,

      safe:
        typeof result.safe === "boolean"
          ? result.safe
          : true,

      reason:
        result.reason ??
        "No fraud indicators detected.",

      actions: Array.isArray(result.actions)
        ? result.actions
        : [],
    };
  } catch (error) {
    console.error("Fraud Agent Error:", error);

    return {
      risk: "SAFE",
      score: 0,
      safe: true,
      reason: "Unable to analyze the message.",
      actions: [],
    };
  }
}