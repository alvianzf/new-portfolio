import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Category = 'Structure' | 'Text' | 'Math' | 'Greek' | 'Lists';

interface Snippet {
  label: string;
  code: string;
}

const SNIPPETS: Record<Category, Snippet[]> = {
  Structure: [
    { label: 'Document Class', code: '\\documentclass{article}' },
    { label: 'Begin Document', code: '\\begin{document}\n\n\\end{document}' },
    { label: 'Section', code: '\\section{Title}' },
    { label: 'Subsection', code: '\\subsection{Title}' },
    { label: 'Paragraph', code: '\\paragraph{Title}' },
    { label: 'Table of Contents', code: '\\tableofcontents' },
    { label: 'Title/Author', code: '\\title{...}\n\\author{...}\n\\date{\\today}\n\\maketitle' },
  ],
  Text: [
    { label: 'Bold', code: '\\textbf{text}' },
    { label: 'Italic', code: '\\textit{text}' },
    { label: 'Underline', code: '\\underline{text}' },
    { label: 'Emphasis', code: '\\emph{text}' },
    { label: 'Typewriter', code: '\\texttt{text}' },
    { label: 'New Line', code: '\\\\' },
    { label: 'New Page', code: '\\newpage' },
  ],
  Math: [
    { label: 'Inline Math', code: '$ ... $' },
    { label: 'Display Math', code: '\\[ ... \\]' },
    { label: 'Fraction', code: '\\frac{numerator}{denominator}' },
    { label: 'Square Root', code: '\\sqrt{x}' },
    { label: 'Summation', code: '\\sum_{i=1}^{n}' },
    { label: 'Integral', code: '\\int_{a}^{b}' },
    { label: 'Superscript', code: 'x^{2}' },
    { label: 'Subscript', code: 'x_{i}' },
  ],
  Greek: [
    { label: 'Alpha', code: '\\alpha' },
    { label: 'Beta', code: '\\beta' },
    { label: 'Gamma', code: '\\gamma' },
    { label: 'Delta', code: '\\delta' },
    { label: 'Pi', code: '\\pi' },
    { label: 'Theta', code: '\\theta' },
    { label: 'Lambda', code: '\\lambda' },
    { label: 'Sigma', code: '\\sigma' },
    { label: 'Omega', code: '\\omega' },
  ],
  Lists: [
    { label: 'Itemize (Bullet)', code: '\\begin{itemize}\n  \\item \n\\end{itemize}' },
    { label: 'Enumerate (Number)', code: '\\begin{enumerate}\n  \\item \n\\end{enumerate}' },
  ]
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (code: string) => void;
}

export default function LatexCheatSheet({ isOpen, onClose, onInsert }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-slate-800 w-full max-w-4xl max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">LaTeX Cheat Sheet</h2>
                <p className="text-xs text-slate-500">Click any snippet to insert it into your document</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(Object.keys(SNIPPETS) as Category[]).map((category) => (
                <div key={category} className="space-y-3">
                  <h3 className="text-sm font-bold text-brand-red uppercase tracking-wider border-b border-slate-100 pb-2">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {SNIPPETS[category].map((snippet) => (
                      <button
                        key={snippet.label}
                        onClick={() => {
                          onInsert(snippet.code);
                          // Optional: Close on insert? Maybe not, user might want multiple.
                        }}
                        className="group flex flex-col items-start gap-1 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all text-left"
                      >
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-brand-red transition-colors">
                          {snippet.label}
                        </span>
                        <code className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded w-full truncate">
                          {snippet.code}
                        </code>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-center">
              <p className="text-xs text-slate-400">
                Tip: Press <kbd className="font-sans font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-1">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
