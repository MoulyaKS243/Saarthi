"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Message {
  sender: "user" | "ai";
  text: string;
}

export default function ChatWidget() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "👋 Hello! I'm Saarthi. I can help you learn digital banking, detect fraud, and guide you through banking tasks.",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
        },
      ]);

      // ------------------------
      // AGENT DECISION ENGINE
      // ------------------------

      if (data.decision) {
        console.log("Agent Decision:", data.decision);

        switch (data.decision.action) {
          case "open_learning":
            setTimeout(() => {
              router.push("/learning");
            }, 1500);
            break;

          case "open_send_money":
            setTimeout(() => {
              router.push("/simulator");
            }, 1500);
            break;

          case "show_help":
            setTimeout(() => {
              router.push("/dashboard");
            }, 1500);
            break;

          case "show_fraud_alert":
            alert(
              `⚠ FRAUD ALERT

Risk Level: HIGH

Reason:
${data.decision.reason}

Never share your:
• OTP
• PIN
• Password

Always verify the caller before proceeding.`
            );
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I couldn't process your request.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex h-[80vh] flex-col rounded-3xl bg-white shadow-xl">

      {/* Header */}

      <div className="rounded-t-3xl bg-blue-700 p-6 text-white">
        <h2 className="text-2xl font-bold">
          🤖 Saarthi AI Assistant
        </h2>

        <p className="text-blue-100">
          Your Agentic AI Banking Guide
        </p>
      </div>

      {/* Chat */}

      <div className="flex-1 space-y-4 overflow-y-auto p-6">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] rounded-2xl p-4 ${
              msg.sender === "user"
                ? "ml-auto bg-blue-700 text-white"
                : "bg-slate-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="rounded-xl bg-slate-200 p-3">
            Saarthi is thinking...
          </div>
        )}

      </div>

      {/* Input */}

      <div className="flex gap-3 border-t p-6">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask anything about digital banking..."
          className="flex-1 rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-700"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="rounded-xl bg-blue-700 px-6 text-white hover:bg-blue-800 disabled:bg-gray-400"
        >
          {loading ? "..." : "Send"}
        </button>

      </div>
    </div>
  );
}