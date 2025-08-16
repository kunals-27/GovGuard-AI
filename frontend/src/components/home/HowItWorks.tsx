import { motion } from 'framer-motion';
import { BarChart, Search, ShieldCheck } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        className="grid md:grid-cols-3 gap-8 text-center divide-x-0 md:divide-x divide-gray-200 dark:divide-gray-700"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <div className="p-6">
          <BarChart className="h-10 w-10 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Aggregate</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Continuously monitors global news and public statements.</p>
        </div>
        <div className="p-6">
          <Search className="h-10 w-10 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Analyze</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Applies multi-stage AI: summarization, semantic similarity, and NLI.</p>
        </div>
        <div className="p-6">
          <ShieldCheck className="h-10 w-10 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Verify</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Cross-references claims against fact-checks to flag contradictions.</p>
        </div>
      </motion.div>
    </section>
  );
}
