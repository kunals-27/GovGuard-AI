
const items = [
  {
    label: 'Ingestion Frequency',
    value: 'Real-time + Scheduled',
    sub: 'GNews API via Celery Beat',
  },
  {
    label: 'Analysis Pipeline',
    value: 'Summarization • Similarity • NLI',
    sub: 'Background processing with Celery',
  },
  {
    label: 'Knowledge Base',
    value: 'Fact-check DB',
    sub: 'pgvector semantic search',
  },
];

export default function Metrics() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-6">
          {items.map((m) => (
            <div key={m.label} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">{m.label}</div>
              <div className="mt-2 text-xl font-semibold">{m.value}</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
