"use client";

import { useState } from "react";

import ConfirmPayment from "./ConfirmPayment";
import UpiPin from "./UpiPin";
import ProcessingPayment from "./ProcessingPayment";
import PaymentSuccess from "./PaymentSuccess";

interface Props {
  balance: number;
  onBack: () => void;
  onSuccess: (amount: number) => void;
}

export default function SendMoney({
  balance,
  onBack,
  onSuccess,
}: Props) {

  const [name, setName] = useState("");
  const [upi, setUpi] = useState("");
  const [amount, setAmount] = useState("");

  const [screen, setScreen] = useState<
    "form" |
    "confirm" |
    "pin" |
    "processing" |
    "success"
  >("form");

  function continuePayment() {
    const amt = Number(amount);

    if (!name.trim()) {
      alert("Please enter recipient name.");
      return;
    }

    if (!upi.trim()) {
      alert("Please enter UPI ID.");
      return;
    }

    if (amt <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    if (amt > balance) {
      alert("Insufficient balance.");
      return;
    }

    setScreen("confirm");
  }

  if (screen === "confirm") {
    return (
      <ConfirmPayment
        recipient={name}
        upi={upi}
        amount={Number(amount)}
        onBack={() => setScreen("form")}
        onConfirm={() => setScreen("pin")}
      />
    );
  }

  if (screen === "pin") {
    return (
      <UpiPin
        onBack={() => setScreen("confirm")}
        onSuccess={() => setScreen("processing")}
      />
    );
  }

  if (screen === "processing") {
    return (
      <ProcessingPayment
        onDone={() => setScreen("success")}
      />
    );
  }

  if (screen === "success") {
    return (
      <PaymentSuccess
        recipient={name}
        amount={Number(amount)}
        onFinish={() => {
          onSuccess(Number(amount));
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-xl">

      <button
        onClick={onBack}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <h1 className="mb-8 text-3xl font-bold">
        Send Money
      </h1>

      <div className="space-y-6">

        <div>
          <label className="mb-2 block font-medium">
            Recipient Name
          </label>

          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Rahul Sharma"
            className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            UPI ID
          </label>

          <input
            value={upi}
            onChange={(e)=>setUpi(e.target.value)}
            placeholder="rahul@ybl"
            className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Amount
          </label>

          <input
            type="number"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            placeholder="1000"
            className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="rounded-xl bg-slate-100 p-5">

          <p className="text-gray-500">
            Available Balance
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            ₹{balance.toLocaleString()}
          </h2>

        </div>

        <button
          onClick={continuePayment}
          className="w-full rounded-xl bg-blue-700 py-4 text-lg font-semibold text-white hover:bg-blue-800"
        >
          Continue
        </button>

      </div>

    </div>
  );
}