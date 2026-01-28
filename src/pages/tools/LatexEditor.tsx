import { useState, useEffect, useRef } from 'react';
import { Download, AlertTriangle, Code, Play, BookOpen } from 'lucide-react';
import SEO from '../../components/SEO';
import LatexCheatSheet from './LatexCheatSheet';
// @ts-expect-error - latex.js likely doesn't have types wrapped nicely for this usage
import { parse, HtmlGenerator } from 'latex.js';

const DEFAULT_LATEX = `\\documentclass{article}
  \\usepackage{amsmath}

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
  const [isMobile, setIsMobile] = useState(false);
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

      // Get the HTML document from the generator
      const htmlDoc = doc.htmlDocument();

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

  // Compilation effect
  useEffect(() => {
    compileLatex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

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
      <div className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 flex items-center justify-center">
        <SEO
          title="LaTeX Editor"
          description="Desktop-only LaTeX editor tool."
        />
        <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-xl border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Desktop Only Tool</h1>
          <p className="text-slate-600">
            The Lazy Man's Thesis Creator requires a larger screen for the split-view editor and preview experience. Please open this page on your desktop or laptop.
          </p>
        </div>
      </div>
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
      <div className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-brand-red/20 p-2 rounded-lg">
            <Code className="w-5 h-5 text-brand-red" />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm tracking-wide uppercase">Lazy Man's Thesis Creator</h1>
            <p className="text-slate-400 text-xs">latex.js powered client-side editor</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {error && (
            <span className="text-red-400 text-xs flex items-center gap-1 bg-red-900/20 px-3 py-1.5 rounded-full border border-red-500/20">
              <AlertTriangle className="w-3 h-3" />
              {error}
            </span>
          )}

          <button
            onClick={() => setIsCheatSheetOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-600 transition-colors border border-slate-600"
          >
            <BookOpen className="w-4 h-4" />
            Cheat Sheet
          </button>

          <button
            onClick={compileLatex}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-600 transition-colors"
          >
            <Play className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-500/20"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Pane */}
        <div className="w-1/2 bg-slate-900 border-r border-slate-700 flex flex-col">
          <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 font-mono flex justify-between">
            <span>INPUT (LaTeX)</span>
            <span>Character Count: {code.length}</span>
          </div>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-[#1e1e1e] text-slate-300 p-6 font-mono text-sm resize-none focus:outline-none leading-relaxed"
            spellCheck="false"
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
