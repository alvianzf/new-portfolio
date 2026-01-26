
import { motion } from 'framer-motion';
import { experiences } from '../data';
import ModernCard from '../components/ModernCard';
import { Calendar, Briefcase, Trophy } from 'lucide-react';

export default function Experience() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Professional Journey
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A timeline of my career across software engineering, leadership, and education.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ModernCard className="group hover:border-blue-200 transition-colors">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon & Line */}
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-50 group-hover:scale-110 transition-all">
                      {exp.category === 'soft' ? <Trophy className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
                      <div className="flex items-center text-slate-400 text-sm mt-1 md:mt-0 font-medium bg-slate-100 px-3 py-1 rounded-full w-fit">
                        <Calendar className="w-3.5 h-3.5 mr-2" />
                        {exp.period}
                      </div>
                    </div>

                    <h4 className="text-blue-600 font-medium mb-4">{exp.company}</h4>

                    <p className="text-slate-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </ModernCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}