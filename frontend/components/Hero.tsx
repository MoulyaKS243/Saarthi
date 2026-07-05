import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="mx-auto max-w-7xl px-8 py-14 lg:py-20">

        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:justify-between">

          {/* Left Side */}
          <div className="max-w-2xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles size={18} />
              AI Powered Digital Banking Companion
            </div>

            <h1 className="text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
              Banking Made
              <span className="block text-blue-700">
                Simple & Secure
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Saarthi helps customers confidently adopt digital banking
              through AI-powered guidance, personalized learning,
              real-time assistance, and security awareness.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-xl bg-blue-700 px-8 py-4 font-semibold text-white transition hover:bg-blue-800"
              >
                Get Started
              </Link>

              <Link
                href="#features"
                className="rounded-xl border border-blue-700 px-8 py-4 font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-4 rounded-xl border bg-white p-4 shadow-md">

              <ShieldCheck
                className="text-green-600"
                size={34}
              />

              <div>
                <h3 className="font-semibold">
                  Safe Digital Banking
                </h3>

                <p className="text-gray-500">
                  Learn digital banking without fear of scams.
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="flex justify-center">
            <img
              src="https://illustrations.popsy.co/blue/digital-nomad.svg"
              alt="AI Banking"
              className="w-full max-w-md lg:max-w-lg"
            />
          </div>

        </div>

      </div>
    </section>
  );
}