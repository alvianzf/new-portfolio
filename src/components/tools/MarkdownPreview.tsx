import { isValidElement, useMemo, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Link, Typography } from '@mui/material';
import MermaidBlock from './MermaidBlock';

const MONO_FONT = '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';

function buildComponents(forceLightMermaid: boolean): Components {
  return {
    h1: ({ children }) => (
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mt: 3, mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mt: 3, mb: 1.5, pb: 0.75, borderBottom: '1px solid', borderColor: 'divider' }}>
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mt: 2.5, mb: 1 }}>
        {children}
      </Typography>
    ),
    h4: ({ children }) => (
      <Typography component="h4" sx={{ fontWeight: 700, fontSize: '1rem', mt: 2, mb: 1 }}>
        {children}
      </Typography>
    ),
    h5: ({ children }) => (
      <Typography component="h5" sx={{ fontWeight: 700, fontSize: '0.9rem', mt: 2, mb: 1 }}>
        {children}
      </Typography>
    ),
    h6: ({ children }) => (
      <Typography component="h6" sx={{ fontWeight: 700, fontSize: '0.85rem', mt: 2, mb: 1, color: 'text.secondary' }}>
        {children}
      </Typography>
    ),
    p: ({ children }) => (
      <Typography component="p" sx={{ my: 1.5, lineHeight: 1.75 }}>
        {children}
      </Typography>
    ),
    a: ({ href, children }) => (
      <Link href={href} target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main' }}>
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <Box component="ul" sx={{ pl: 3.5, my: 1.5, '& > li': { my: 0.5, lineHeight: 1.7 } }}>
        {children}
      </Box>
    ),
    ol: ({ children }) => (
      <Box component="ol" sx={{ pl: 3.5, my: 1.5, '& > li': { my: 0.5, lineHeight: 1.7 } }}>
        {children}
      </Box>
    ),
    blockquote: ({ children }) => (
      <Box component="blockquote" sx={{ borderLeft: '4px solid', borderColor: 'divider', pl: 2, my: 2, mx: 0, color: 'text.secondary', fontStyle: 'italic' }}>
        {children}
      </Box>
    ),
    hr: () => <Box component="hr" sx={{ border: 'none', borderTop: '1px solid', borderColor: 'divider', my: 3 }} />,
    img: ({ src, alt }) => <Box component="img" src={src} alt={alt} sx={{ maxWidth: '100%', borderRadius: 1 }} />,
    table: ({ children }) => (
      <Box sx={{ overflowX: 'auto', my: 2 }}>
        <Box
          component="table"
          sx={{
            borderCollapse: 'collapse',
            width: '100%',
            '& th, & td': { border: '1px solid', borderColor: 'divider', px: 1.5, py: 1, textAlign: 'left', verticalAlign: 'top' },
            '& th': { bgcolor: 'background.default', fontWeight: 600 },
          }}
        >
          {children}
        </Box>
      </Box>
    ),
    pre: ({ children }) => {
      if (isValidElement(children)) {
        const childProps = children.props as { className?: string; children?: ReactNode };
        if (childProps.className?.includes('language-mermaid')) {
          return (
            <MermaidBlock
              code={String(childProps.children ?? '').replace(/\n$/, '')}
              forceLight={forceLightMermaid}
            />
          );
        }
      }
      return (
        <Box
          component="pre"
          sx={{
            bgcolor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 2,
            my: 2,
            overflowX: 'auto',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            fontFamily: MONO_FONT,
            '& code': { bgcolor: 'transparent', border: 'none', p: 0, fontSize: 'inherit' },
          }}
        >
          {children}
        </Box>
      );
    },
    code: ({ className, children }) => (
      <Box
        component="code"
        className={className}
        sx={{
          fontFamily: MONO_FONT,
          bgcolor: 'background.default',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 0.5,
          px: 0.6,
          py: 0.1,
          fontSize: '0.85em',
        }}
      >
        {children}
      </Box>
    ),
  };
}

interface MarkdownPreviewProps {
  markdown: string;
  /** The print copy sets this so mermaid diagrams render in the light theme on white paper. */
  forceLightMermaid?: boolean;
}

export default function MarkdownPreview({ markdown, forceLightMermaid = false }: MarkdownPreviewProps) {
  const components = useMemo(() => buildComponents(forceLightMermaid), [forceLightMermaid]);

  return (
    <Box sx={{ color: 'text.primary', fontSize: '0.95rem', wordBreak: 'break-word' }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </Box>
  );
}
