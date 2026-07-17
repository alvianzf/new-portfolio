import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Lock, Unlock, RotateCcw } from 'lucide-react';
import { Box, Button, Paper, Typography } from '@mui/material';
import RunawayButton from '../../components/games/RunawayButton';

const TAUNTS = [
  "Nice try.",
  "Too slow.",
  "Need a better mouse?",
  "Deploy failed: Button moved.",
  "Permission denied: You are not fast enough.",
  "Error: Layer 8 issue detected.",
  "Git push --force? I don't think so.",
  "Have you tried turning it off and on again?",
  "Maybe deploy to staging first?",
  "404: Button not found."
];

export default function ElusiveDeploy() {
  const [attempts, setAttempts] = useState(0);
  const [taunt, setTaunt] = useState("Click the button to deploy.");
  const [isFrozen, setIsFrozen] = useState(false);

  const handleAttempt = () => {
    setAttempts(prev => prev + 1);
    if (isFrozen) {
      setTaunt("Cheating? Really? Fine, deploy it.");
    } else {
      const randomTaunt = TAUNTS[Math.floor(Math.random() * TAUNTS.length)];
      setTaunt(randomTaunt);
    }
  };

  return (
    <Box className="min-h-screen pt-20 pb-10 overflow-hidden relative select-none flex flex-col items-center" sx={{ bgcolor: 'background.default' }}>
      {/* HUD */}
      <div className="relative mt-4 z-30 flex flex-col items-center gap-4 px-6">
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Production Deployment</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
          <Lock className="w-4 h-4" />
          <Typography sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>Environment: PROTECTED</Typography>
        </Box>

        <Paper elevation={4} sx={{ px: 3, py: 1.5, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 300 }}>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.5 }}>Status Log</Typography>
          <AnimatePresence mode="wait">
            <motion.p
              key={attempts}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 font-mono font-bold text-center"
            >
              {`> ${taunt}`}
            </motion.p>
          </AnimatePresence>
        </Paper>

        <Typography sx={{ mt: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
          Attempts: <Box component="span" sx={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'text.primary' }}>{attempts}</Box>
        </Typography>
      </div>

      {/* Game Area */}
      <div className="flex-1 w-full relative">
        <RunawayButton onAttempt={handleAttempt} frozen={isFrozen} />
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 z-50 flex gap-4 pointer-events-auto">
        <Button
          onClick={() => setIsFrozen(!isFrozen)}
          startIcon={isFrozen ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 'bold',
            ...(isFrozen
              ? { bgcolor: '#ef4444', color: 'white', boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.3)', '&:hover': { bgcolor: '#dc2626' } }
              : { bgcolor: 'background.paper', color: 'text.secondary', border: '1px solid', borderColor: 'divider', '&:hover': { bgcolor: 'background.default' } }),
          }}
        >
          {isFrozen ? "CHEAT MODE: ON" : "Cheat Mode"}
        </Button>

        <Button
          onClick={() => setAttempts(0)}
          startIcon={<RotateCcw className="w-4 h-4" />}
          sx={{ px: 3, py: 1.5, bgcolor: 'background.paper', color: 'text.primary', borderRadius: 3, boxShadow: 4, fontWeight: 'bold', border: '1px solid', borderColor: 'divider', '&:hover': { bgcolor: 'background.default' } }}
        >
          Reset Shame
        </Button>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
        <AlertTriangle className="w-[500px] h-[500px] text-red-500" />
      </div>
    </Box>
  );
}
