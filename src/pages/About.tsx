import { motion } from 'framer-motion';
import { Terminal, Zap, Coffee, Code2, Briefcase, WifiOff, Smartphone, Infinity as InfinityIcon, Flame, Bot, TestTube, Siren, Gamepad2, Wrench, FileText } from 'lucide-react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ModernCard from '../components/ModernCard';
import SEO from '../components/SEO';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MotionBox = motion.create(Box);

const CodeSpan = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="code"
    sx={{
      bgcolor: 'background.paper',
      color: 'primary.main',
      px: 0.75,
      py: 0.25,
      borderRadius: 1.5,
      fontFamily: 'monospace',
      fontSize: '0.875rem',
      border: 1,
      borderColor: 'divider',
    }}
  >
    {children}
  </Box>
);

const sectionMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

const CodeWindow = ({
  title,
  language,
  code,
  small = false,
  showLineNumbers = false,
  dots = false,
  sx = {},
}: {
  title: string;
  language: string;
  code: string;
  small?: boolean;
  showLineNumbers?: boolean;
  dots?: boolean;
  sx?: object;
}) => (
  <Box sx={{ borderRadius: small ? 2 : 3, overflow: 'hidden', border: 1, borderColor: 'divider', ...sx }}>
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        bgcolor: '#1e1e1e',
        px: small ? 1.5 : 2,
        py: small ? 0.75 : 1,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {dots && (
        <>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ef4444' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#eab308' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#22c55e' }} />
        </>
      )}
      <Typography
        component="span"
        sx={{ ml: dots ? 1 : 0, fontSize: small ? '10px' : '0.75rem', color: '#6b7280', fontFamily: 'monospace' }}
      >
        {title}
      </Typography>
    </Stack>
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      showLineNumbers={showLineNumbers}
      customStyle={{ margin: 0, borderRadius: 0, overflowX: 'auto', ...(small ? { fontSize: '0.75rem' } : {}) }}
    >
      {code}
    </SyntaxHighlighter>
  </Box>
);

