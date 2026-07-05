import { groq } from "@/lib/groq";
import { SYSTEM_PROMPTS } from "./prompts";
import { detectIntent } from "./intent";
import { analyzeFraud } from "./fraud";
import { generateLearningPlan } from "./planner";
import {
  generateRecommendations,
  type Recommendation,
} from "./recommendations";
import { updateMemory } from "./memory";
import { getUserMemory } from "@/services/memoryServices";

export interface FraudAnalysis {
  risk: string;
  reason: string;
  details?: Record<string, unknown>;
}

export interface LearningPlan {
  goal: string;
  nextStep: string;
}

export interface AgentResponse {
  reply: string;

  intent: string;

  fraud: FraudAnalysis;

  learningPlan: LearningPlan;

  recommendations: Recommendation[];

  memory: {
    summary: string;
    adoptionScore: number;
  };
}

export async function runAgentWorkflow(
  userId: string,
  message: string
): Promise<AgentResponse> {

  // ===========================
  // Load Memory
  // ===========================

  const memory =
    (await getUserMemory(userId)) ?? {
      completedLessons: [],
      completedSimulations: [],
      fraudTopicsLearned: [],
      conversationSummary: "",
      recommendations: [],
      adoptionScore: 0,
      level: "Beginner",
      totalChats: 0,
      totalSimulatorRuns: 0,
      currentIntent: "general",
      currentLesson: "",
      currentStep: 0,
      lastBotReply: "",
    };

  // ===========================
  // Intent Detection
  // Keep previous intent for
  // short replies
  // ===========================

  let detectedIntent = memory.currentIntent;

  if (message.trim().length > 10) {
    const intentResult = await detectIntent(message);
    detectedIntent = intentResult.intent;
  }

  // ===========================
  // Fraud Agent
  // ===========================

  const fraud = await analyzeFraud(message);

  // ===========================
  // Planner Agent
  // ===========================

  const learningPlan =
    await generateLearningPlan({
      message,
      memory,
    });

  // ===========================
  // Recommendation Agent
  // ===========================

  const recommendations =
    await generateRecommendations({
      message,
      memory,
    });

  // ===========================
  // Final Prompt
  // ===========================

  const prompt = `
You are Saarthi.

You are having a continuous conversation.

Never restart the lesson.

Never greet again if already chatting.

Continue naturally.

Conversation Summary:
${memory.conversationSummary}

Current Intent:
${detectedIntent}

Current Lesson:
${memory.currentLesson}

Lesson Step:
${memory.currentStep}

Previous Assistant Reply:
${memory.lastBotReply}

User Level:
${memory.level}

Completed Lessons:
${memory.completedLessons.join(", ") || "None"}

Completed Simulations:
${memory.completedSimulations.join(", ") || "None"}

Fraud Topics Learned:
${memory.fraudTopicsLearned.join(", ") || "None"}

Learning Goal:
${learningPlan.goal}

Next Step:
${learningPlan.nextStep}

Fraud Risk:
${fraud.risk}

Reason:
${fraud.reason}

Recommendations:
${JSON.stringify(recommendations)}

User Message:
${message}

Reply naturally.

If user says:
"yes"
"ok"
"continue"

continue the lesson instead of starting again.

Keep response under 120 words.
`;

  const completion =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      temperature: 0.5,

      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPTS.general,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  const reply =
    completion.choices[0].message.content ??
    "I'm here to help.";

  // ===========================
  // Update Memory
  // ===========================

  const updatedMemory =
    await updateMemory(
      userId,
      message,
      reply,
      detectedIntent,
      learningPlan.goal,
      memory.currentStep + 1
    );

  return {
    reply,

    intent: detectedIntent,

    fraud,

    learningPlan,

    recommendations,

    memory: updatedMemory,
  };
}