import { groq } from "@/lib/groq";
import { SYSTEM_PROMPTS } from "./prompts";

import {
  getUserMemory,
  updateConversationSummary,
  updateAdoptionScore,
  incrementChatCount,
  updateConversationState,
} from "@/services/memoryServices";

export interface MemoryResult {
  summary: string;
  adoptionScore: number;
}

export async function updateMemory(
  userId: string,
  latestMessage: string,
  botReply: string,
  intent: string,
  lesson: string = "",
  step: number = 0
): Promise<MemoryResult> {
  const memory = await getUserMemory(userId);

  if (!memory) {
    return {
      summary: "",
      adoptionScore: 0,
    };
  }

  try {
    const prompt = `
You are an AI memory manager.

Existing Summary:

${memory.conversationSummary}

Current Intent:
${intent}

Current Lesson:
${lesson || memory.currentLesson}

Current Lesson Step:
${step || memory.currentStep}

Latest User Message:
${latestMessage}

Assistant Reply:
${botReply}

Completed Lessons:
${memory.completedLessons.join(", ") || "None"}

Completed Simulations:
${memory.completedSimulations.join(", ") || "None"}

Fraud Topics Learned:
${memory.fraudTopicsLearned.join(", ") || "None"}

Current Adoption Score:
${memory.adoptionScore}

Update the conversation summary.

Keep it under 80 words.

Estimate a new adoption score between 0 and 100.

Return ONLY JSON.

Example:

{
  "summary":"User understands UPI basics and is now learning QR payments.",
  "adoptionScore":42
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      temperature: 0.2,

      response_format: {
        type: "json_object",
      },

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

    const content =
      completion.choices[0].message.content ?? "{}";

    const result = JSON.parse(content);

    const summary =
      result.summary ??
      memory.conversationSummary;

    let score = Number(result.adoptionScore);

    if (Number.isNaN(score)) {
      score = memory.adoptionScore;
    }

    score = Math.max(0, Math.min(score, 100));

    await updateConversationSummary(
      userId,
      summary
    );

    await updateAdoptionScore(
      userId,
      score
    );

    await incrementChatCount(
      userId
    );

    await updateConversationState(userId, {
      currentIntent: intent,
      currentLesson:
        lesson || memory.currentLesson,
      currentStep:
        step || memory.currentStep,
      lastBotReply: botReply,
    });

    return {
      summary,
      adoptionScore: score,
    };
  } catch (error) {
    console.error("Memory Agent Error:", error);

    return {
      summary: memory.conversationSummary,
      adoptionScore: memory.adoptionScore,
    };
  }
}