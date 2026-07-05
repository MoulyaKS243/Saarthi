import { groq } from "@/lib/groq";
import { SYSTEM_PROMPTS } from "./prompts";

export type RecommendationPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export type RecommendationAction =
  | "OPEN_LEARNING"
  | "OPEN_SIMULATOR"
  | "OPEN_DASHBOARD"
  | "OPEN_PROFILE"
  | "READ_ARTICLE"
  | "WATCH_VIDEO";

export interface Recommendation {
  title: string;
  description: string;
  priority: RecommendationPriority;
  action: RecommendationAction;
  route: string;
}

export interface RecommendationInput {
  message: string;

  memory: {
    level: string;

    adoptionScore: number;

    completedLessons: string[];

    completedSimulations: string[];

    fraudTopicsLearned: string[];
  };
}

export async function generateRecommendations(
  input: RecommendationInput
): Promise<Recommendation[]> {
  try {
    const prompt = `
User Message:
${input.message}

Current User Progress

Level:
${input.memory.level}

Adoption Score:
${input.memory.adoptionScore}

Completed Lessons:
${input.memory.completedLessons.join(", ") || "None"}

Completed Simulations:
${input.memory.completedSimulations.join(", ") || "None"}

Fraud Topics:
${input.memory.fraudTopicsLearned.join(", ") || "None"}

Return ONLY JSON.

Example:

{
  "recommendations":[
    {
      "title":"Practice UPI",

      "description":"Complete your first UPI transaction.",

      "priority":"HIGH",

      "action":"OPEN_SIMULATOR",

      "route":"/simulator"
    }
  ]
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      temperature: 0.4,

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPTS.recommendation,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content =
      completion.choices[0].message.content ?? "{}";

    const result = JSON.parse(content);

    if (!Array.isArray(result.recommendations)) {
      return [];
    }

    return result.recommendations;
  } catch (error) {
    console.error("Recommendation Agent Error:", error);

    return [];
  }
}