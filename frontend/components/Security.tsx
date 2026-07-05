"use client";

export default function Security() {
  const threats = [
    "❌ Fake KYC Update Links",
    "❌ OTP Sharing Scams",
    "❌ QR Code Payment Frauds",
    "❌ UPI Collect Request Scams",
    "❌ Fake Banking Calls",
    "❌ Phishing Websites",
  ];

  const protection = [
    "🛡️ AI explains suspicious SMS and emails",
    "🔒 Safe banking tutorials",
    "📱 Interactive scam awareness",
    "⚠️ Real fraud case simulations",
    "✅ Personalized safety tips",
    "🤖 24×7 AI Security Assistant",
  ];

  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">

          <h2 className="text-5xl font-bold">
            Banking Without Fear
          </h2>

          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Saarthi builds confidence by educating users about
            digital frauds while guiding them safely through every
            banking journey.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-16">

          <div className="bg-red-50 rounded-3xl p-8 shadow-lg">

            <h3 className="text-3xl font-bold mb-6">
              🚨 Common Frauds
            </h3>

            <div className="space-y-4">

              {threats.map((item, index) => (

                <div
                  key={index}
                  className="bg-white p-4 rounded-xl"
                >
                  {item}
                </div>

              ))}

            </div>

          </div>

          <div className="bg-green-50 rounded-3xl p-8 shadow-lg">

            <h3 className="text-3xl font-bold mb-6">
              🛡️ How Saarthi Helps
            </h3>

            <div className="space-y-4">

              {protection.map((item, index) => (

                <div
                  key={index}
                  className="bg-white p-4 rounded-xl"
                >
                  {item}
                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}