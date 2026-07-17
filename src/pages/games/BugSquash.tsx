import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug as BugIcon, AlertTriangle, Trophy, Play, Pause, RotateCcw } from 'lucide-react';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import SEO from '../../components/SEO';
import BSOD from '../../components/games/BSOD';
import Bug from '../../components/games/Bug';

interface BugEntity {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

export default function BugSquash() {
  const [bugs, setBugs] = useState<BugEntity[]>([]);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const requestRef = useRef<number>(0);
  const lastSpawnTime = useRef<number>(0);
  const bugIdCounter = useRef(0);

  // Game Loop
  const gameLoop = useCallback((time: number) => {
    if (!isPlaying || gameOver || isPaused) return;

    // Drain health based on number of bugs
    setHealth(prev => {
      const drain = 0.05 + (bugs.length * 0.02);
      const newHealth = Math.max(0, prev - drain);
      if (newHealth <= 0) {
        setGameOver(true);
        setIsPlaying(false);
      }
      return newHealth;
    });

    // Spawn bugs
    if (time - lastSpawnTime.current > 1000 - Math.min(score * 10, 800)) { // Spawn faster as score increases
      const newBug: BugEntity = {
        id: bugIdCounter.current++,
        x: Math.random() * 90 + 5, // Keep within 5-95% bounds
        y: Math.random() * 80 + 10, // Keep within 10-90% bounds
        createdAt: time,
      };
      setBugs(prev => [...prev, newBug]);
      lastSpawnTime.current = time;
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [isPlaying, gameOver, bugs.length, score, isPaused]);

  useEffect(() => {
    if (isPlaying && !gameOver && !isPaused) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, gameOver, isPaused, gameLoop]);

  const handleSquash = (id: number) => {
    setBugs(prev => prev.filter(b => b.id !== id));
    setScore(prev => prev + 1);
    // Restore health slightly
    setHealth(prev => Math.min(100, prev + 5));
  };

  const startGame = () => {
    setBugs([]);
    setScore(0);
    setHealth(100);
    setGameOver(false);
    setIsPlaying(true);
    setIsPaused(false);
    bugIdCounter.current = 0;
    lastSpawnTime.current = performance.now();
  };

  if (gameOver) {
    return <BSOD error="CRITICAL_PROCESS_DIED_FROM_BUGS" onRestart={startGame} />;
  }

  return (
    <Box className="min-h-screen pt-20 pb-10 px-4 overflow-hidden relative select-none" sx={{ bgcolor: 'background.default' }}>
      <SEO
        title="Bug Squash"
        description="Whack-a-bug stress relief. Squash the bugs before they take down production. Just like your day job, except this one has a score counter."
      />
      {/* HUD */}
      <div className="absolute top-24 left-0 right-0 z-40 px-4 pointer-events-none flex flex-col items-center gap-4">
        <div className="flex justify-center gap-8 w-full max-w-2xl">
          <Paper elevation={8} className="backdrop-blur" sx={{ px: 3, py: 1.5, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'background.paper' }}>
            <Trophy className="w-6 h-6 text-yellow-500" />
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'text.primary' }}>{score}</Typography>
          </Paper>
          <Paper elevation={8} className="backdrop-blur" sx={{ px: 3, py: 1.5, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 200, bgcolor: 'background.paper' }}>
            <AlertTriangle className={`w-6 h-6 ${health < 30 ? 'text-red-500 animate-pulse' : 'text-green-500'}`} />
            <Box sx={{ flex: 1, height: 12, bgcolor: 'divider', borderRadius: 9999, overflow: 'hidden' }}>
              <motion.div
                className={`h-full ${health < 30 ? 'bg-red-500' : 'bg-green-500'}`}
                animate={{ width: `${health}%` }}
              />
            </Box>
          </Paper>
        </div>

        {/* Controls */}
        {isPlaying && (
          <div className="pointer-events-auto flex gap-4">
            <IconButton
              onClick={() => setIsPaused(!isPaused)}
              sx={{ bgcolor: 'background.paper', color: 'text.primary', borderRadius: 2, border: '1px solid', borderColor: 'divider', boxShadow: 4, '&:hover': { bgcolor: 'background.default' } }}
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </IconButton>
            <Button
              onClick={startGame}
              variant="contained"
              startIcon={<RotateCcw className="w-4 h-4" />}
              sx={{ bgcolor: '#ef4444', color: 'white', fontWeight: 'bold', borderRadius: 2, boxShadow: 4, '&:hover': { bgcolor: '#dc2626' } }}
            >
              Restart
            </Button>
          </div>
        )}
      </div>

      {/* Game Area */}
      {!isPlaying ? (
        <div className="absolute inset-0 flex items-center justify-center z-40 bg-[var(--bg-primary)]/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Paper elevation={12} sx={{ p: 4, borderRadius: 6, textAlign: 'center', maxWidth: 448 }}>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BugIcon className="w-10 h-10 text-red-600" />
              </div>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>Bug Squash</Typography>
              <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.625 }}>
                Bugs are destroying the production database!
                <br />
                Click them before the system integrity reaches 0%.
              </Typography>
              <Button
                onClick={startGame}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 2, fontWeight: 'bold', borderRadius: 3, boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.3)', '&:hover': { transform: 'scale(1.05)' }, '&:active': { transform: 'scale(0.95)' }, transition: 'all 0.2s' }}
              >
                Start Debugging
              </Button>
            </Paper>
          </motion.div>
        </div>
      ) : (
        <div className="absolute inset-x-0 top-32 bottom-0">
          <AnimatePresence>
            {bugs.map(bug => (
              <Bug
                key={bug.id}
                id={bug.id}
                x={bug.x}
                y={bug.y}
                onClick={handleSquash}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
      {/* Pause Overlay */}
      {isPaused && (
        <div className="absolute inset-0 z-40 bg-[var(--bg-primary)]/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <Paper elevation={12} className="animate-pulse" sx={{ bgcolor: '#0f172a', color: 'white', px: 4, py: 2, borderRadius: 3, fontWeight: 'bold', fontSize: '1.5rem' }}>
            PAUSED
          </Paper>
        </div>
      )}
    </Box>
  );
}
