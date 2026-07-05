"use client";

import { useState } from "react";

interface Props {
  onBack: () => void;
  onSuccess: () => void;
}

export default function UpiPin({
  onBack,
  onSuccess,
}: Props) {
  const [pin, setPin] = useState("");

  function press(value: string) {
    if (pin.length >= 4) return;

    const newPin = pin + value;
    setPin(newPin);

    if (newPin.length === 4) {
      setTimeout(() => {
        onSuccess();
      }, 700);
    }
  }

  function removeDigit() {
    setPin((prev) => prev.slice(0, -1));
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl">

      <button
        onClick={onBack}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-center text-3xl font-bold">
        Enter UPI PIN
      </h1>

      <p className="mt-2 text-center text-gray-500">
        Enter your 4-digit UPI PIN
      </p>

      <div className="my-10 flex justify-center gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-5 w-5 rounded-full ${
              i < pin.length
                ? "bg-blue-700"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">

        {[1,2,3,4,5,6,7,8,9].map((n)=>(
          <button
            key={n}
            onClick={()=>press(String(n))}
            className="rounded-xl border p-5 text-2xl font-bold hover:bg-gray-100"
          >
            {n}
          </button>
        ))}

        <button
          onClick={removeDigit}
          className="rounded-xl border p-5 font-bold hover:bg-gray-100"
        >
          ⌫
        </button>

        <button
          onClick={()=>press("0")}
          className="rounded-xl border p-5 text-2xl font-bold hover:bg-gray-100"
        >
          0
        </button>

        <button
          disabled
          className="rounded-xl border bg-gray-100 p-5"
        >
          ✓
        </button>

      </div>

    </div>
  );
}