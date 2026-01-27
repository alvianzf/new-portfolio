import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Lock, Unlock, RotateCcw } from 'lucide-react';
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
    <div className="min-h-screen pt-20 pb-10 bg-[var(--bg-primary)] overflow-hidden relative select-none flex flex-col items-center">
      {/* HUD */}
      <div className="absolute top-24 z-30 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Production Deployment</h1>
        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <Lock className="w-4 h-4" />
          <span className="font-mono text-sm">Environment: PROTECTED</span>
        </div>

        <div className="bg-[var(--card-bg)] px-6 py-3 rounded-xl shadow-lg border border-[var(--border-color)] flex flex-col items-center min-w-[300px]">
          <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Status Log</span>
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
        </div>

        <div className="mt-2 text-sm text-[var(--text-secondary)]">
          Attempts: <span className="font-mono font-bold text-[var(--text-primary)]">{attempts}</span>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 w-full relative">
        <RunawayButton onAttempt={handleAttempt} frozen={isFrozen} />
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 z-50 flex gap-4 pointer-events-auto">
        <button
          onClick={() => setIsFrozen(!isFrozen)}
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${isFrozen
            ? 'bg-red-500 text-white shadow-red-500/30 shadow-lg'
            : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] border border-[var(--border-color)]'
            }`}
        >
          {isFrozen ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          {isFrozen ? "CHEAT MODE: ON" : "Cheat Mode"}
        </button>

        <button
          onClick={() => setAttempts(0)}
          className="px-6 py-3 bg-[var(--card-bg)] text-[var(--text-primary)] rounded-xl shadow-lg font-bold border border-[var(--border-color)] hover:bg-[var(--bg-primary)] transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Shame
        </button>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
        <AlertTriangle className="w-[500px] h-[500px] text-red-500" />
      </div>
    </div>
  );
}
