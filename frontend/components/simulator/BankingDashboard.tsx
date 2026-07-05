"use client";

import { useState } from "react";

import AccountCard from "./AccountCard";
import QuickActions from "./QuickActions";
import SendMoney from "./SendMoney";

export default function BankingDashboard() {
  const [balance, setBalance] = useState(50000);
  const [screen, setScreen] = useState("dashboard");

  if (screen === "send") {
    return (
      <SendMoney
        balance={balance}
        onBack={() => setScreen("dashboard")}
        onSuccess={(amount) => {
          setBalance((prev) => prev - amount);
          setScreen("dashboard");
        }}
      />
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Welcome to Saarthi 👋
        </h1>

        <p className="text-gray-600">
          Practice digital banking safely.
        </p>
      </div>

      <AccountCard balance={balance} />

      <QuickActions
        onAction={(action) => {
          if (action === "send") setScreen("send");
          else alert(`${action} coming soon`);
        }}
      />

    </div>
  );
}