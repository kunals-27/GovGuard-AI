
export default function AboutProject() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">What is GovGuardAI?</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          GovGuardAI helps journalists, researchers, and citizens evaluate the credibility of public claims by combining
          real-time news ingestion, AI-driven summarization, semantic similarity search over a fact-check corpus, and
          natural language inference to flag potential contradictions.
        </p>
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Built with FastAPI, Celery, Postgres + pgvector, and a modern React + Tailwind frontend.
        </div>
      </div>
    </section>
  );
}
