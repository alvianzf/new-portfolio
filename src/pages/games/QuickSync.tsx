import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, Play, Calendar, Pause, RotateCcw } from 'lucide-react';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import PlayerDev from '../../components/games/PlayerDev';
import CalendarInvite from '../../components/games/CalendarInvite';

interface InviteEntity {
  id: number;
  x: number;
  y: number;
  speed: number;
}

export default function QuickSync() {
  const [playerX, setPlayerX] = useState(50);
  const [invites, setInvites] = useState<InviteEntity[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0); // Time survived in seconds
  const [level, setLevel] = useState(1);

  const requestRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);
  const inviteIdCounter = useRef(0);
  const scoreIntervalRef = useRef<number>(0);

  // Mouse/Touch movement handler
  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isPlaying || gameOver) return;

    let clientX;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }

    const width = window.innerWidth;
    const percentage = (clientX / width) * 100;
    setPlayerX(Math.max(0, Math.min(100, percentage)));
  }, [isPlaying, gameOver]);

  // Game Loop
  const gameLoop = useCallback((time: number) => {
    if (!isPlaying || gameOver || isPaused) return;

    // const deltaTime = time - lastUpdateRef.current;
    lastUpdateRef.current = time;

    // Spawn Invites
    if (Math.random() < 0.02 + (level * 0.005)) {
      setInvites(prev => [...prev, {
        id: inviteIdCounter.current++,
        x: Math.random() * 90 + 5,
        y: -10,
        speed: 0.5 + (level * 0.1) + (Math.random() * 0.5)
      }]);
    }

    // Update Invites
    setInvites(prev => {
      const nextInvites: InviteEntity[] = [];
      let collision = false;

      prev.forEach(invite => {
        const newY = invite.y + invite.speed;

        // Collision Detection
        // Player is at playerX (%), bottom 4px (approx 95% Y)
        // Hitbox approx: X +/- 3%, Y > 92% (Make it tighter)
        if (newY > 92 && newY < 98 && Math.abs(invite.x - playerX) < 5) {
          collision = true;
        }

        if (newY < 110) {
          nextInvites.push({ ...invite, y: newY });
        }
      });

      if (collision) {
        setGameOver(true);
        setIsPlaying(false);
        return prev; // Stop updating
      }

      return nextInvites;
    });

    if (!gameOver) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  }, [isPlaying, gameOver, level, playerX, isPaused]);

  useEffect(() => {
    if (isPlaying && !gameOver && !isPaused) {
      lastUpdateRef.current = performance.now();
      requestRef.current = requestAnimationFrame(gameLoop);

      // Score timer - Use precise timing
      const startTime = Date.now() - (score * 1000);
      scoreIntervalRef.current = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setScore(elapsed);
        if (elapsed > 0 && elapsed % 10 === 0) setLevel(Math.floor(elapsed / 10) + 1);
      }, 100); // Check more frequently
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (scoreIntervalRef.current) window.clearInterval(scoreIntervalRef.current);
    };
  }, [isPlaying, gameOver, isPaused, gameLoop]);

  const startGame = () => {
    setInvites([]);
    setScore(0);
    setLevel(1);
    setGameOver(false);
    setIsPlaying(true);
    setIsPaused(false);
    inviteIdCounter.current = 0;
  };

  return (
    <Box
      className="min-h-screen pt-20 pb-10 overflow-hidden relative select-none cursor-crosshair touch-none"
      sx={{ bgcolor: 'background.default' }}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* HUD */}
      <div className="absolute top-24 left-0 right-0 z-40 px-4 pointer-events-none flex flex-col items-center gap-4">
        <div className="flex justify-center gap-8 w-full max-w-2xl">
          <Paper elevation={8} className="backdrop-blur" sx={{ px: 3, py: 1.5, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Timer className="w-5 h-5 text-blue-500" />
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'text.primary' }}>{score}s</Typography>
            </Box>
            <Box sx={{ width: '1px', height: 24, bgcolor: 'divider' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Trophy className="w-5 h-5 text-yellow-500" />
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'text.secondary' }}>Level {level}</Typography>
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
              sx={{ bgcolor: '#2563eb', color: 'white', fontWeight: 'bold', borderRadius: 2, boxShadow: 4, '&:hover': { bgcolor: '#1d4ed8' } }}
            >
              Restart
            </Button>
          </div>
        )}
      </div>

      {/* Game Area */}
      {!isPlaying && !gameOver ? (
        <div className="absolute inset-0 flex items-center justify-center z-40 bg-[var(--bg-primary)]/50 backdrop-blur-sm pointer-events-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Paper elevation={12} sx={{ p: 4, borderRadius: 6, textAlign: 'center', maxWidth: 448 }}>
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-blue-600" />
              </div>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>Quick Sync Dodge</Typography>
              <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.625 }}>
                Your calendar is filling up. Calls are raining down.
                <br />
                Move your mouse to dodge the "Quick Syncs" and stay in flow state.
              </Typography>
              <Button
                onClick={startGame}
                variant="contained"
                fullWidth
                startIcon={<Play className="w-5 h-5" />}
                sx={{ py: 2, bgcolor: '#2563eb', color: 'white', fontWeight: 'bold', borderRadius: 3, boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)', '&:hover': { bgcolor: '#1d4ed8', transform: 'scale(1.05)' }, '&:active': { transform: 'scale(0.95)' }, transition: 'all 0.2s' }}
              >
                Start Working
              </Button>
            </Paper>
          </motion.div>
        </div>
      ) : null}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md pointer-events-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-lg w-full m-4"
          >
            <Paper elevation={12} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>Meeting Started!</Typography>
              <Typography sx={{ fontSize: '1.25rem', color: 'text.secondary', mb: 4 }}>You got pulled into a "quick 5 min sync" that lasted an hour.</Typography>

              <Box sx={{ bgcolor: 'background.default', borderRadius: 3, p: 3, mb: 4, color: 'text.secondary' }}>
                <Typography sx={{ fontSize: '0.875rem', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em', mb: 1 }}>Time in Flow State</Typography>
                <Typography sx={{ fontSize: '3rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#2563eb' }}>{score}s</Typography>
              </Box>

              <Button
                onClick={startGame}
                variant="contained"
                fullWidth
                sx={{ py: 2, bgcolor: '#0f172a', color: 'white', fontWeight: 'bold', borderRadius: 3, border: '1px solid #334155', boxShadow: 4, '&:hover': { bgcolor: '#1e293b' } }}
              >
                Decline & Return to Work
              </Button>
            </Paper>
          </motion.div>
        </div>
      )}

      {/* Game Entities */}
      <AnimatePresence>
        {isPlaying && (
          <>
            <PlayerDev x={playerX} />
            {invites.map(invite => (
              <CalendarInvite key={invite.id} {...invite} />
            ))}
          </>
        )}
      </AnimatePresence>
      {/* Pause Overlay */}
      {isPaused && (
        <div className="absolute inset-0 z-50 bg-[var(--bg-primary)]/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <Paper elevation={12} className="animate-pulse" sx={{ bgcolor: '#0f172a', color: 'white', px: 4, py: 2, borderRadius: 3, fontWeight: 'bold', fontSize: '1.5rem' }}>
            OUT OF OFFICE
          </Paper>
        </div>
      )}
    </Box>
  );
}
