import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl p-10 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold">Ready to explore real-time insights?</h3>
          <p className="mt-3 text-white/90">Jump into the live feed or review trends to see GovGuardAI in action.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link to="/live-feed" className="px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50">
              Open Live Feed
            </Link>
            <Link to="/contradictions" className="px-6 py-3 rounded-lg bg-blue-700/40 ring-1 ring-white/20 font-semibold hover:bg-blue-700/60">
              View Contradictions Trends
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
