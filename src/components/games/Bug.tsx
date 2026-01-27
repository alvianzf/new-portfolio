import { motion } from 'framer-motion';
import { Bug as BugIcon } from 'lucide-react';

interface BugProps {
  id: number;
  x: number;
  y: number;
  onClick: (id: number) => void;
}

export default function Bug({ id, x, y, onClick }: BugProps) {
  return (
    <motion.button
      initial={{ scale: 0, rotate: 0 }}
      animate={{
        scale: 1,
        rotate: [0, -10, 10, -10, 0],
        x: [0, 10, -10, 0],
        y: [0, -5, 5, 0]
      }}
      transition={{
        rotate: { repeat: Infinity, duration: 0.5 },
        x: { repeat: Infinity, duration: 2, ease: "linear" },
        y: { repeat: Infinity, duration: 3, ease: "linear" }
      }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(id);
      }}
      className="p-2 text-red-500 hover:text-red-600 transition-colors transform -translate-x-1/2 -translate-y-1/2 z-10"
    >
      <BugIcon className="w-8 h-8 drop-shadow-lg" />
    </motion.button>
  );
}
