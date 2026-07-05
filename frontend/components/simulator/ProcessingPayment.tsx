"use client";

import { useEffect } from "react";

interface Props {
  onDone: () => void;
}

export default function ProcessingPayment({ onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-10 shadow-xl text-center">

      <div className="mx-auto h-20 w-20 animate-spin rounded-full border-8 border-blue-200 border-t-blue-700"></div>

      <h1 className="mt-8 text-3xl font-bold">
        Processing Payment
      </h1>

      <p className="mt-3 text-gray-500">
        Please wait...
      </p>

    </div>
  );
}