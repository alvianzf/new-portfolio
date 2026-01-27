import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

interface RunawayButtonProps {
  onAttempt: () => void;
  frozen?: boolean;
}

export default function RunawayButton({ onAttempt, frozen = false }: RunawayButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Initialize position to center
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleHover = () => {
    onAttempt();

    if (frozen) return;

    // Calculate random position within viewport (approx)
    // We want it to move significantly but stay visible
    // Randomize movement
    let newX = (Math.random() - 0.5) * window.innerWidth * 0.8;
    let newY = (Math.random() - 0.5) * window.innerHeight * 0.6;

    // Ensure it moves at least some distance
    if (Math.abs(newX - position.x) < 100) newX += 100 * Math.sign(newX - position.x);
    if (Math.abs(newY - position.y) < 100) newY += 100 * Math.sign(newY - position.y);

    setPosition({ x: newX, y: newY });
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <motion.button
        ref={buttonRef}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={handleHover}
        onClick={handleHover} // Fail-safe if they manage to click
        className="pointer-events-auto px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 z-50 transform hover:scale-110 active:scale-95 transition-transform"
      >
        <Rocket className="w-5 h-5" />
        DEPLOY TO PRODUCTION
      </motion.button>
    </div>
  );
}
