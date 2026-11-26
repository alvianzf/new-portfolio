import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Tilt in from an isometric angle instead of a plain fade/slide-up. */
  iso?: boolean;
}

/**
 * Scroll-triggered entrance. Superset of the old ScrollReveal: default
 * behavior (iso=false) is identical fade+slide-up, `iso` adds a tilt-in
 * for the isometric section-to-section transition language.
 */
export default function SectionReveal({
  children,
  delay = 0,
  className = '',
  iso = false,
}: SectionRevealProps) {
  const reduceMotion = useReducedMotion();

  const initial = reduceMotion
    ? { opacity: 0 }
    : iso
      ? { opacity: 0, rotateX: 10, y: 30 }
      : { opacity: 0, y: 20 };

  const animate = reduceMotion ? { opacity: 1 } : iso ? { opacity: 1, rotateX: 0, y: 0 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
      style={iso ? { transformStyle: 'preserve-3d', perspective: 1000 } : undefined}
    >
      {children}
    </motion.div>
  );
}
