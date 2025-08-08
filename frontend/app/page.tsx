import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="p-4 sm:p-8 md:p-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">
        GovGuardAI Dashboard
      </h1>

      <Dashboard />
    </main>
  );
}