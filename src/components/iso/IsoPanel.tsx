import React from 'react';
import Box from '@mui/material/Box';
import { useTheme, alpha, SxProps, Theme } from '@mui/material/styles';

interface IsoPanelProps {
  children: React.ReactNode;
  className?: string;
  /** Slightly raised/elevated slab (bigger offset shadow). */
  elevated?: boolean;
  /** Extra styles merged onto the content face, for one-off overrides. */
  sx?: SxProps<Theme>;
}

/**
 * Static isometric "slab" panel — same persistent-tilt + tinted-offset
 * technique as IsoCard, but no hover tilt (used for rows/lists where
 * independent wobble would look noisy: Experience tabs, Mentorship
 * features, About).
 */
export default function IsoPanel({ children, className = '', elevated = false, sx }: IsoPanelProps) {
  const theme = useTheme();
  const isCyberpunk = theme.custom?.isCyberpunk ?? false;
  const depth = elevated ? (isCyberpunk ? 12 : 20) : isCyberpunk ? 8 : 16;
  const tint = elevated ? theme.palette.secondary.main : theme.palette.primary.main;

  return (
    <Box className={`iso-perspective ${className}`} sx={{ position: 'relative' }}>
      <Box
        aria-hidden
        className="iso-face"
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: isCyberpunk ? 0 : 3,
          backgroundColor: alpha(tint, isCyberpunk ? 0 : 0.12),
          transform: `translate(${depth / 2}px, ${depth / 2}px)`,
          ...(isCyberpunk && {
            boxShadow: `${depth}px ${depth}px 0px ${theme.palette.secondary.main}`,
          }),
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
      />
      <Box
        className="iso-face"
        sx={[
          {
            position: 'relative',
            p: 3,
            borderRadius: isCyberpunk ? 0 : 3,
            backgroundColor: 'background.paper',
            boxShadow: isCyberpunk ? 'none' : 2,
            transform: isCyberpunk ? 'none' : 'rotateX(4deg) rotateY(-4deg)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': isCyberpunk ? undefined : { transform: 'rotateX(0deg) rotateY(0deg) translateY(-6px)', boxShadow: 4 },
          },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
      >
        {children}
      </Box>
    </Box>
  );
}
