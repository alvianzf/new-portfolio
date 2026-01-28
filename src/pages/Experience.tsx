import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences, projects, npmPackages } from '../data';
import ModernCard from '../components/ModernCard';
import { Calendar, Building, Briefcase, Wrench, Code, Terminal, Copy, Check } from 'lucide-react';
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

  return map[tech] || null;
};

// Import solid icons for fallback/manual mapping
import { faFire, faHashtag } from '@fortawesome/free-solid-svg-icons';

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'roles' | 'projects' | 'npm'>('roles');
  const [copiedPkg, setCopiedPkg] = useState<string | null>(null);

  const handleCopy = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedPkg(command);
    setTimeout(() => setCopiedPkg(null), 2000);
  };

  const tabs = [
    { id: 'roles', label: 'Roles', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'npm', label: 'NPM Packages', icon: Terminal },
  ] as const;

  return (
    <div className="min-h-screen pt-32 pb-32 relative overflow-hidden bg-[var(--bg-primary)] transition-colors duration-300">
      <SEO
        title="Professional Experience"
        description="A timeline of 13+ years of managing chaos, fixing bugs caused by others, and judging code for a living."
        keywords={["Experience", "Resume", "CV", "Software Engineer", "Program Manager", "Tech Lead"]}
      />

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] opacity-70 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-500/5 rounded-full blur-[100px] opacity-70 translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-2 px-4 rounded-full bg-red-500/10 text-[#990000] font-bold text-xs uppercase tracking-wider mb-4 border border-red-500/20">
            Career Timeline
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
            13+ Years of <span className="text-[#990000]">"It Works Locally".</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed italic">
            "Recovering engineer turned manager who wears too many hats. I've gone from writing PHP (sorry) to judging other people's algorithms. I build systems, manage chaos, and occasionally claim credit for my team's hard work."
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-center gap-4 bg-[var(--card-bg)] p-2 rounded-2xl border border-[var(--border-color)] w-fit mx-auto shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
                  ? 'bg-[#990000] text-white shadow-lg'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-5xl mx-auto min-h-[600px]">
          <AnimatePresence mode="wait">

            {/* ROLES TAB */}
            {activeTab === 'roles' && (
              <motion.div
                key="roles"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6"
              >
                {experiences.map((exp, index) => {
                  const IconComponent = exp.icon || Briefcase;
                  return (
                    <ModernCard key={index} className="group p-6 md:p-8 bg-[var(--card-bg)] border-[var(--border-color)] hover:border-red-500/30 transition-all duration-300 rounded-2xl relative overflow-hidden">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="shrink-0">
                          <div className="w-14 h-14 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[#990000] group-hover:scale-105 transition-all">
                            {/* @ts-expect-error icon rendering */}
                            <IconComponent className="w-6 h-6" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                            <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[#990000] transition-colors">{exp.title}</h3>
                            <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider bg-[var(--bg-primary)] px-3 py-1 rounded-full border border-[var(--border-color)] w-fit">
                              <Calendar className="w-3 h-3" />
                              {exp.period}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-[var(--text-secondary)] font-medium mb-4">
                            <Building className="w-4 h-4" />
                            {exp.company}
                          </div>

                          <div className="text-[var(--text-secondary)] leading-relaxed text-sm mb-4">
                            {Array.isArray(exp.description) ? (
                              <ul className="space-y-2">
                                {exp.description.map((item, i) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#990000] shrink-0 opacity-50"></div>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>{exp.description}</p>
                            )}
                          </div>

                          {exp.techStack && (
                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--border-color)]">
                              {exp.techStack.map((tech) => (
                                <span key={tech} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--bg-primary)] text-[var(--text-secondary)] text-xs font-medium border border-[var(--border-color)]">
                                  {getTechIcon(tech) ? (
                                    <FontAwesomeIcon icon={getTechIcon(tech)!} className="w-3 h-3 opacity-70" />
                                  ) : (
                                    <Wrench className="w-3 h-3 opacity-70" />
                                  )}
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </ModernCard>
                  )
                })}
              </motion.div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {projects.map((proj, index) => {
                  const IconComponent = proj.icon || Code;
                  return (
                    <ModernCard key={index} className="group flex flex-col h-full p-6 bg-[var(--card-bg)] border-[var(--border-color)] hover:border-red-500/30 transition-all rounded-2xl relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] group-hover:text-[#990000] transition-colors">
                          {/* @ts-expect-error icon rendering */}
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-bold text-[var(--text-secondary)] bg-[var(--bg-primary)] px-2 py-1 rounded border border-[var(--border-color)]">
                          {proj.period}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 group-hover:text-[#990000] transition-colors">{proj.title}</h3>
                      <p className="text-sm text-[#990000] font-medium mb-3">{proj.company}</p>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-auto">
                        {Array.isArray(proj.description) ? proj.description[0] : proj.description}
                      </p>
                    </ModernCard>
                  )
                })}
              </motion.div>
            )}

            {/* NPM PACKAGES TAB */}
            {activeTab === 'npm' && (
              <motion.div
                key="npm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {npmPackages.map((pkg, index) => (
                  <ModernCard key={index} className="p-6 bg-[var(--card-bg)] border-[var(--border-color)] hover:border-red-500/30 transition-all rounded-2xl group">
                    <div className="flex items-start justify-between mb-4">
                      <Terminal className="w-8 h-8 text-[var(--text-secondary)] group-hover:text-[#990000] transition-colors" />
                      <a
                        href={pkg.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#990000] hover:underline"
                      >
                        View on NPM →
                      </a>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 font-mono">{pkg.name}</h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-6 min-h-[40px]">{pkg.description}</p>

                    <div className="relative">
                      <code className="block bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-3 pr-12 font-mono text-xs text-[var(--text-secondary)] overflow-x-auto whitespace-nowrap">
                        {pkg.command}
                      </code>
                      <button
                        onClick={() => handleCopy(pkg.command)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-[var(--card-bg)] text-[var(--text-secondary)] transition-colors"
                        title="Copy to install"
                      >
                        {copiedPkg === pkg.command ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </ModernCard>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Mentorship CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center max-w-2xl mx-auto"
        >
          <div className="p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)]">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Want to land a role like these?</h3>
            <p className="text-[var(--text-secondary)] mb-6">
              I mentor aspiring engineers to help them crack technical interviews and level up their careers.
            </p>
            <a
              href="/mentorship"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-brand-red transition-all shadow-lg hover:shadow-xl"
            >
              Explore Mentorship
            </a>
          </div>
        </motion.div>

        {/* Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="/resume.pdf"
            download="Alvian_Zachry_CV.pdf"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#990000] text-white font-bold rounded-full shadow-lg hover:shadow-red-900/30 hover:-translate-y-1 transition-all"
          >
            <Briefcase className="w-5 h-5" />
            Download Curated Resume
          </a>
        </motion.div>
      </div>
    </div>
  );
}