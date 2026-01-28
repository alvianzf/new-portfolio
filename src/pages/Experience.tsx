import { motion } from 'framer-motion';
import { experiences } from '../data';
import ModernCard from '../components/ModernCard';
import { Calendar, Building, Briefcase, Wrench } from 'lucide-react';
import SEO from '../components/SEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReact, faNode, faPython, faJs, faPhp, faLaravel, faAws, faVuejs, faDocker, faWordpress, faGoogle
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faServer } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Helper to map string tech to icons
const getTechIcon = (tech: string): IconDefinition | null => {
  const map: Record<string, IconDefinition> = {
    'React.js': faReact,
    'Next.js': faReact, // closest
    'Vue.js': faVuejs,
    'Node.js': faNode,
    'Express.js': faNode, // closest
    'JavaScript': faJs,
    'TypeScript': faJs, // closest
    'PHP': faPhp,
    'Laravel': faLaravel,
    'CodeIgniter': faFire,
    'Python': faPython,
    'AWS': faAws,
    'GCP': faGoogle,
    'Docker': faDocker,
    'WordPress': faWordpress,
    'PostgreSQL': faDatabase,
    'MongoDB': faDatabase,
    'Firestore': faFire,
    'Redis': faServer,
    'Nginx': faServer,
    'Algolia': faHashtag,
  };

  // Fuzzy match or direct match
  return map[tech] || null;
};

// Import solid icons for fallback/manual mapping
import { faFire, faHashtag } from '@fortawesome/free-solid-svg-icons';

export default function Experience() {
  return (
    <div className="min-h-screen pt-32 pb-32 relative overflow-hidden bg-white">
      <SEO
        title="Professional Experience"
        description="A timeline of Alvian Zachry Faturrahman's 13+ year career in software engineering, leadership, and education."
        keywords={["Experience", "Resume", "CV", "Software Engineer", "Program Manager", "Tech Lead"]}
      />

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[100px] opacity-70 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[100px] opacity-70 translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-block p-2 px-4 rounded-full bg-red-50 text-[#990000] font-bold text-xs uppercase tracking-wider mb-4 border border-red-100">
            Career Timeline
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            13+ Years of <span className="text-[#990000]">"It Works Locally".</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed italic">
            "Recovering engineer turned manager who wears too many hats. I've gone from writing PHP (sorry) to judging other people's algorithms. I build systems, manage chaos, and occasionally claim credit for my team's hard work."
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 transform md:-translate-x-1/2 hidden md:block"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const IconComponent = exp.icon || Briefcase;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot (Desktop) */}
                  <div className="absolute left-1/2 top-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-10">
                    <div className="w-4 h-4 bg-[#990000] rounded-full border-4 border-white shadow-lg"></div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1">
                    <ModernCard className="group p-8 bg-white border-slate-100 hover:border-red-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl relative overflow-hidden">
                      {/* Hover Gradient */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#990000] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      <div className="flex flex-col gap-6">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 group-hover:text-[#990000] transition-colors">
                              {exp.title}
                            </h3>
                            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                              <Building className="w-4 h-4" />
                              {exp.company}
                            </div>
                          </div>
                          <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 text-slate-600 border border-slate-100 group-hover:bg-red-50 group-hover:text-[#990000] transition-colors">
                            {/* @ts-expect-error - icon rendering */}
                            <IconComponent className="w-6 h-6 " />
                          </div>
                        </div>

                        {/* Date Mobile/Tablet */}
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </div>

                        {/* Description */}
                        <div className="text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-50 pt-4">
                          {Array.isArray(exp.description) ? (
                            <ul className="space-y-3">
                              {exp.description.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></div>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>{exp.description}</p>
                          )}
                        </div>

                        {/* Tech Stack */}
                        {exp.techStack && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {exp.techStack.map((tech) => {
                              const icon = getTechIcon(tech);
                              return (
                                <span key={tech} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-100 hover:bg-slate-100 transition-colors">
                                  {icon ? (
                                    <FontAwesomeIcon icon={icon} className="w-3 h-3 text-slate-400" />
                                  ) : (
                                    <Wrench className="w-3 h-3 text-slate-300" />
                                  )}
                                  {tech}
                                </span>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </ModernCard>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <a
            href="/resume.pdf"
            download="Alvian_Zachry_CV.pdf"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#990000] text-white font-bold rounded-full shadow-lg hover:shadow-red-900/30 hover:-translate-y-1 transition-all"
          >
            <Briefcase className="w-5 h-5" />
            Download Full Resume
          </a>
        </motion.div>
      </div>
    </div>
  );
}