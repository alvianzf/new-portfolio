import { motion } from 'framer-motion';
import { Terminal, Cpu, Shield, Zap, Coffee, Code2 } from 'lucide-react';
import ModernCard from '../components/ModernCard';
import SEO from '../components/SEO';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function About() {
  const wormSnippet = `// The math behind the wiggle
const generateWorm = () => {
  const points = [];
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    points.push({ x, y });
  }
  return points; // Trust me, it moves.
};`;

  const themeSnippet = `// How I handle your retinas
const toggleTheme = () => {
  if (theme === 'light') setTheme('dark');
  else if (theme === 'dark') setTheme('cyberpunk'); // Yes, really.
  else setTheme('light');
};`;

  return (
    <div className="min-h-screen pt-32 pb-20 transition-colors duration-300">
      <SEO
        title="About (The README)"
        description="The technical documentation of Alvian Zachry. Contains sarcastic remarks and code snippets."
        keywords={["About Me", "Documentation", "README", "Software Engineer Portfolio"]}
      />

      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8"
        >
          <div className="flex items-center gap-3 mb-4 text-[#990000]">
            <Terminal className="w-8 h-8" />
            <span className="font-mono text-sm font-bold bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">README.md</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            The Alvian Zachry <span className="text-[#990000]">Portfolio Experience™</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed italic border-l-4 border-[#990000] pl-6 py-2 bg-[var(--card-bg)] rounded-r-lg">
            "Warning: Contains excessive amounts of 'Regional Manager' energy, mathematically generated worms, and an unnecessarily comprehensive testing infrastructure. Proceed with caution."
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="prose dark:prose-invert max-w-none text-[var(--text-secondary)]">
            <p className="text-lg mb-4">
              Hi, I'm <strong className="text-[var(--text-primary)]">Alvian Zachry</strong>. I collect job titles like other people collect Pokémon cards (Program Manager, Technical Lead, Full Stack Engineer, Talent Acquisition Specialist... look, I just really like working, okay?).
            </p>
            <p className="text-lg">
              This isn't just a portfolio; it's a <strong>React-Vite-TypeScript-Tailwind-FramerMotion</strong> masterpiece with more testing than a paranoid QA engineer's fever dream. I built it to make myself feel better about all the <code>create-react-app</code> projects I abandoned in 2019.
            </p>
          </div>
        </motion.section>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <ModernCard className="h-full p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
              <div className="flex items-center gap-3 mb-4 text-purple-500">
                <Shield className="w-6 h-6" />
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Paranoid Testing</h3>
              </div>
              <p className="text-[var(--text-secondary)] mb-4">
                I track code coverage like a stock portfolio. 80%+ or it didn't happen. Unit, Integration, E2E (Playwright), and Visual Regressions.
              </p>
            </ModernCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <ModernCard className="h-full p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
              <div className="flex items-center gap-3 mb-4 text-[#990000]">
                <Cpu className="w-6 h-6" />
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Over-Engineered</h3>
              </div>
              <p className="text-[var(--text-secondary)] mb-4">
                Why use a simple HTML page when you can have a complex React app with managing document heads asynchronously?
              </p>
            </ModernCard>
          </motion.div>
        </div>

        {/* The Worms Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">The "Worm" Background</h2>
            <span className="text-xs font-mono bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">Mathematically Verified</span>
          </div>
          <p className="text-[var(--text-secondary)] mb-6">
            You noticed the squiggly lines? I call them "Worms." I use complex Bézier curves (`Q` commands, because I'm fancy) and `Math.random()` to generate floating squiggles.
          </p>

          <div className="rounded-xl overflow-hidden border border-[var(--border-color)] shadow-2xl">
            <div className="bg-[#1e1e1e] px-4 py-2 flex items-center gap-2 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-gray-500 font-mono">src/components/WormBackground.tsx</span>
            </div>
            <SyntaxHighlighter language="typescript" style={vscDarkPlus} showLineNumbers customStyle={{ margin: 0, borderRadius: 0 }}>
              {wormSnippet}
            </SyntaxHighlighter>
          </div>
        </motion.section>

        {/* Theme Engine Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">The "Indecisive" Theme Engine</h2>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[var(--text-secondary)] mb-4">
                I couldn't decide on a color scheme, so I built a complex context provider to support all of them.
              </p>
              <ul className="space-y-2 text-[var(--text-secondary)] mb-6">
                <li className="flex items-center gap-2">
                  <Coffee className="w-4 h-4" /> <strong>Light Mode</strong>: For people who enjoy burning their retinas.
                </li>
                <li className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> <strong>Dark Mode</strong>: The standard developer experience.
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-[var(--border-color)] shadow-xl rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-[#1e1e1e] px-4 py-2 border-b border-white/10">
                <span className="text-xs text-gray-500 font-mono">src/components/ThemeToggle.tsx</span>
              </div>
              <SyntaxHighlighter language="typescript" style={vscDarkPlus} customStyle={{ margin: 0 }}>
                {themeSnippet}
              </SyntaxHighlighter>
            </div>
          </div>
        </motion.section>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center p-12 bg-slate-900 rounded-3xl text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Need someone to over-engineer your portfolio?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Or maybe you just want to verify if the worms are actually random.
            </p>
            <a href="mailto:hello@alvianzf.id" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-red-500 hover:text-white transition-all">
              hello@alvianzf.id
            </a>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 p-32 bg-red-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 p-32 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </motion.div>

      </div>
    </div>
  );
}
