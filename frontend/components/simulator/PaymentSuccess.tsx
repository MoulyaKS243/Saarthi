"use client";

interface Props {
  recipient: string;
  amount: number;
  onFinish: () => void;
}

export default function PaymentSuccess({
  recipient,
  amount,
  onFinish,
}: Props) {
  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-10 shadow-xl text-center">

      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl">
        ✅
      </div>

      <h1 className="mt-6 text-4xl font-bold text-green-600">
        Payment Successful
      </h1>

      <p className="mt-6 text-lg">
        ₹{amount.toLocaleString()}
      </p>

      <p className="text-gray-500">
        sent to
      </p>

      <h2 className="text-2xl font-semibold">
        {recipient}
      </h2>

      <div className="mt-8 rounded-2xl bg-slate-100 p-5 text-left">

        <div className="flex justify-between py-2">
          <span>Date</span>
          <span>{new Date().toLocaleString()}</span>
        </div>

        <div className="flex justify-between py-2">
          <span>Status</span>
          <span className="text-green-600 font-bold">
            Success
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span>Mode</span>
          <span>UPI</span>
        </div>

      </div>

      <button
        onClick={onFinish}
        className="mt-8 w-full rounded-xl bg-blue-700 py-3 text-white"
      >
        Back to Dashboard
      </button>

    </div>
  );
}