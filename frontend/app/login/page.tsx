import Link from "next/link";
export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome to Saarthi
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3 mb-6"
        />

        <Link
href="/dashboard"
className="block w-full rounded-lg bg-blue-600 p-3 text-center text-white"
>
Login
</Link>

        <p className="text-center mt-6 text-gray-500">
          New user? Register later.
        </p>
      </div>
    </main>
  );
}