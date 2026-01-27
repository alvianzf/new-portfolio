import { motion } from 'framer-motion';
import { experiences } from '../data';
import ModernCard from '../components/ModernCard';
import { Calendar, Briefcase } from 'lucide-react';
import SEO from '../components/SEO';

export default function Experience() {
  return (
    <div className="min-h-screen pt-32 pb-32 relative overflow-hidden">
      <SEO
        title="Professional Experience"
        description="Explore the professional journey of Alvian Zachry Faturrahman, from leading technical teams to designing scalable curricula and hiring top engineering talent."
      />
      {/* Background Patterns */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-red/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Professional Journey
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A timeline of my career across software engineering, leadership, and education.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {experiences.map((exp, index) => {
            const IconComponent = exp.icon || Briefcase; // Fallback to Briefcase

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ModernCard className="group hover:border-brand-red/30 transition-colors p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Icon & Line */}
                    <div className="hidden md:flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-brand-red group-hover:bg-red-50/10 group-hover:scale-105 transition-all duration-300 border border-slate-200 dark:border-slate-700 shadow-sm">
                        {/* @ts-expect-error - Rendering Icon component dynamically */}
                        <IconComponent className="w-7 h-7" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.title}</h3>
                          <h4 className="text-brand-red font-medium text-lg">{exp.company}</h4>
                        </div>

                        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium bg-slate-100 dark:bg-slate-900/80 px-4 py-1.5 rounded-full w-fit whitespace-nowrap">
                          <Calendar className="w-4 h-4 mr-2" />
                          {exp.period}
                        </div>
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 leading-loose text-base">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}