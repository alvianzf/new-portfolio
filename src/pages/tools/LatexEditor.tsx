import { useState, useEffect, useRef } from 'react';
import { Download, AlertTriangle, Code, Play, BookOpen } from 'lucide-react';
import { Box, Button, Chip, Paper, TextField, Typography } from '@mui/material';
import SEO from '../../components/SEO';
import LatexCheatSheet from './LatexCheatSheet';
// @ts-expect-error - latex.js likely doesn't have types wrapped nicely for this usage
import { parse, HtmlGenerator } from 'latex.js';

// NOTE: no \usepackage{amsmath} — latex.js 0.12.6 ships an empty dist/packages/
// directory and tries to load packages via runtime require(), which fails under
// Vite/ESM ("error loading package ... require is not defined"). Math is rendered
// by latex.js's bundled KaTeX and does not need the amsmath declaration.
const DEFAULT_LATEX = `\\documentclass{article}
  \\title{General Relativity Notes}
  \\author{Alvian Zachry Faturrahman}
  \\date{\\today}

  \\begin{document}

  \\maketitle

  \\section{Einstein Field Equations}

  The core of General Relativity is described by the Einstein field equations:
  \\[
  R_{\\mu\\nu}
  - \\frac{1}{2} R g_{\\mu\\nu}
  + \\Lambda g_{\\mu\\nu}
  = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}
  \\]

  where
  \\begin{itemize}
    \\item $R_{\\mu\\nu}$ is the Ricci curvature tensor,
    \\item $R$ is the scalar curvature,
    \\item $g_{\\mu\\nu}$ is the metric tensor,
    \\item $\\Lambda$ is the cosmological constant,
    \\item $T_{\\mu\\nu}$ is the stress-energy tensor.
  \\end{itemize}

  \\section{Geodesic Equation}

  Particles follow geodesics in spacetime, described by
  \\[
  \\frac{d^2 x^\\mu}{d\\tau^2}
  + \\Gamma^\\mu_{\\alpha\\beta}
  \\frac{dx^\\alpha}{d\\tau}
  \\frac{dx^\\beta}{d\\tau}
  = 0
  \\]

  \\section{Schwarzschild Metric}

  For a non-rotating, spherically symmetric mass $M$, the metric is
  \\[
  ds^2
  = -\\left(1 - \\frac{r_s}{r}\\right)c^2 dt^2
  + \\left(1 - \\frac{r_s}{r}\\right)^{-1} dr^2
  + r^2 d\\Omega^2
  \\]

  The quantity
  \\[
  r_s = \\frac{2GM}{c^2}
  \\]
  is known as the Schwarzschild radius.

  \\end{document}
`;

