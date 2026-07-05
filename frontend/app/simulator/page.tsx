import BankingDashboard from "@/components/simulator/BankingDashboard";

export default function SimulatorPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-7xl">
        <BankingDashboard />
      </div>
    </main>
  );
}