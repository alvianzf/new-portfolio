import React from 'react';
import Box from '@mui/material/Box';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

interface IsoCardProps {
  children: React.ReactNode;
  className?: string;
  /** Tilt + lift on hover. Disable for cards inside already-tilted contexts. */
  tiltOnHover?: boolean;
  accent?: 'primary' | 'none';
}

/**
 * Isometric card primitive: a flat content face plus a darker offset "side"
 * face behind it, giving a slab-like depth illusion with CSS 3D transforms
 * (no WebGL). Drop-in replacement for the old ModernCard.
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
  const depth = isCyberpunk ? 6 : 10;

  return (
    <Box
      className={`iso-perspective ${className}`}
      sx={{ position: 'relative' }}
    >
      {/* Side face: offset behind the content, gives the slab its depth */}
      <Box
        aria-hidden
        className="iso-face"
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: isCyberpunk ? 0 : 3,
          backgroundColor: 'divider',
          transform: `translate(${depth / 2}px, ${depth / 2}px)`,
          opacity: isCyberpunk ? 0 : 0.6,
          ...(isCyberpunk && {
            boxShadow: `${depth}px ${depth}px 0px ${theme.palette.primary.main}`,
          }),
        }}
      />
      <Box
        component={motion.div}
        className="iso-face"
        whileHover={
          tiltOnHover && !reduceMotion
            ? { rotateX: -4, rotateY: 4, translateZ: 8, translateY: -4 }
            : undefined
        }
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        sx={{
          position: 'relative',
          p: 3,
          borderRadius: isCyberpunk ? 0 : 3,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderTop: accent === 'primary' ? '3px solid' : '1px solid',
          borderTopColor: accent === 'primary' ? 'primary.main' : 'divider',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
