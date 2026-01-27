import { motion } from 'framer-motion';
import { User, Code2 } from 'lucide-react';

interface PlayerDevProps {
  x: number; // 0-100 percentage
}

export default function PlayerDev({ x }: PlayerDevProps) {
  return (
    <motion.div
      animate={{ left: `${x}%` }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute bottom-4 w-12 h-12 -ml-6 z-20"
      style={{ left: `${x}%` }}
    >
      <div className="relative w-full h-full bg-slate-900 dark:bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 dark:border-slate-700">
        <User className="w-6 h-6 text-white dark:text-slate-900" />
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap font-bold">
          <Code2 className="w-3 h-3 inline mr-1" />
          Coding...
        </div>
      </div>
    </motion.div>
  );
}
