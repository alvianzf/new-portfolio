import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { Button } from '@mui/material';

interface RunawayButtonProps {
  onAttempt: () => void;
  frozen?: boolean;
}

export default function RunawayButton({ onAttempt, frozen = false }: RunawayButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
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
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="pointer-events-auto z-50"
      >
        <Button
          onMouseEnter={handleHover}
          onClick={handleHover} // Fail-safe if they manage to click
          variant="contained"
          startIcon={<Rocket className="w-5 h-5" />}
          sx={{
            px: 4,
            py: 2,
            bgcolor: '#22c55e',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: 2,
            boxShadow: 4,
            transition: 'transform 0.15s',
            '&:hover': { bgcolor: '#16a34a', transform: 'scale(1.1)' },
            '&:active': { transform: 'scale(0.95)' },
          }}
        >
          DEPLOY TO PRODUCTION
        </Button>
      </motion.div>
    </div>
  );
}
