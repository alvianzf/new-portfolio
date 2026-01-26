import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const generatePath = (width: number, height: number) => {
  // Create simpler, smoother curves
  const startX = Math.random() * width;
  const startY = Math.random() * height;

  // Fewer control points for smoother "worm" look
  const cp1X = startX + (Math.random() - 0.5) * 400;
  const cp1Y = startY + (Math.random() - 0.5) * 400;
  const endX = cp1X + (Math.random() - 0.5) * 400;
  const endY = cp1Y + (Math.random() - 0.5) * 400;

  return `M ${startX} ${startY} Q ${cp1X} ${cp1Y} ${endX} ${endY}`;
};

const WormLine = ({ width, height, id }: { width: number; height: number; id: number }) => {
  const [d, setD] = useState('');

  useEffect(() => {
    setD(generatePath(width, height));
  }, [width, height, id]);

  if (!d) return null;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={Math.random() * 2 + 1}
      strokeLinecap="round"
      className={id % 2 === 0 ? "text-brand-red/20" : "text-slate-400/30"}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: [0, 1, 1, 0], // Draw, stay, delete
        opacity: [0, 1, 0, 0], // Fade in, stay visible, fade out
        pathOffset: [0, 0, 1, 0] // Move 'forward' while deleting
      }}
      transition={{
        duration: Math.random() * 5 + 5, // 5-10 seconds
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 5, // Random start delay
        repeatDelay: Math.random() * 2 // Random wait before restart
      }}
    />
  );
};

export default function WormBackground() {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    // Only access window on mount
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const wormCount = 50; // Triple the worms

  return (
    <div className="fixed inset-0 -z-10 bg-slate-50 overflow-hidden pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: wormCount }).map((_, i) => (
          <WormLine key={i} width={dimensions.width} height={dimensions.height} id={i} />
        ))}
      </svg>
    </div>
  );
}
