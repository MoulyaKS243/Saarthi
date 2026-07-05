"use client";

import { useEffect, useState } from "react";

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

export default function UpiPin({ onSuccess, onBack }: Props) {
  const [pin, setPin] = useState("");

  function press(value: string) {
    if (pin.length >= 4) return;
    setPin((prev) => prev + value);
  }

  function removeDigit() {
    setPin((prev) => prev.slice(0, -1));
  }

  useEffect(() => {
    if (pin.length === 4) {
      setTimeout(() => {
        onSuccess();
      }, 800);
    }
  }, [pin, onSuccess]);

  const numbers = ["1","2","3","4","5","6","7","8","9"];

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

      <p className="mt-3 text-center text-gray-500">
        This is a simulated payment.
      </p>

      <div className="my-10 flex justify-center gap-4">
        {[0,1,2,3].map((i)=>(
          <div
            key={i}
            className={`h-5 w-5 rounded-full ${
              i < pin.length ? "bg-blue-700" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">

        {numbers.map((n)=>(
          <button
            key={n}
            onClick={()=>press(n)}
            className="rounded-xl border p-5 text-xl font-bold hover:bg-gray-100"
          >
            {n}
          </button>
        ))}

        <button
          onClick={removeDigit}
          className="rounded-xl border p-5 font-semibold hover:bg-gray-100"
        >
          ⌫
        </button>

        <button
          onClick={()=>press("0")}
          className="rounded-xl border p-5 text-xl font-bold hover:bg-gray-100"
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