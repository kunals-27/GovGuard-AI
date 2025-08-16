import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-[10%] bg-gradient-to-br from-blue-600/10 via-cyan-500/10 to-emerald-400/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-flex items-center rounded-full bg-blue-600/10 text-blue-700 dark:text-blue-300 px-3 py-1 text-xs font-medium ring-1 ring-inset ring-blue-600/20">
            AI for Public Accountability
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
            Monitor, Analyze, and Verify public claims at scale
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
            GovGuardAI ingests news in real-time, summarizes content, and flags contradictions against a curated fact-check knowledge base.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/live-feed" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-transform hover:scale-[1.02]">
              View Live Feed <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/contradictions" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              View Trends
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="hidden md:block">
          <img src="/news.svg" alt="AI Data Analysis" className="w-full h-full object-contain" />
        </motion.div>
      </div>
    </section>
  );
}
