"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        <Link
          href="/"
          className="text-3xl font-bold text-blue-700"
        >
          Saarthi
        </Link>

        <div className="hidden gap-8 md:flex">
          <a href="#features" className="hover:text-blue-700">
            Features
          </a>

          <a href="#security" className="hover:text-blue-700">
            Security
          </a>

          <a href="#about" className="hover:text-blue-700">
            About
          </a>
        </div>

        <Link
  href="/login"
  className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition"
>
  Get Started
</Link>

      </div>
    </nav>
  );
}