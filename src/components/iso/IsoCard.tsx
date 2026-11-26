import React from 'react';
import Box from '@mui/material/Box';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme, alpha } from '@mui/material/styles';

interface IsoCardProps {
  children: React.ReactNode;
  className?: string;
  /** Tilt + lift on hover. Disable for cards inside already-tilted contexts. */
  tiltOnHover?: boolean;
  /** Tints the offset "floor" face — primary (default) or a neutral tone. */
  accent?: 'primary' | 'none';
}

/**
 * Isometric card primitive: a persistently-tilted content face plus a
 * colour-tinted offset "floor" face behind it, so the effect reads at a
 * glance (even in a static screenshot) rather than only on hover.
 */
export default function IsoCard({
  children,
  className = '',
  tiltOnHover = true,
  accent = 'primary',
}: IsoCardProps) {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const isCyberpunk = theme.custom?.isCyberpunk ?? false;
  const depth = isCyberpunk ? 10 : 18;
  const tint = accent === 'primary' ? theme.palette.primary.main : theme.palette.text.secondary;

  const baseTilt = reduceMotion ? {} : { rotateX: 4, rotateY: -4 };

  return (
    <Box className={`iso-perspective ${className}`} sx={{ position: 'relative' }}>
      {/* Floor face: tinted, offset behind the content — the main thing that
          makes the isometric effect legible without hovering. */}
      <Box
        aria-hidden
        className="iso-face"
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: isCyberpunk ? 0 : 3,
          backgroundColor: alpha(tint, isCyberpunk ? 0 : 0.14),
          transform: `translate(${depth / 2}px, ${depth / 2}px)`,
          ...(isCyberpunk && {
            boxShadow: `${depth}px ${depth}px 0px ${theme.palette.primary.main}`,
          }),
        }}
      />
      <Box
        component={motion.div}
        className="iso-face"
        initial={baseTilt}
        animate={baseTilt}
        whileHover={
          tiltOnHover && !reduceMotion
            ? { rotateX: 0, rotateY: 0, translateZ: 14, translateY: -10, scale: 1.015 }
            : undefined
        }
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        sx={{
          position: 'relative',
          p: 3,
          borderRadius: isCyberpunk ? 0 : 3,
          backgroundColor: 'background.paper',
          boxShadow: isCyberpunk ? 'none' : 2,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
