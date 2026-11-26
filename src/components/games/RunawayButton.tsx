import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2 } from 'lucide-react';
import { Button } from '@mui/material';

interface RunawayButtonProps {
  onAttempt: () => void;
  onSuccess: () => void;
  frozen?: boolean;
  deployed?: boolean;
}

export default function RunawayButton({ onAttempt, onSuccess, frozen = false, deployed = false }: RunawayButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // Initialize position to center
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleHover = () => {
    // Once deployed, or while cheat mode holds it still, hovering is a no-op
    // so the user can actually land the click that wins the game.
    if (deployed || frozen) return;

    onAttempt();

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

  const handleClick = () => {
    if (deployed) return;
    // A click that actually lands is the win — distinct from a hover near-miss.
    onSuccess();
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
          onClick={handleClick}
          variant="contained"
          disabled={deployed}
          startIcon={deployed ? <CheckCircle2 className="w-5 h-5" /> : <Rocket className="w-5 h-5" />}
          sx={{
            px: 4,
            py: 2,
            bgcolor: deployed ? '#0ea5e9' : '#22c55e',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: 2,
            boxShadow: 4,
            transition: 'transform 0.15s',
            '&:hover': { bgcolor: deployed ? '#0ea5e9' : '#16a34a', transform: deployed ? 'none' : 'scale(1.1)' },
            '&:active': { transform: deployed ? 'none' : 'scale(0.95)' },
            '&.Mui-disabled': { bgcolor: '#0ea5e9', color: 'white', opacity: 0.9 },
          }}
        >
          {deployed ? 'DEPLOYED' : 'DEPLOY TO PRODUCTION'}
        </Button>
      </motion.div>
    </div>
  );
}
