import { X } from 'lucide-react';
import { Box, ButtonBase, Dialog, IconButton, Typography } from '@mui/material';

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
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 4, maxHeight: '80vh', display: 'flex', flexDirection: 'column' } } }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'background.default' }}>
        <Box>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>LaTeX Cheat Sheet</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Click any snippet to insert it into your document</Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="Close">
          <X className="w-5 h-5" />
        </IconButton>
      </Box>

      {/* Content */}
      <Box className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" sx={{ p: 3, gap: 3 }}>
        {(Object.keys(SNIPPETS) as Category[]).map((category) => (
          <Box key={category} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography
              component="h3"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 'bold',
                color: 'primary.main',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid',
                borderColor: 'divider',
                pb: 1,
              }}
            >
              {category}
            </Typography>
            <Box sx={{ display: 'grid', gap: 1 }}>
              {SNIPPETS[category].map((snippet) => (
                <ButtonBase
                  key={snippet.label}
                  onClick={() => {
                    onInsert(snippet.code);
                    // Optional: Close on insert? Maybe not, user might want multiple.
                  }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 0.5,
                    p: 1,
                    borderRadius: 2,
                    border: '1px solid transparent',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                    '&:hover': { bgcolor: 'background.default', borderColor: 'divider', '& .snippet-label': { color: 'primary.main' } },
                  }}
                >
                  <Typography className="snippet-label" sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'text.secondary', transition: 'color 0.15s' }}>
                    {snippet.label}
                  </Typography>
                  <Typography
                    component="code"
                    sx={{
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      color: 'text.secondary',
                      bgcolor: 'background.default',
                      px: 0.75,
                      py: 0.25,
                      borderRadius: 1,
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {snippet.code}
                  </Typography>
                </ButtonBase>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.default', textAlign: 'center' }}>
        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
          Tip: Press <Box component="kbd" sx={{ fontFamily: 'inherit', fontWeight: 'bold', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 1, px: 0.5 }}>Esc</Box> to close
        </Typography>
      </Box>
    </Dialog>
  );
}
