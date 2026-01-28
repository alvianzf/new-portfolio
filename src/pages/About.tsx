import { motion } from 'framer-motion';
import { Terminal, Zap, Coffee, Code2, Briefcase, WifiOff, Smartphone, Infinity as InfinityIcon, Flame, Bot, TestTube, Siren, Gamepad2, Wrench, FileText } from 'lucide-react';
import ModernCard from '../components/ModernCard';
import SEO from '../components/SEO';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSpan = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-slate-100 dark:bg-slate-800 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-md font-mono text-sm border border-slate-200 dark:border-slate-700">
    {children}
  </code>
);

export default function About() {
  const wormSnippet = `// The actual math behind the wiggle (from my npm package)
const generatePath = (width, height, variant) => {
  const startX = Math.random() * width;
  const startY = Math.random() * height;
  switch (variant) {
    case "worms": {
      const cp1X = startX + (Math.random() - 0.5) * 400;
      const cp1Y = startY + (Math.random() - 0.5) * 400;
      const endX = cp1X + (Math.random() - 0.5) * 400;
      const endY = cp1Y + (Math.random() - 0.5) * 400;
      return \`M \${startX} \${startY} Q \${cp1X} \${cp1Y} \${endX} \${endY}\`;
    }
    case "thunder": {
      // Zap zap!
      const cp1X = startX + (Math.random() - 0.5) * 500;
      const cp1Y = startY + (Math.random() - 0.5) * 100;
      return \`M \${startX} \${startY} L \${cp1X} \${cp1Y} ...\`;
    }
    // ... more bugs ...
  }
};`;

  const themeSnippet = `// How I handle your retinas
  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('cyberpunk'); // Yes, really.
    else setTheme('light');
  }; `;

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

        {/* Intro */}
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
              This isn't just a portfolio; it's a <strong>React-Vite-TypeScript-Tailwind-FramerMotion</strong> masterpiece with more testing than a paranoid QA engineer's fever dream. I built it to make myself feel better about all the <CodeSpan>create-react-app</CodeSpan> projects I abandoned in 2019.
            </p>
            <p className="text-lg mt-4 border-l-4 border-slate-300 dark:border-slate-700 pl-4 italic">
              Want to see the full code and the absolute mess behind it? It's all open-source on <a href="https://github.com/alvianzf/new-portfolio/" target="_blank" rel="noopener noreferrer" className="text-[#990000] hover:underline font-bold">GitHub</a>.
            </p>
          </div>
        </motion.section>

        {/* Awesome Features Intro */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">🌟 "Awesome" Features (That I Definitely Needed)</h2>
          <p className="text-[var(--text-secondary)]">
            I got bored of having a "normal" website, so I decided to turn this simple portfolio into an enterprise-grade application for absolutely no reason.
          </p>
        </motion.section>

        {/* Theme Engine Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">The "Indecisive" Theme Engine</h3>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>

          <p className="text-[var(--text-secondary)] mb-6">
            I couldn't decide on a color scheme, so I built a complex context provider to support all of them.
          </p>

          <ul className="space-y-4 text-[var(--text-secondary)] mb-8">
            <li className="flex items-start gap-3">
              <div className="mt-1 bg-yellow-100 dark:bg-yellow-900/30 p-1 rounded text-yellow-600 dark:text-yellow-400">
                <Coffee className="w-4 h-4" />
              </div>
              <span>
                <strong>Light Mode</strong>: For people who enjoy burning their retinas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-blue-600 dark:text-blue-400">
                <Code2 className="w-4 h-4" />
              </div>
              <span>
                <strong>Dark Mode</strong>: The standard developer experience.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded text-green-600 dark:text-green-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span>
                <strong>Cyberpunk Mode</strong>: A high-contrast, neon-infused seizure warning that I added because I watched <em>Blade Runner</em> once. It changes the font to <CodeSpan>Courier New</CodeSpan> because "hacking".
              </span>
            </li>
          </ul>

          <div className="rounded-xl overflow-hidden border border-[var(--border-color)] shadow-xl rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="bg-[#1e1e1e] px-4 py-2 border-b border-white/10">
              <span className="text-xs text-gray-500 font-mono">src/components/ThemeToggle.tsx</span>
            </div>
            <SyntaxHighlighter language="typescript" style={vscDarkPlus} customStyle={{ margin: 0 }}>
              {themeSnippet}
            </SyntaxHighlighter>
          </div>
        </motion.section>

        {/* Worms Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">The "Worm" Background</h3>
            <span className="text-xs font-mono bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">Mathematically Verified</span>
          </div>
          <p className="text-[var(--text-secondary)] mb-6">
            You noticed the squiggly lines? I call them "Worms."
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)] mb-6">
            <li><strong>What it does:</strong> I use complex Bézier curves (<CodeSpan>Q</CodeSpan> commands, because I'm fancy) and <CodeSpan>Math.random()</CodeSpan> to generate floating squiggles.</li>
            <li><strong>Paranoid Testing:</strong> I literally wrote <strong>unit tests</strong> for these lines. If a worm is straight, the build fails. I have trust issues with <CodeSpan>Math.random()</CodeSpan>.</li>
            <li><strong>Tech Spec:</strong> It renders <strong>50</strong> independent SVG paths that fade in and out. Yes, I am personally responsible for your laptop fan spinning up right now. You're welcome.</li>
            <li><strong>Want to steal it?</strong> Of course you do. Install it via npm: <CodeSpan>npm install @alvianzf/squiggly-lines-go-brrr</CodeSpan>. I even packaged it for you because I'm too nice.</li>
          </ul>

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

        {/* Experience Ecosystem */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 text-blue-500">
            <Briefcase className="w-6 h-6" />
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">The "Experience" Ecosystem</h3>
          </div>
          <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
            <p className="text-[var(--text-secondary)] mb-4">My career path was too chaotic for a simple timeline, so I built a full-blown dashboard.</p>
            <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)]">
              <li><strong>Tabbed Interface:</strong> Separate views for "Roles", "Projects", and "NPM Packages" because I don't want to scroll.</li>
              <li><strong>The "Freelance Vigilante":</strong> A dedicated section for my 2011-2019 era of building government ERPs at 3 AM.</li>
              <li><strong>NPM Integration:</strong> A live list of my sarcastic npm packages with one-click install commands.</li>
            </ul>
          </ModernCard>
        </motion.section>

        {/* Apocalypse PWA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 text-green-500">
            <Smartphone className="w-6 h-6" />
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">Apocalypse-Ready PWA</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
              <div className="flex items-center gap-2 mb-2 font-bold text-[var(--text-primary)]"><WifiOff className="w-4 h-4" /> Offline Support</div>
              <p className="text-[var(--text-secondary)] text-sm">This website caches itself. If the internet goes down, you can still read my resume while the world burns.</p>
            </ModernCard>
            <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
              <div className="flex items-center gap-2 mb-2 font-bold text-[var(--text-primary)]"><Smartphone className="w-4 h-4" /> Installable</div>
              <p className="text-[var(--text-secondary)] text-sm">You can install this portfolio on your phone. Why would you want an app of <em>me</em> on your home screen? I don't know, but now you have the option.</p>
            </ModernCard>
          </div>
        </motion.section>

        {/* Infinite Skill Marquee */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 text-purple-500">
            <InfinityIcon className="w-6 h-6" />
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">The Infinite Skill Marquee</h3>
          </div>
          <p className="text-[var(--text-secondary)] mb-4">
            One static list of skills wasn't enough to contain my professional ego. I needed an honest-to-god <strong>Infinite CSS Marquee</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)]">
            <li>It scrolls left. It scrolls right.</li>
            <li>It pauses on hover (so you can carefully read "CodeIgniter" and wonder what year I think it is).</li>
            <li><strong>Contains:</strong> Everything from "NestJS" to "Project Management." If it's a buzzword, I put it in there.</li>
          </ul>
        </motion.section>

        {/* Mentorship */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 text-orange-500">
            <Flame className="w-6 h-6" />
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">"Get Roasted" Mentorship</h3>
          </div>
          <p className="text-[var(--text-secondary)] mb-4">I made an entire page dedicated to <strong>roasting you</strong>.</p>
          <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)]">
            <li>I will manually tear apart your interview skills.</li>
            <li>I call it "Brutally Honest Feedback" because "Professional Criticism" sounded too boring.</li>
            <li>Finally, a service for people who think LeetCode isn't painful enough.</li>
          </ul>
        </motion.section>

        {/* SEO & AIO */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 text-teal-500">
            <Bot className="w-6 h-6" />
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">SEO & AIO (Feeding the Robot Overlords)</h3>
          </div>
          <p className="text-[var(--text-secondary)] mb-4">I didn't just add meta tags; I performed a ritual summoning for the search engine bots.</p>
          <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)]">
            <li><strong>Dynamic Blogger API Integration:</strong> I wrote a Node.js script that literally fetches data from the <strong>Blogger API</strong> to generate my XML sitemap. Yes, I use Blogger. STOP LAUGHING. It works.</li>
            <li><strong>JSON-LD Schema with Star Ratings:</strong> I injected structured data with a 5-star aggregateRating so Google's AI knows <em>exactly</em> who I am and that people apparently love me. I am feeding the basilisk directly.</li>
            <li><strong>OpenGraph:</strong> My links look so good on Slack that my coworkers might actually click them for once.</li>
          </ul>
        </motion.section>

        {/* Testing Pyramid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 text-indigo-500">
            <TestTube className="w-6 h-6" />
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">The Testing Pyramid That Nobody Asked For</h3>
          </div>
          <p className="text-[var(--text-secondary)] mb-6">I got paranoid about bugs, so I built a testing infrastructure that would make NASA jealous.</p>

          <div className="grid gap-6">
            <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
              <h4 className="font-bold text-[var(--text-primary)] mb-2">Unit & Integration Tests (Vitest)</h4>
              <ul className="list-disc pl-5 space-y-1 text-[var(--text-secondary)] text-sm">
                <li><strong>Component Testing:</strong> Every component has tests. Yes, even the <CodeSpan>ModernCard</CodeSpan> that just wraps a div.</li>
                <li><strong>Browser Mode:</strong> Vitest runs in Playwright to test actual browser behavior because mocking the DOM is apparently "not good enough."</li>
                <li><strong>Coverage Reports:</strong> I track code coverage like a stock portfolio. 80%+ or it didn't happen.</li>
              </ul>
            </ModernCard>
            <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
              <h4 className="font-bold text-[var(--text-primary)] mb-2">End-to-End Tests (Playwright)</h4>
              <ul className="list-disc pl-5 space-y-1 text-[var(--text-secondary)] text-sm">
                <li><strong>18 Tests Across 3 Browsers:</strong> Chromium, Firefox, and WebKit. Because if it works in Chrome but not Safari, did you really build it?</li>
                <li><strong>Real User Flows:</strong> Testing navigation, mobile menus, theme toggles, and everything a recruiter might accidentally click.</li>
              </ul>
            </ModernCard>
            <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
              <h4 className="font-bold text-[var(--text-primary)] mb-2">Component Documentation (Storybook)</h4>
              <ul className="list-disc pl-5 space-y-1 text-[var(--text-secondary)] text-sm">
                <li><strong>Interactive Component Library:</strong> Every component documented with multiple states and variations.</li>
                <li><strong>Visual Testing:</strong> Because "it looks fine on my machine" is not a deployment strategy.</li>
                <li><strong>Accessibility Checks:</strong> Making sure my components pass a11y standards (because lawsuits are expensive).</li>
              </ul>
            </ModernCard>
          </div>
        </motion.section>

        {/* Fun Police */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 text-red-600">
            <Siren className="w-6 h-6" />
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">The Fun Police (Strict Linting)</h3>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)]">
            <li><strong>Husky & Lint-Staged:</strong> I cannot commit code if it's ugly. The pre-commit hook literally runs tests.</li>
            <li><strong>Prettier:</strong> If I miss a semicolon, the computer yells at me.</li>
            <li><strong>Strict ESLint:</strong> <CodeSpan>any</CodeSpan> is now illegal. I have to type <CodeSpan>unknown</CodeSpan> and cast it like a wizard.</li>
            <li><strong>TypeScript Strict Mode:</strong> The compiler is more judgmental than my code reviewer.</li>
          </ul>
        </motion.section>

        {/* Arcade */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 text-pink-500">
            <Gamepad2 className="w-6 h-6" />
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">The "Stupid Playable Arcade"</h3>
          </div>
          <p className="text-[var(--text-secondary)] mb-4">Because every professional portfolio needs a way to waste the recruiter's time.</p>
          <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)]">
            <li><strong>Bug Squash:</strong> Save the production database from actual bugs.</li>
            <li><strong>Quick Sync Dodge:</strong> Simulate the average Tuesday by dodging calendar invites.</li>
            <li><strong>Elusive Deploy:</strong> Try to push to production. The button runs away. Good luck.</li>
            <li><strong>Learn Flex (Sarcastic):</strong> CSS is hard. We made it harder.</li>
            <li><strong>Type Torture:</strong> Fix <CodeSpan>any</CodeSpan> types or get roasted.</li>
          </ul>
        </motion.section>

        {/* Under The Hood */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 text-gray-500">
            <Wrench className="w-6 h-6" />
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">Under The Hood</h3>
          </div>
          <p className="text-[var(--text-secondary)] mb-6">I built this app with a stack that says "I have too much free time."</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-[var(--text-primary)] mb-2">Core Stack</h4>
              <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                <li><strong>Vite:</strong> Because waiting more than 100ms for a local server start is a personal insult to me.</li>
                <li><strong>React 19:</strong> I'm on the bleeding edge. If it breaks, it's a "feature."</li>
                <li><strong>TypeScript:</strong> Because I realized <CodeSpan>any</CodeSpan> is a sin (mostly).</li>
                <li><strong>Framer Motion:</strong> Used everywhere. If an element enters the DOM without a specialized dance routine, did it really render?</li>
                <li><strong>Tailwind CSS:</strong> 50 utility classes in one <CodeSpan>className</CodeSpan> string. Readability is subjective.</li>
                <li><strong>React Helmet Async:</strong> Managing document heads asynchronously because I live in the future.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[var(--text-primary)] mb-2">Quality Assurance</h4>
              <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                <li><strong>ESLint:</strong> Catches my mistakes before my pride does.</li>
                <li><strong>Prettier:</strong> Auto-formats everything so I can pretend I'm consistent.</li>
                <li><strong>Husky:</strong> Git hooks that shame me into writing better code.</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* License */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 text-[var(--text-primary)]">
            <FileText className="w-6 h-6" />
            <h3 className="text-2xl font-bold">License</h3>
          </div>
          <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
            <p className="text-[var(--text-secondary)] mb-4">Licensed under <strong>MIT</strong> (Mostly Intense TypeScript).</p>
            <p className="text-[var(--text-secondary)] text-sm">
              Feel free to steal the WormBackground (it's on npm: <CodeSpan>@alvianzf/squiggly-lines-go-brrr</CodeSpan>) or the testing infrastructure. I know that's the only reason you're looking at the code anyway.
            </p>
          </ModernCard>
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
