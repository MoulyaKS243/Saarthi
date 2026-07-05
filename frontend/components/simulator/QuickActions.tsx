"use client";

interface Props {
  onAction: (action: string) => void;
}

const actions = [
  {
    emoji: "💸",
    title: "Send Money",
    value: "send",
  },
  {
    emoji: "📱",
    title: "Recharge",
    value: "recharge",
  },
  {
    emoji: "💡",
    title: "Pay Bills",
    value: "bill",
  },
  {
    emoji: "📄",
    title: "Mini Statement",
    value: "statement",
  },
];

export default function QuickActions({ onAction }: Props) {
  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">

      {actions.map((action) => (

        <button
          key={action.value}
          onClick={() => onAction(action.value)}
          className="rounded-3xl bg-white p-8 shadow transition hover:scale-105 hover:shadow-xl"
        >

          <div className="text-5xl">
            {action.emoji}
          </div>

          <h3 className="mt-4 text-xl font-semibold">
            {action.title}
          </h3>

        </button>

      ))}

    </div>
  );
}