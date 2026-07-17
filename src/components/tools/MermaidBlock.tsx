import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';

interface MermaidBlockProps {
  code: string;
  /** Force the light mermaid theme (used by the print copy so diagrams survive white paper). */
  forceLight?: boolean;
}

export default function MermaidBlock({ code, forceLight = false }: MermaidBlockProps) {
  const { theme } = useTheme();
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        // Lazy-load mermaid only when a diagram actually exists,
        // so its considerable bulk stays out of the main bundle.
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: forceLight || theme === 'light' ? 'default' : 'dark',
        });
        const id = `mermaid-slop-${Math.random().toString(36).slice(2, 10)}`;
        const result = await mermaid.render(id, code);
        if (!cancelled) {
          setSvg(result.svg);
          setError('');
        }
      } catch (err) {
        if (!cancelled) {
          setSvg('');
          setError(err instanceof Error ? err.message : String(err));
        }
      }
    }

    renderDiagram();
    return () => {
      cancelled = true;
    };
  }, [code, theme, forceLight]);

  if (error) {
    return (
      <Box sx={{ my: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
        <Typography sx={{ px: 2, py: 1, fontSize: '0.8rem', color: 'text.secondary', borderBottom: '1px solid', borderColor: 'divider' }}>
          Mermaid refused to draw this. Even the AI that hallucinated it seems confused. Raw code below, as nature intended.
        </Typography>
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2,
            bgcolor: 'background.default',
            color: 'text.primary',
            fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
            fontSize: '0.85rem',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
          }}
        >
          {code}
        </Box>
      </Box>
    );
  }

  if (!svg) {
    return (
      <Typography sx={{ my: 2, fontStyle: 'italic', color: 'text.secondary', fontSize: '0.85rem' }}>
        Summoning diagram from the depths of a 2 MB library...
      </Typography>
    );
  }

  return (
    <Box
      sx={{ my: 2, textAlign: 'center', '& svg': { maxWidth: '100%', height: 'auto' } }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
