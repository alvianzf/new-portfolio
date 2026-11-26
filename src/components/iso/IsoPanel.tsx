import React from 'react';
import Box from '@mui/material/Box';
import { useTheme, SxProps, Theme } from '@mui/material/styles';

interface IsoPanelProps {
  children: React.ReactNode;
  className?: string;
  /** Slightly raised/elevated slab (bigger offset shadow). */
  elevated?: boolean;
  /** Extra styles merged onto the content face, for one-off overrides. */
  sx?: SxProps<Theme>;
}

/**
 * Static isometric "slab" panel — same offset-face depth technique as
 * IsoCard, but no hover tilt (used for rows/lists where independent
 * wobble would look noisy: Experience tabs, Mentorship features, About).
 */
export default function IsoPanel({ children, className = '', elevated = false, sx }: IsoPanelProps) {
  const theme = useTheme();
  const isCyberpunk = theme.custom?.isCyberpunk ?? false;
  const depth = elevated ? (isCyberpunk ? 8 : 14) : isCyberpunk ? 5 : 8;

  return (
    <Box className={`iso-perspective ${className}`} sx={{ position: 'relative' }}>
      <Box
        aria-hidden
        className="iso-face"
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: isCyberpunk ? 0 : 3,
          backgroundColor: 'divider',
          transform: `translate(${depth / 2}px, ${depth / 2}px)`,
          opacity: isCyberpunk ? 0 : 0.5,
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
            border: '1px solid',
            borderColor: 'divider',
            transition: 'transform 0.3s',
            '&:hover': { transform: 'translateY(-2px)' },
          },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
      >
        {children}
      </Box>
    </Box>
  );
}
