"use client";

export default function WhySaarthi() {
  const cards = [
    {
      emoji: "🤖",
      title: "AI Powered",
      desc: "Conversational AI guides customers through every banking feature.",
    },
    {
      emoji: "🎯",
      title: "Personalized",
      desc: "Recommendations based on each customer's needs.",
    },
    {
      emoji: "🔐",
      title: "Secure",
      desc: "Builds trust through fraud awareness and education.",
    },
    {
      emoji: "📈",
      title: "Increase Adoption",
      desc: "Helps banks improve digital banking adoption.",
    },
  ];

  return (
    <section className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-5xl font-bold text-center">
          Why Choose Saarthi?
        </h2>

        <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg text-center"
            >
              <div className="text-6xl">{card.emoji}</div>

              <h3 className="mt-5 text-2xl font-bold">
                {card.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}