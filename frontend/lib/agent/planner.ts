import { groq } from "@/lib/groq";
import { SYSTEM_PROMPTS } from "./prompts";

export interface LearningTask {
  title: string;
  description: string;
  completed: boolean;
}

export interface LearningPlan {
  goal: string;
  nextStep: string;
  estimatedTime: string;
  tasks: LearningTask[];
}

export interface PlannerInput {
  message: string;

  memory: {
    completedLessons: string[];
    completedSimulations: string[];
    fraudTopicsLearned: string[];
    adoptionScore: number;
    level: string;
  };
}

export async function generateLearningPlan(
  input: PlannerInput
): Promise<LearningPlan> {
  try {
    const prompt = `
User Message:
${input.message}

Current User Progress:

Level:
${input.memory.level}

Completed Lessons:
${input.memory.completedLessons.join(", ") || "None"}

Completed Simulations:
${input.memory.completedSimulations.join(", ") || "None"}

Fraud Topics:
${input.memory.fraudTopicsLearned.join(", ") || "None"}

Digital Adoption Score:
${input.memory.adoptionScore}

Generate a personalized learning roadmap.

Return ONLY JSON.

Example:

{
  "goal":"Become confident with digital banking",

  "nextStep":"Practice UPI Transfer",

  "estimatedTime":"20 minutes",

  "tasks":[
    {
      "title":"Learn UPI",
      "description":"Understand UPI basics.",
      "completed":true
    },
    {
      "title":"Practice UPI Transfer",
      "description":"Use the simulator.",
      "completed":false
    }
  ]
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      temperature: 0.3,

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPTS.planner,
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

    return {
      goal:
        result.goal ??
        "Improve your digital banking skills.",

      nextStep:
        result.nextStep ??
        "Continue learning.",

      estimatedTime:
        result.estimatedTime ??
        "15 minutes",

      tasks: Array.isArray(result.tasks)
        ? result.tasks
        : [],
    };
  } catch (error) {
    console.error("Planner Agent Error:", error);

    return {
      goal: "Improve your digital banking skills.",

      nextStep: "Continue learning.",

      estimatedTime: "15 minutes",

      tasks: [],
    };
  }
}