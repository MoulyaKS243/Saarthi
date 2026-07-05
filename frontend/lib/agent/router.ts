import { detectIntent, type Intent } from "./intent";

export type Tool =
  | "learning"
  | "simulator"
  | "fraud"
  | "support"
  | "chat";

export interface RouteResult {
  intent: Intent;
  tool: Tool;
  page: string;
  description: string;
}

export async function routeMessage(
  message: string
): Promise<RouteResult> {
  const result = await detectIntent(message);

  switch (result.intent) {
    case "learning":
      return {
        intent: result.intent,
        tool: "learning",
        page: "/learning",
        description: "Guide the user through digital banking concepts.",
      };

    case "transaction":
      return {
        intent: result.intent,
        tool: "simulator",
        page: "/simulator",
        description: "Launch the banking simulator.",
      };

    case "fraud":
      return {
        intent: result.intent,
        tool: "fraud",
        page: "/learning",
        description: "Fraud awareness module.",
      };

    case "support":
      return {
        intent: result.intent,
        tool: "support",
        page: "/dashboard",
        description: "Provide banking support.",
      };

    default:
      return {
        intent: "general",
        tool: "chat",
        page: "/chat",
        description: "General conversation.",
      };
  }
}