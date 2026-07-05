import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export interface UserMemory {
  completedLessons: string[];
  completedSimulations: string[];
  fraudTopicsLearned: string[];

  conversationSummary: string;

  recommendations: string[];

  adoptionScore: number;

  level: string;

  totalChats: number;

  totalSimulatorRuns: number;

  currentIntent: string;

  currentLesson: string;

  currentStep: number;

  lastBotReply: string;
}

export async function getUserMemory(
  userId: string
): Promise<UserMemory | null> {
  await connectDB();

  const user = await User.findById(userId).lean();

  if (!user) return null;

  return {
    completedLessons: user.completedLessons ?? [],

    completedSimulations: user.completedSimulations ?? [],

    fraudTopicsLearned: user.fraudTopicsLearned ?? [],

    conversationSummary: user.conversationSummary ?? "",

    recommendations: user.recommendations ?? [],

    adoptionScore: user.adoptionScore ?? 0,

    level: user.level ?? "Beginner",

    totalChats: user.totalChats ?? 0,

    totalSimulatorRuns: user.totalSimulatorRuns ?? 0,

    currentIntent: user.currentIntent ?? "general",

    currentLesson: user.currentLesson ?? "",

    currentStep: user.currentStep ?? 0,

    lastBotReply: user.lastBotReply ?? "",
  };
}

// =====================================
// Conversation Summary
// =====================================

export async function updateConversationSummary(
  userId: string,
  summary: string
) {
  await connectDB();

  return User.findByIdAndUpdate(
    userId,
    {
      conversationSummary: summary,
      lastActive: new Date(),
    },
    { new: true }
  );
}

// =====================================
// Recommendation Storage
// =====================================

export async function saveRecommendations(
  userId: string,
  recommendations: string[]
) {
  await connectDB();

  return User.findByIdAndUpdate(
    userId,
    {
      recommendations,
      lastActive: new Date(),
    },
    { new: true }
  );
}

// =====================================
// Lesson Progress
// =====================================

export async function completeLesson(
  userId: string,
  lesson: string
) {
  await connectDB();

  return User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        completedLessons: lesson,
      },
      lastActive: new Date(),
    },
    { new: true }
  );
}

export async function completeSimulation(
  userId: string,
  simulation: string
) {
  await connectDB();

  return User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        completedSimulations: simulation,
      },

      $inc: {
        totalSimulatorRuns: 1,
      },

      lastActive: new Date(),
    },
    { new: true }
  );
}

export async function completeFraudTopic(
  userId: string,
  topic: string
) {
  await connectDB();

  return User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        fraudTopicsLearned: topic,
      },

      lastActive: new Date(),
    },
    { new: true }
  );
}

// =====================================
// Adoption Score
// =====================================

export async function updateAdoptionScore(
  userId: string,
  score: number
) {
  await connectDB();

  let level = "Beginner";

  if (score >= 70) {
    level = "Advanced";
  } else if (score >= 40) {
    level = "Intermediate";
  }

  return User.findByIdAndUpdate(
    userId,
    {
      adoptionScore: score,

      level,

      lastActive: new Date(),
    },
    { new: true }
  );
}

// =====================================
// Chat Count
// =====================================

export async function incrementChatCount(
  userId: string
) {
  await connectDB();

  return User.findByIdAndUpdate(
    userId,
    {
      $inc: {
        totalChats: 1,
      },

      lastActive: new Date(),
    },
    { new: true }
  );
}

// =====================================
// Conversation State
// =====================================

export async function updateConversationState(
  userId: string,
  data: {
    currentIntent?: string;
    currentLesson?: string;
    currentStep?: number;
    lastBotReply?: string;
  }
) {
  await connectDB();

  return User.findByIdAndUpdate(
    userId,
    {
      ...data,

      lastActive: new Date(),
    },
    { new: true }
  );
}