import React from 'react';
import Box from '@mui/material/Box';
import { motion, useReducedMotion } from 'framer-motion';

interface IsoGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: number;
  gap?: number;
  /** Stagger children's entrance when the grid scrolls into view. */
  stagger?: boolean;
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, rotateX: 10, y: 40 },
  show: { opacity: 1, rotateX: 0, y: 0 },
};

/**
 * Lays out IsoCard/IsoPanel children on a shared perspective plane and,
 * optionally, staggers their entrance as a group scrolls into view.
 */
export default function IsoGrid({
  children,
  className = '',
  columns = 3,
  gap = 40,
  stagger = false,
}: IsoGridProps) {
  const reduceMotion = useReducedMotion();
  const items = React.Children.toArray(children);

  if (!stagger || reduceMotion) {
    return (
      <Box
        className={`iso-perspective ${className}`}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: `repeat(${columns}, 1fr)` },
          gap: `${gap}px`,
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      className={`iso-perspective ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: `repeat(${columns}, 1fr)` },
        gap: `${gap}px`,
      }}
    >
      {items.map((child, i) => (
        <motion.div key={i} variants={itemVariants} transition={{ duration: 0.4 }}>
          {child}
        </motion.div>
      ))}
    </Box>
  );
}
