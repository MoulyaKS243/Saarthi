import {
  ShieldCheck,
  TriangleAlert,
  Smartphone,
  Lock,
} from "lucide-react";

export default function Security() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-8">

        <div className="text-center">

          <h2 className="text-5xl font-bold text-slate-900">
            Banking Without Fear
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-600">
            Saarthi helps customers confidently adopt digital banking by
            educating them about online frauds and safe banking practices.
          </p>

        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          <div className="rounded-3xl bg-red-50 p-8 shadow-lg">

            <div className="mb-6 flex items-center gap-4">

              <TriangleAlert
                size={40}
                className="text-red-600"
              />

              <h3 className="text-3xl font-bold">
                Common Banking Frauds
              </h3>

            </div>

            <ul className="space-y-4 text-lg">

              <li>❌ Fake KYC Update Links</li>

              <li>❌ OTP Sharing Scams</li>

              <li>❌ QR Code Payment Frauds</li>

              <li>❌ Fake Loan Calls</li>

              <li>❌ UPI Collect Request Scams</li>

              <li>❌ Phishing Websites</li>

            </ul>

          </div>

          <div className="rounded-3xl bg-green-50 p-8 shadow-lg">

            <div className="mb-6 flex items-center gap-4">

              <ShieldCheck
                size={40}
                className="text-green-600"
              />

              <h3 className="text-3xl font-bold">
                Saarthi Protects You
              </h3>

            </div>

            <div className="space-y-6">

              <div className="flex items-center gap-4">

                <Lock
                  size={30}
                  className="text-blue-700"
                />

                <p className="text-lg">
                  Learn safe digital banking practices.
                </p>

              </div>

              <div className="flex items-center gap-4">

                <Smartphone
                  size={30}
                  className="text-blue-700"
                />

                <p className="text-lg">
                  Practice transactions without risk.
                </p>

              </div>

              <div className="flex items-center gap-4">

                <ShieldCheck
                  size={30}
                  className="text-blue-700"
                />

                <p className="text-lg">
                  AI explains suspicious SMS, emails and links.
                </p>

              </div>

              <div className="flex items-center gap-4">

                <ShieldCheck
                  size={30}
                  className="text-blue-700"
                />

                <p className="text-lg">
                  Personalized security tips for every user.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}