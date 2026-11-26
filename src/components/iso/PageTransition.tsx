import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const variants = {
  initial: { opacity: 0, rotateX: -6, y: 24 },
  animate: { opacity: 1, rotateX: 0, y: 0 },
  exit: { opacity: 0, rotateX: 6, y: -16 },
};

const reducedVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Wraps <Routes> and owns the location key AnimatePresence needs to fire
 * exit transitions on route change (the previous bare AnimatePresence had
 * no key, so page-exit animations never actually ran).
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const v = reduceMotion ? reducedVariants : variants;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={v}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
