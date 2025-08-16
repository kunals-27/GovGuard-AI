import { motion } from 'framer-motion';
import { ShieldCheck, FileText, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-white" />,
    title: 'Real-Time Contradiction Detection',
    description: 'NLI model flags statements that conflict with verified facts, adding instant scrutiny.',
    glowColor: 'from-red-500/20 to-transparent',
  },
  {
    icon: <FileText className="h-8 w-8 text-white" />,
    title: 'AI Summarization',
    description: 'Concise AI-generated summaries to cut through long-form content quickly.',
    glowColor: 'from-blue-500/20 to-transparent',
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-white" />,
    title: 'Interactive Trends',
    description: 'Visualize contradiction patterns and news dynamics over time.',
    glowColor: 'from-green-500/20 to-transparent',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">A New Standard in Public Scrutiny</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Three layers of AI analysis — built for clarity and accountability.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
            >
              <div className={`absolute -top-1/2 -left-1/2 h-full w-full bg-gradient-to-br ${feature.glowColor} rounded-full blur-3xl opacity-50`} />
              <div className="relative z-10">
                <div className="bg-blue-600 inline-block p-4 rounded-xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
