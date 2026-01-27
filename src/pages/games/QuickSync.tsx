import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, Play, Calendar, Pause, RotateCcw } from 'lucide-react';
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
    <div
      className="min-h-screen pt-20 pb-10 bg-slate-100 dark:bg-slate-900 overflow-hidden relative select-none cursor-crosshair touch-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* HUD */}
      <div className="absolute top-24 left-0 right-0 z-40 px-4 pointer-events-none flex flex-col items-center gap-4">
        <div className="flex justify-center gap-8 w-full max-w-2xl">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur px-6 py-3 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-blue-500" />
              <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">{score}s</span>
            </div>
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Level {level}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        {isPlaying && (
          <div className="pointer-events-auto flex gap-4">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg shadow-lg font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </button>
            <button
              onClick={startGame}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Restart
            </button>
          </div>
        )}
      </div>

      {/* Game Area */}
      {!isPlaying && !gameOver ? (
        <div className="absolute inset-0 flex items-center justify-center z-40 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm pointer-events-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl text-center max-w-md border border-slate-200 dark:border-slate-700"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Quick Sync Dodge</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              Your calendar is filling up. Calls are raining down.
              <br />
              Move your mouse to dodge the "Quick Syncs" and stay in flow state.
            </p>
            <button
              onClick={startGame}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start Working
            </button>
          </motion.div>
        </div>
      ) : null}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md pointer-events-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-2xl max-w-lg w-full text-center m-4"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-2">Meeting Started!</h2>
            <p className="text-xl text-slate-500 mb-8">You got pulled into a "quick 5 min sync" that lasted an hour.</p>

            <div className="bg-slate-100 rounded-xl p-6 mb-8">
              <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Time in Flow State</p>
              <p className="text-5xl font-mono font-bold text-blue-600">{score}s</p>
            </div>

            <button
              onClick={startGame}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all"
            >
              Decline & Return to Work
            </button>
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
        <div className="absolute inset-0 z-50 bg-white/20 dark:bg-slate-900/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="bg-slate-900 text-white px-8 py-4 rounded-xl shadow-2xl font-bold text-2xl animate-pulse">
            OUT OF OFFICE
          </div>
        </div>
      )}
    </div>
  );
}
