"use client";

interface AccountCardProps {
  balance: number;
}

export default function AccountCard({ balance }: AccountCardProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500 p-8 text-white shadow-xl">

      <p className="text-sm opacity-80">
        Savings Account
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        XXXX XXXX 8345
      </h2>

      <div className="mt-10">

        <p className="text-blue-100">
          Available Balance
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          ₹ {balance.toLocaleString()}
        </h1>

      </div>

    </div>
  );
}