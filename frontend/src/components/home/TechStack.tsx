
const items = [
  { name: 'Frontend', value: 'React + TypeScript + Vite + Tailwind' },
  { name: 'Backend', value: 'FastAPI + SQLAlchemy' },
  { name: 'Data & Infra', value: 'Postgres + pgvector, Redis' },
  { name: 'Async Jobs', value: 'Celery + Celery Beat' },
  { name: 'Ingestion', value: 'GNews API' },
  { name: 'NLP', value: 'Summarization, Semantic Search, NLI' },
];

export default function TechStack() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold">Technology Overview</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((i) => (
            <div key={i.name} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
              <div className="text-sm text-gray-500 dark:text-gray-400">{i.name}</div>
              <div className="mt-1 font-medium">{i.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
