import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug as BugIcon, AlertTriangle, Trophy, Play, Pause, RotateCcw } from 'lucide-react';
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
    <div className="min-h-screen pt-20 pb-10 px-4 bg-[var(--bg-primary)] overflow-hidden relative select-none">
      {/* HUD */}
      <div className="absolute top-24 left-0 right-0 z-40 px-4 pointer-events-none flex flex-col items-center gap-4">
        <div className="flex justify-center gap-8 w-full max-w-2xl">
          <div className="bg-[var(--card-bg)]/90 backdrop-blur px-6 py-3 rounded-2xl shadow-xl border border-[var(--border-color)] flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-2xl font-bold font-mono text-[var(--text-primary)]">{score}</span>
          </div>
          <div className="bg-[var(--card-bg)]/90 backdrop-blur px-6 py-3 rounded-2xl shadow-xl border border-[var(--border-color)] flex items-center gap-3 min-w-[200px]">
            <AlertTriangle className={`w-6 h-6 ${health < 30 ? 'text-red-500 animate-pulse' : 'text-green-500'}`} />
            <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${health < 30 ? 'bg-red-500' : 'bg-green-500'}`}
                animate={{ width: `${health}%` }}
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        {isPlaying && (
          <div className="pointer-events-auto flex gap-4">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-4 py-2 bg-[var(--card-bg)] text-[var(--text-primary)] rounded-lg shadow-lg font-bold border border-[var(--border-color)] hover:bg-[var(--bg-primary)] transition-colors"
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </button>
            <button
              onClick={startGame}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg font-bold hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Restart
            </button>
          </div>
        )}
      </div>

      {/* Game Area */}
      {!isPlaying ? (
        <div className="absolute inset-0 flex items-center justify-center z-40 bg-[var(--bg-primary)]/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[var(--card-bg)] p-8 rounded-3xl shadow-2xl text-center max-w-md border border-[var(--border-color)]"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BugIcon className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Bug Squash</h1>
            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
              Bugs are destroying the production database!
              <br />
              Click them before the system integrity reaches 0%.
            </p>
            <button
              onClick={startGame}
              className="w-full py-4 bg-[#990000] hover:bg-red-800 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30"
            >
              Start Debugging
            </button>
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
          <div className="bg-slate-900 text-white px-8 py-4 rounded-xl shadow-2xl font-bold text-2xl animate-pulse">
            PAUSED
          </div>
        </div>
      )}
    </div>
  );
}