const SectionHeading = ({
  icon,
  color,
  children,
}: {
  icon?: React.ReactNode;
  color?: string;
  children: React.ReactNode;
}) => (
  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3, color }}>
    {icon}
    <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'text.primary' }}>
      {children}
    </Typography>
  </Stack>
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

  const testSnippet = `// confirm existence of reality
test('should probably work', async () => {
  const me = await Developer.wakeUp();
  expect(me.caffeineLevel).toBeGreaterThan(0);

  // The most critical test in the suite
  expect(true).toBe(true);
  expect(undefined).not.toBeDefined();
});`;

  const playwrightSnippet = `test('recruiters can find the contact button', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /hire me/i }).click();

  // Ensure the salary negotiation modal opens
  await expect(page.getByText('Enter High Salary')).toBeVisible();

  // If this fails, I starve.
  expect(await page.screenshot()).toMatchSnapshot('career-success.png');
});`;

  const storybookSnippet = `export const ImpossibleToClick: Story = {
  args: {
    label: 'Deploy to Prod',
    velocity: 9000, // It's over 9000
    onCatch: () => console.log('Nice try, QA.'),
  },
  play: async ({ canvasElement }) => {
    // Simulating a user trying to click the button
    // Spoiler: They fail.
    await userEvent.hover(canvasElement);
  }
};`;

  const gameSnippet = `// Logic for the runaway button
  const handleHover = () => {
    onAttempt();
    if (frozen) return;

    // Randomize movement: calculated to be annoying
    let newX = (Math.random() - 0.5) * window.innerWidth * 0.8;
    let newY = (Math.random() - 0.5) * window.innerHeight * 0.6;

    // Ensure it moves at least some distance so you can't click it
    if (Math.abs(newX - position.x) < 100) newX += 100 * Math.sign(newX - position.x);

    setPosition({ x: newX, y: newY }); // Good luck.
  };`;

  const flexSnippet = `// The "win" condition for the Flexbox game
  const checkWin = (styles, level) => {
    const isJustifyMatch = styles.justifyContent === level.targetStyle.justifyContent;
    const isAlignMatch = styles.alignItems === level.targetStyle.alignItems;

    // The most complex part: handling direction
    const isDirectionMatch = (level.targetStyle.flexDirection || 'row') === styles.flexDirection;

    if (isJustifyMatch && isAlignMatch && isDirectionMatch) {
      return "Finally. Moving on...";
    }
    return "Wrong. Try again.";
  };`;

  const latexSnippet = `// The "Lazy Man's Thesis Creator"
  const compileLatex = () => {
    try {
      const generator = new HtmlGenerator({ hyphenate: false });
      const doc = parse(code, { generator: generator });

      // Yes, I'm compiling LaTeX in the browser using JavaScript.
      // Why? Because installing TeX Live takes 4 hours.
      iframeRef.current.contentDocument.write(doc.htmlDocument().outerHTML);
    } catch (err) {
      setError("You missed a bracket. Classic.");
    }
  };`;

  const sitemapSnippet = `// Yes, I fetch my blog posts from Google to generate the sitemap.
async function generateSitemap() {
  const response = await fetch(
    \`https://www.googleapis.com/blogger/v3/blogs/\${BLOG_ID}/posts?key=\${API_KEY}\`
  );

  // Checking if Google is awake
  if (!response.ok) throw new Error("Google is down, or I am.");

  const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  \${posts.map(post => \`<url><loc>\${baseUrl}/blog/\${post.id}</loc></url>\`).join('')}
</urlset>\`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
}`;

  const lintSnippet = `
✖ 4 problems (4 errors, 0 warnings)

1:1  error  'console.log' is not allowed. Production logs are expensive    no-console
6:9  error  Unexpected 'any'. We don't do that here                        @typescript-eslint/no-explicit-any
14:7 error  React Hook useEffect has a missing dependency: 'sanity'        react-hooks/exhaustive-deps
22:3 error  'unusedVariable' is defined but never used. Just like me.      no-unused-vars
`;



  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 10, md: 16 }, pb: 10, overflowX: 'hidden', transition: 'background-color 0.3s, color 0.3s' }}>
      <SEO
        title="About (The README)"
        description="The technical documentation of Alvian Zachry. Contains sarcastic remarks and code snippets."
        keywords={["About Me", "Documentation", "README", "Software Engineer Portfolio"]}
      />

      <Container maxWidth="md" sx={{ px: 3 }}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ mb: 6, borderBottom: 1, borderColor: 'divider', pb: 4 }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2, color: 'primary.main' }}>
            <Terminal className="w-8 h-8" />
            <Chip
              label="README.md"
              size="small"
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'primary.main',
                bgcolor: 'rgba(153, 0, 0, 0.08)',
                border: 0,
                borderRadius: 1,
              }}
            />
          </Stack>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: '2.25rem', md: '3rem' }, fontWeight: 700, color: 'text.primary', mb: 3 }}
          >
            The Alvian Zachry <Box component="span" sx={{ color: 'primary.main' }}>Portfolio Experience™</Box>
          </Typography>
          <Typography
            sx={{
              fontSize: '1.125rem',
              color: 'text.secondary',
              lineHeight: 1.75,
              fontStyle: 'italic',
              borderLeft: 4,
              borderColor: 'primary.main',
              pl: 3,
              py: 1,
              bgcolor: 'background.paper',
              borderRadius: '0 0.5rem 0.5rem 0',
            }}
          >
            "Warning: Contains excessive amounts of 'Regional Manager' energy, mathematically generated worms, and an unnecessarily comprehensive testing infrastructure. Proceed with caution."
          </Typography>
        </MotionBox>

        {/* Intro */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 8 }}>
          <Stack spacing={2} sx={{ color: 'text.secondary' }}>
            <Typography sx={{ fontSize: '1.125rem', color: 'inherit' }}>
              Hi, I'm <Box component="strong" sx={{ color: 'text.primary' }}>Alvian Zachry</Box>. I collect job titles like other people collect Pokémon cards (Program Manager, Technical Lead, Full Stack Engineer, Talent Acquisition Specialist... look, I just really like working, okay?).
            </Typography>
            <Typography sx={{ fontSize: '1.125rem', color: 'inherit' }}>
              This isn't just a portfolio; it's a <strong>React-Vite-TypeScript-Tailwind-FramerMotion</strong> masterpiece with more testing than a paranoid QA engineer's fever dream. I built it to make myself feel better about all the <CodeSpan>create-react-app</CodeSpan> projects I abandoned in 2019.
            </Typography>
            <Typography sx={{ fontSize: '1.125rem', color: 'inherit', fontStyle: 'italic', borderLeft: 4, borderColor: 'divider', pl: 2, mt: 1 }}>
              Want to see the full code and the absolute mess behind it? It's all open-source on{' '}
              <Box
                component="a"
                href="https://github.com/alvianzf/new-portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'primary.main', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                GitHub
              </Box>.
            </Typography>
          </Stack>
        </MotionBox>

        {/* Awesome Features Intro */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ fontSize: '1.875rem', fontWeight: 700, color: 'text.primary', mb: 2 }}>
            🌟 "Awesome" Features (That I Definitely Needed)
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            I got bored of having a "normal" website, so I decided to turn this simple portfolio into an enterprise-grade application for absolutely no reason.
          </Typography>
        </MotionBox>

        {/* Theme Engine Section */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 8 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
            <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'text.primary' }}>
              The "Indecisive" Theme Engine
            </Typography>
            <Zap className="w-5 h-5 text-yellow-500" />
          </Stack>

          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            I couldn't decide on a color scheme, so I built a complex context provider to support all of them.
          </Typography>

          <Stack component="ul" spacing={2} sx={{ listStyle: 'none', pl: 0, m: 0, color: 'text.secondary', mb: 4 }}>
            <Stack component="li" direction="row" alignItems="flex-start" spacing={1.5}>
              <Box sx={{ mt: 0.5, bgcolor: 'rgba(234, 179, 8, 0.15)', p: 0.5, borderRadius: 1, color: '#ca8a04', display: 'flex' }}>
                <Coffee className="w-4 h-4" />
              </Box>
              <Typography component="span" sx={{ color: 'inherit' }}>
                <strong>Light Mode</strong>: For people who enjoy burning their retinas.
              </Typography>
            </Stack>
            <Stack component="li" direction="row" alignItems="flex-start" spacing={1.5}>
              <Box sx={{ mt: 0.5, bgcolor: 'rgba(59, 130, 246, 0.15)', p: 0.5, borderRadius: 1, color: '#3b82f6', display: 'flex' }}>
                <Code2 className="w-4 h-4" />
              </Box>
              <Typography component="span" sx={{ color: 'inherit' }}>
                <strong>Dark Mode</strong>: The standard developer experience.
              </Typography>
            </Stack>
            <Stack component="li" direction="row" alignItems="flex-start" spacing={1.5}>
              <Box sx={{ mt: 0.5, bgcolor: 'rgba(34, 197, 94, 0.15)', p: 0.5, borderRadius: 1, color: '#16a34a', display: 'flex' }}>
                <Terminal className="w-4 h-4" />
              </Box>
              <Typography component="span" sx={{ color: 'inherit' }}>
                <strong>Cyberpunk Mode</strong>: A high-contrast, neon-infused seizure warning that I added because I watched <em>Blade Runner</em> once. It changes the font to <CodeSpan>Courier New</CodeSpan> because "hacking".
              </Typography>
            </Stack>
          </Stack>

          <CodeWindow
            title="src/components/ThemeToggle.tsx"
            language="typescript"
            code={themeSnippet}
            sx={{
              boxShadow: 12,
              transform: 'rotate(1deg)',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'rotate(0deg)' },
            }}
          />
        </MotionBox>

        {/* Worms Section */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 8 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
            <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'text.primary' }}>
              The "Worm" Background
            </Typography>
            <Chip
              label="Mathematically Verified"
              size="small"
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                bgcolor: 'rgba(34, 197, 94, 0.15)',
                color: '#16a34a',
                border: 0,
              }}
            />
          </Stack>
          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            You noticed the squiggly lines? I call them "Worms."
          </Typography>
          <Box component="ul" sx={{ listStyle: 'disc', pl: 2.5, m: 0, mb: 3, color: 'text.secondary', '& > li + li': { mt: 1 } }}>
            <li><strong>What it does:</strong> I use complex Bézier curves (<CodeSpan>Q</CodeSpan> commands, because I'm fancy) and <CodeSpan>Math.random()</CodeSpan> to generate floating squiggles.</li>
            <li><strong>Paranoid Testing:</strong> I literally wrote <strong>unit tests</strong> for these lines. If a worm is straight, the build fails. I have trust issues with <CodeSpan>Math.random()</CodeSpan>.</li>
            <li><strong>Tech Spec:</strong> It renders <strong>50</strong> independent SVG paths that fade in and out. Yes, I am personally responsible for your laptop fan spinning up right now. You're welcome.</li>
            <li><strong>Want to steal it?</strong> Of course you do. Install it via npm: <CodeSpan>npm install @alvianzf/squiggly-lines-go-brrr</CodeSpan>. I even packaged it for you because I'm too nice.</li>
          </Box>

          <CodeWindow
            title="src/components/WormBackground.tsx"
            language="typescript"
            code={wormSnippet}
            dots
            showLineNumbers
            sx={{ boxShadow: 16 }}
          />
        </MotionBox>

        {/* Experience Ecosystem */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 8 }}>
          <SectionHeading icon={<Briefcase className="w-6 h-6" />} color="#3b82f6">
            The "Experience" Ecosystem
          </SectionHeading>
          <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              My career path was too chaotic for a simple timeline, so I built a full-blown dashboard.
            </Typography>
            <Box component="ul" sx={{ listStyle: 'disc', pl: 2.5, m: 0, color: 'text.secondary', '& > li + li': { mt: 1 } }}>
              <li><strong>Tabbed Interface:</strong> Separate views for "Roles", "Projects", and "NPM Packages" because I don't want to scroll.</li>
              <li><strong>The "Freelance Vigilante":</strong> A dedicated section for my 2011-2019 era of building government ERPs at 3 AM.</li>
              <li><strong>NPM Integration:</strong> A live list of my sarcastic npm packages with one-click install commands.</li>
            </Box>
          </ModernCard>
        </MotionBox>

        {/* Apocalypse PWA */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 8 }}>
          <SectionHeading icon={<Smartphone className="w-6 h-6" />} color="#22c55e">
            Apocalypse-Ready PWA
          </SectionHeading>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1, fontWeight: 700, color: 'text.primary' }}>
                  <WifiOff className="w-4 h-4" />
                  <Typography component="span" sx={{ fontWeight: 700, color: 'inherit' }}>Offline Support</Typography>
                </Stack>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  This website caches itself. If the internet goes down, you can still read my resume while the world burns.
                </Typography>
              </ModernCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1, fontWeight: 700, color: 'text.primary' }}>
                  <Smartphone className="w-4 h-4" />
                  <Typography component="span" sx={{ fontWeight: 700, color: 'inherit' }}>Installable</Typography>
                </Stack>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  You can install this portfolio on your phone. Why would you want an app of <em>me</em> on your home screen? I don't know, but now you have the option.
                </Typography>
              </ModernCard>
            </Grid>
          </Grid>
        </MotionBox>

        {/* Infinite Skill Marquee */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 8 }}>
          <SectionHeading icon={<InfinityIcon className="w-6 h-6" />} color="#a855f7">
            The Infinite Skill Marquee
          </SectionHeading>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            One static list of skills wasn't enough to contain my professional ego. I needed an honest-to-god <strong>Infinite CSS Marquee</strong>.
          </Typography>
          <Box component="ul" sx={{ listStyle: 'disc', pl: 2.5, m: 0, color: 'text.secondary', '& > li + li': { mt: 1 } }}>
            <li>It scrolls left. It scrolls right.</li>
            <li>It pauses on hover (so you can carefully read "CodeIgniter" and wonder what year I think it is).</li>
            <li><strong>Contains:</strong> Everything from "NestJS" to "Project Management." If it's a buzzword, I put it in there.</li>
          </Box>
        </MotionBox>

        {/* Mentorship */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 8 }}>
          <SectionHeading icon={<Flame className="w-6 h-6" />} color="#f97316">
            "Get Roasted" Mentorship
          </SectionHeading>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            I made an entire page dedicated to <strong>roasting you</strong>.
          </Typography>
          <Box component="ul" sx={{ listStyle: 'disc', pl: 2.5, m: 0, color: 'text.secondary', '& > li + li': { mt: 1 } }}>
            <li>I will manually tear apart your interview skills.</li>
            <li>I call it "Brutally Honest Feedback" because "Professional Criticism" sounded too boring.</li>
            <li>Finally, a service for people who think LeetCode isn't painful enough.</li>
          </Box>
        </MotionBox>

        {/* SEO & AIO */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 8 }}>
          <SectionHeading icon={<Bot className="w-6 h-6" />} color="#14b8a6">
            SEO & AIO (Feeding the Robot Overlords)
          </SectionHeading>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            I didn't just add meta tags; I performed a ritual summoning for the search engine bots.
          </Typography>
          <Box component="ul" sx={{ listStyle: 'disc', pl: 2.5, m: 0, color: 'text.secondary', '& > li + li': { mt: 1 } }}>
            <li><strong>Dynamic Blogger API Integration:</strong> I wrote a Node.js script that literally fetches data from the <strong>Blogger API</strong> to generate my XML sitemap. Yes, I use Blogger. STOP LAUGHING. It works.</li>
            <li><strong>JSON-LD Schema with Star Ratings:</strong> I injected structured data with a 5-star aggregateRating so Google's AI knows <em>exactly</em> who I am and that people apparently love me. I am feeding the basilisk directly.</li>
            <li><strong>OpenGraph:</strong> My links look so good on Slack that my coworkers might actually click them for once.</li>
          </Box>

          <CodeWindow
            title="generate-sitemap.js"
            language="javascript"
            code={sitemapSnippet}
            sx={{ mt: 3, boxShadow: 12 }}
          />
        </MotionBox>

        {/* Testing Pyramid */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 8 }}>
          <SectionHeading icon={<TestTube className="w-6 h-6" />} color="#6366f1">
            The Testing Pyramid That Nobody Asked For
          </SectionHeading>
          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            I got paranoid about bugs, so I built a testing infrastructure that would make NASA jealous.
          </Typography>

          <Stack spacing={3}>
            <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
              <Typography component="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                Unit & Integration Tests (Vitest)
              </Typography>
              <Box component="ul" sx={{ listStyle: 'disc', pl: 2.5, m: 0, mb: 2, color: 'text.secondary', fontSize: '0.875rem', '& > li + li': { mt: 0.5 } }}>
                <li><strong>Component Testing:</strong> Every component has tests. Yes, even the <CodeSpan>ModernCard</CodeSpan> that just wraps a div.</li>
                <li><strong>Browser Mode:</strong> Vitest runs in Playwright to test actual browser behavior because mocking the DOM is apparently "not good enough."</li>
                <li><strong>Coverage Reports:</strong> I track code coverage like a stock portfolio. 80%+ or it didn't happen.</li>
              </Box>
              <CodeWindow title="src/tests/sanity.test.ts" language="typescript" code={testSnippet} small sx={{ mt: 2 }} />
            </ModernCard>
            <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
              <Typography component="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                End-to-End Tests (Playwright)
              </Typography>
              <Box component="ul" sx={{ listStyle: 'disc', pl: 2.5, m: 0, mb: 2, color: 'text.secondary', fontSize: '0.875rem', '& > li + li': { mt: 0.5 } }}>
                <li><strong>18 Tests Across 3 Browsers:</strong> Chromium, Firefox, and WebKit. Because if it works in Chrome but not Safari, did you really build it?</li>
                <li><strong>Real User Flows:</strong> Testing navigation, mobile menus, theme toggles, and everything a recruiter might accidentally click.</li>
              </Box>
              <CodeWindow title="tests/e2e/recruiter.spec.ts" language="typescript" code={playwrightSnippet} small sx={{ mt: 2 }} />
            </ModernCard>
            <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
              <Typography component="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                Component Documentation (Storybook)
              </Typography>
              <Box component="ul" sx={{ listStyle: 'disc', pl: 2.5, m: 0, mb: 2, color: 'text.secondary', fontSize: '0.875rem', '& > li + li': { mt: 0.5 } }}>
                <li><strong>Interactive Component Library:</strong> Every component documented with multiple states and variations.</li>
                <li><strong>Visual Testing:</strong> Because "it looks fine on my machine" is not a deployment strategy.</li>
                <li><strong>Accessibility Checks:</strong> Making sure my components pass a11y standards (because lawsuits are expensive).</li>
              </Box>
              <CodeWindow title="stories/RunawayButton.stories.tsx" language="typescript" code={storybookSnippet} small sx={{ mt: 2 }} />
            </ModernCard>
          </Stack>
        </MotionBox>

        {/* Fun Police */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 8 }}>
          <SectionHeading icon={<Siren className="w-6 h-6" />} color="#dc2626">
            The Fun Police (Strict Linting)
          </SectionHeading>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            I cannot commit code if it's ugly. The pre-commit hook literally runs tests.
          </Typography>
          <Box component="ul" sx={{ listStyle: 'disc', pl: 2.5, m: 0, mb: 3, color: 'text.secondary', '& > li + li': { mt: 1 } }}>
            <li><strong>Husky & Lint-Staged:</strong> My git hooks reject my code more often than recruiters reject my application.</li>
            <li><strong>Prettier:</strong> If I miss a semicolon, the computer yells at me.</li>
            <li><strong>Strict ESLint:</strong> <CodeSpan>any</CodeSpan> is now illegal. I have to type <CodeSpan>unknown</CodeSpan> and cast it like a wizard.</li>
            <li><strong>TypeScript Strict Mode:</strong> The compiler is more judgmental than my code reviewer.</li>
          </Box>

          <Box sx={{ borderRadius: 3, overflow: 'hidden', border: 1, borderColor: 'divider', boxShadow: 12, bgcolor: '#1e1e1e' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <Typography component="span" sx={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'monospace' }}>
                TERMINAL - PROBLEMS
              </Typography>
              <Stack direction="row" spacing={0.75}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'rgba(239, 68, 68, 0.5)' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'rgba(234, 179, 8, 0.5)' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'rgba(34, 197, 94, 0.5)' }} />
              </Stack>
            </Stack>
            <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, background: 'transparent', overflowX: 'auto' }}>
              {lintSnippet}
            </SyntaxHighlighter>
          </Box>
        </MotionBox>
        {/* Arcade */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 8 }}>
          <SectionHeading icon={<Gamepad2 className="w-6 h-6" />} color="#ec4899">
            The "Stupid Playable Arcade"
          </SectionHeading>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Because every professional portfolio needs a way to waste the recruiter's time.
          </Typography>

          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
                <Typography component="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                  The "Runaway" Button
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 2 }}>
                  Attempts to deploy to production. It moves when you hover. It springs away when you click. It is a metaphor for my career goals.
                </Typography>
                <CodeWindow title="src/components/games/RunawayButton.tsx" language="typescript" code={gameSnippet} small />
              </ModernCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
                <Typography component="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                  CSS Flexbox Torture
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 2 }}>
                  A game where you fix broken layouts. Or break them further. I don't judge.
                </Typography>
                <Box component="ul" sx={{ listStyle: 'disc', pl: 2.5, m: 0, mb: 2, color: 'text.secondary', fontSize: '0.875rem', '& > li + li': { mt: 0.5 } }}>
                  <li><strong>Bug Squash:</strong> Save the production database from actual bugs.</li>
                  <li><strong>Quick Sync Dodge:</strong> Simulate the average Tuesday by dodging calendar invites.</li>
                  <li><strong>Type Torture:</strong> Fix <CodeSpan>any</CodeSpan> types or get roasted.</li>
                </Box>
                <CodeWindow title="src/components/games/FlexPlayground.tsx" language="typescript" code={flexSnippet} small />
              </ModernCard>
            </Grid>
          </Grid>
        </MotionBox>

        {/* Internal Tools */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 8 }}>
          <SectionHeading icon={<Wrench className="w-6 h-6" />} color="#06b6d4">
            Internal Developer Tools
          </SectionHeading>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="flex-start">
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                I built actual tools into this website because opening VS Code is too much effort sometimes.
              </Typography>
              <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)] mb-6">
                <Typography component="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FileText className="w-4 h-4" />
                  The "Lazy Man's Thesis Creator"
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 2 }}>
                  A fully functional **LaTeX Editor** that compiles in the browser using `latex.js`.
                </Typography>
                <Box component="ul" sx={{ listStyle: 'disc', pl: 2.5, m: 0, color: 'text.secondary', fontSize: '0.875rem', '& > li + li': { mt: 0.5 } }}>
                  <li><strong>Live Preview:</strong> See your academic nonsense render in real-time.</li>
                  <li><strong>Cheat Sheet:</strong> For when you forget how to make a Greek letter.</li>
                  <li><strong>PDF Export:</strong> Prints directly to PDF so you can submit your homework.</li>
                </Box>
              </ModernCard>
            </Box>

            <Box sx={{ flex: 1, width: '100%' }}>
              <CodeWindow title="src/pages/tools/LatexEditor.tsx" language="typescript" code={latexSnippet} sx={{ boxShadow: 12 }} />
            </Box>
          </Stack>
        </MotionBox>

        {/* Under The Hood */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 8 }}>
          <SectionHeading icon={<Wrench className="w-6 h-6" />} color="#6b7280">
            Under The Hood
          </SectionHeading>
          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            I built this app with a stack that says "I have too much free time."
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography component="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                Core Stack
              </Typography>
              <Stack component="ul" spacing={1} sx={{ listStyle: 'none', pl: 0, m: 0, color: 'text.secondary', fontSize: '0.875rem' }}>
                <li><strong>Vite:</strong> Because waiting more than 100ms for a local server start is a personal insult to me.</li>
                <li><strong>React 19:</strong> I'm on the bleeding edge. If it breaks, it's a "feature."</li>
                <li><strong>TypeScript:</strong> Because I realized <CodeSpan>any</CodeSpan> is a sin (mostly).</li>
                <li><strong>Framer Motion:</strong> Used everywhere. If an element enters the DOM without a specialized dance routine, did it really render?</li>
                <li><strong>Tailwind CSS:</strong> 50 utility classes in one <CodeSpan>className</CodeSpan> string. Readability is subjective.</li>
                <li><strong>React Helmet Async:</strong> Managing document heads asynchronously because I live in the future.</li>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography component="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                Quality Assurance
              </Typography>
              <Stack component="ul" spacing={1} sx={{ listStyle: 'none', pl: 0, m: 0, color: 'text.secondary', fontSize: '0.875rem' }}>
                <li><strong>ESLint:</strong> Catches my mistakes before my pride does.</li>
                <li><strong>Prettier:</strong> Auto-formats everything so I can pretend I'm consistent.</li>
                <li><strong>Husky:</strong> Git hooks that shame me into writing better code.</li>
              </Stack>
            </Grid>
          </Grid>
        </MotionBox>

        {/* License */}
        <MotionBox component="section" {...sectionMotion} sx={{ mb: 8 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3, color: 'text.primary' }}>
            <FileText className="w-6 h-6" />
            <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'inherit' }}>
              License
            </Typography>
          </Stack>
          <ModernCard className="p-6 bg-[var(--card-bg)] border-[var(--border-color)]">
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              Licensed under <strong>MIT</strong> (Mostly Intense TypeScript).
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              Feel free to steal the WormBackground (it's on npm: <CodeSpan>@alvianzf/squiggly-lines-go-brrr</CodeSpan>) or the testing infrastructure. I know that's the only reason you're looking at the code anyway.
            </Typography>
          </ModernCard>
        </MotionBox>

        {/* Contact */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          sx={{
            textAlign: 'center',
            p: { xs: 3, md: 6 },
            bgcolor: '#0f172a',
            borderRadius: '1.5rem',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 10 }}>
            <Typography variant="h2" sx={{ fontSize: '1.875rem', fontWeight: 700, mb: 2, color: 'inherit' }}>
              Need someone to over-engineer your portfolio?
            </Typography>
            <Typography sx={{ color: '#94a3b8', mb: 4, maxWidth: '32rem', mx: 'auto' }}>
              Or maybe you just want to verify if the worms are actually random.
            </Typography>
            <Button
              component="a"
              href="mailto:hello@alvianzf.id"
              sx={{
                px: 4,
                py: 2,
                bgcolor: '#ffffff',
                color: '#0f172a',
                fontWeight: 700,
                borderRadius: 9999,
                transition: 'all 0.3s',
                '&:hover': { bgcolor: '#ef4444', color: '#ffffff' },
              }}
            >
              hello@alvianzf.id
            </Button>
          </Box>

          {/* Decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              p: 16,
              bgcolor: 'rgba(239, 68, 68, 0.2)',
              borderRadius: '50%',
              filter: 'blur(64px)',
              transform: 'translate(50%, -50%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              p: 16,
              bgcolor: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '50%',
              filter: 'blur(64px)',
              transform: 'translate(-50%, 50%)',
            }}
          />
        </MotionBox>

      </Container>
    </Box>
  );
}
