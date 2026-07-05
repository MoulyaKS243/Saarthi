"use client";

interface Props {
  recipient: string;
  upi: string;
  amount: number;
  onBack: () => void;
  onConfirm: () => void;
}

export default function ConfirmPayment({
  recipient,
  upi,
  amount,
  onBack,
  onConfirm,
}: Props) {
  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 shadow-xl">

      <button
        onClick={onBack}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <h1 className="mb-8 text-3xl font-bold text-center">
        Confirm Payment
      </h1>

      <div className="space-y-5 rounded-2xl border p-6">

        <div className="flex justify-between">
          <span className="text-gray-500">Recipient</span>
          <span className="font-semibold">{recipient}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">UPI ID</span>
          <span>{upi}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Amount</span>
          <span className="text-2xl font-bold text-green-600">
            ₹{amount.toLocaleString()}
          </span>
        </div>

      </div>

      <div className="mt-8 flex gap-4">

        <button
          onClick={onBack}
          className="flex-1 rounded-xl border border-gray-300 py-3 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="flex-1 rounded-xl bg-blue-700 py-3 text-white hover:bg-blue-800"
        >
          Continue
        </button>

      </div>

    </div>
  );
}