export default function LatexEditor() {
  const [code, setCode] = useState(DEFAULT_LATEX);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Block on tablets too for best experience
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const compileLatex = () => {
    try {
      setError(null);
      const generator = new HtmlGenerator({ hyphenate: false });

      // Parse the LaTeX code
      const doc = parse(code, { generator: generator });

      // Get the HTML document from the generator. Pass the CDN dist URL so the
      // generated <head> resolves css/katex.css, css/article.css and js/base.js
      // against it instead of 404ing on relative paths under /tools/.
      const htmlDoc = doc.htmlDocument('https://cdn.jsdelivr.net/npm/latex.js@0.12.6/dist/');

      // Add some basic styling to the generated HTML
      const style = htmlDoc.createElement('style');
      style.textContent = `
        body {
          font-family: 'Times New Roman', serif;
          margin: 0;
          padding: 40px;
          line-height: 1.6;
          background: white;
          color: black;
          max-width: 800px;
          margin: 0 auto;
        }
        .latex-container {
          width: 100%;
          height: 100%;
        }
      `;
      htmlDoc.head.appendChild(style);

      // Render to iframe
      if (iframeRef.current) {
        const iframeDoc = iframeRef.current.contentDocument;
        if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(htmlDoc.documentElement.outerHTML);
          iframeDoc.close();
        }
      }
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to compile LaTeX: Unknown error");
      }
    }
  };

  // Compilation effect — skip while the mobile "Desktop Only" gate is shown
  useEffect(() => {
    if (isMobile) return;
    compileLatex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, isMobile]);

  const handleDownload = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.print();
    }
  };

  const handleInsert = (snippet: string) => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;

    // Insert text
    const newCode = code.substring(0, start) + snippet + code.substring(end);
    setCode(newCode);

    // Restore focus and move cursor
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = start + snippet.length;
        textareaRef.current.selectionEnd = start + snippet.length;
      }
    }, 0);
  };

  if (isMobile) {
    return (
      <Box className="min-h-screen pt-32 pb-20 px-6" sx={{ bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SEO
          title="LaTeX Editor"
          description="Desktop-only LaTeX editor tool."
        />
        <Paper elevation={8} sx={{ textAlign: 'center', maxWidth: 448, p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ width: 64, height: 64, bgcolor: 'rgba(153, 0, 0, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </Box>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>Desktop Only Tool</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            The Lazy Man's Thesis Creator requires a larger screen for the split-view editor and preview experience. Please open this page on your desktop or laptop.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <div className="h-screen pt-20 flex flex-col overflow-hidden bg-slate-900">
      <SEO
        title="Lazy Man's Thesis Creator"
        description="Real-time LaTeX editor and PDF generator directly in your browser."
        keywords={["LaTeX Editor", "Online LaTeX", "Thesis Creator", "PDF Generator", "React Tool"]}
      />

      <LatexCheatSheet
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
        onInsert={handleInsert}
      />

      {/* Tool Header */}
      <Box className="h-16 shrink-0 z-10" sx={{ bgcolor: '#1e293b', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ bgcolor: 'rgba(153, 0, 0, 0.2)', p: 1, borderRadius: 2 }}>
            <Code className="w-5 h-5 text-brand-red" />
          </Box>
          <Box>
            <Typography component="h1" sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Lazy Man's Thesis Creator</Typography>
            <Typography sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>latex.js powered client-side editor</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {error && (
            <Chip
              icon={<AlertTriangle className="w-3 h-3" />}
              label={error}
              size="small"
              sx={{
                bgcolor: 'rgba(127, 29, 29, 0.2)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                fontSize: '0.75rem',
                '& .MuiChip-icon': { color: '#f87171' },
              }}
            />
          )}

          <Button
            onClick={() => setIsCheatSheetOpen(true)}
            startIcon={<BookOpen className="w-4 h-4" />}
            sx={{ bgcolor: '#334155', color: 'white', border: '1px solid #475569', '&:hover': { bgcolor: '#475569' } }}
          >
            Cheat Sheet
          </Button>

          <Button
            onClick={compileLatex}
            startIcon={<Play className="w-4 h-4" />}
            sx={{ bgcolor: '#334155', color: 'white', '&:hover': { bgcolor: '#475569' } }}
          >
            Refresh
          </Button>
          <Button
            onClick={handleDownload}
            variant="contained"
            color="primary"
            startIcon={<Download className="w-4 h-4" />}
            sx={{ fontWeight: 'bold' }}
          >
            Export PDF
          </Button>
        </Box>
      </Box>

      {/* Main Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Pane */}
        <div className="w-1/2 bg-slate-900 border-r border-slate-700 flex flex-col">
          <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 font-mono flex justify-between">
            <span>INPUT (LaTeX)</span>
            <span>Character Count: {code.length}</span>
          </div>
          <TextField
            multiline
            inputRef={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            slotProps={{ htmlInput: { spellCheck: false } }}
            sx={{
              flex: 1,
              minHeight: 0,
              '& .MuiInputBase-root': {
                height: '100%',
                alignItems: 'flex-start',
                p: 0,
                borderRadius: 0,
                bgcolor: '#1e1e1e',
              },
              '& .MuiInputBase-input': {
                height: '100% !important',
                overflow: 'auto !important',
                color: '#cbd5e1',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                lineHeight: 1.625,
                p: 3,
              },
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            }}
          />
        </div>

        {/* Preview Pane */}
        <div className="w-1/2 bg-slate-200 flex flex-col">
          <div className="bg-slate-300 text-slate-600 text-xs px-4 py-2 font-mono font-bold">
            PREVIEW (HTML/PDF)
          </div>
          <div className="flex-1 p-8 overflow-hidden bg-slate-500/10">
            <div className="h-full w-full bg-white shadow-2xl rounded-sm overflow-hidden mx-auto max-w-[210mm]"> {/* A4 width approx */}
              <iframe
                ref={iframeRef}
                title="LaTeX Preview"
                className="w-full h-full border-none"
                sandbox="allow-same-origin allow-scripts allow-popups allow-modals"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
