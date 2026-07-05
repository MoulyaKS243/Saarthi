import { NextRequest, NextResponse } from "next/server";
import { runAgentWorkflow } from "@/lib/agent/decision";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      message,
      userId,
    }: {
      message?: string;
      userId?: string;
    } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Temporary demo user
    // Replace after authentication
    const id = userId || "687000000000000000000001";

    const result = await runAgentWorkflow(id, message);

    return NextResponse.json({
      success: true,
      reply: result.reply,
      intent: result.intent,
      fraud: result.fraud,
      learningPlan: result.learningPlan,
      recommendations: result.recommendations,
      memory: result.memory,
    });
  } catch (error) {
    console.error("Agent Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}