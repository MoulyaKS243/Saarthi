import Link from "next/link";

export default function Dashboard() {
  const cards = [
    {
      title: "🤖 AI Banking Assistant",
      desc: "Ask banking questions anytime.",
      link: "/chat",
    },
    {
      title: "📚 Learning Center",
      desc: "Learn digital banking step-by-step.",
      link: "/learning",
    },
    {
      title: "💳 Banking Simulator",
      desc: "Practice banking safely.",
      link: "/simulator",
    },
    {
      title: "👤 My Profile",
      desc: "View your progress.",
      link: "/profile",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold">
          Welcome to Saarthi 👋
        </h1>

        <p className="mt-3 text-xl text-gray-600">
          Your Digital Banking Companion
        </p>

        <div className="grid gap-8 mt-12 md:grid-cols-2">
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.link}
              className="rounded-3xl bg-white p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1"
            >
              <h2 className="text-3xl font-bold">
                {card.title}
              </h2>

              <p className="mt-4 text-gray-600">
                {card.desc}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}