import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    // ===========================
    // Learning Progress
    // ===========================

    completedLessons: {
      type: [String],
      default: [],
    },

    completedSimulations: {
      type: [String],
      default: [],
    },

    fraudTopicsLearned: {
      type: [String],
      default: [],
    },

    // ===========================
    // Conversation Memory
    // ===========================

    conversationSummary: {
      type: String,
      default: "",
    },

    lastBotReply: {
      type: String,
      default: "",
    },

    currentIntent: {
      type: String,
      default: "general",
    },

    currentLesson: {
      type: String,
      default: "",
    },

    currentStep: {
      type: Number,
      default: 0,
    },

    // ===========================
    // Recommendations
    // ===========================

    recommendations: {
      type: [String],
      default: [],
    },

    // ===========================
    // User Progress
    // ===========================

    adoptionScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    totalChats: {
      type: Number,
      default: 0,
    },

    totalSimulatorRuns: {
      type: Number,
      default: 0,
    },

    // ===========================
    // Activity
    // ===========================

    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", UserSchema);