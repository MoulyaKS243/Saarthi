"use client";

import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        <FeatureCard
          icon={<span>🤖</span>}
          title="AI Banking Assistant"
          description="Your personal banking guide."
        />

        <FeatureCard
          icon={<span>🛡️</span>}
          title="Security Coach"
          description="Learn safe banking."
        />

        <FeatureCard
          icon={<span>📈</span>}
          title="Digital Adoption"
          description="Become confident using banking apps."
        />

      </div>
    </section>
  );
}