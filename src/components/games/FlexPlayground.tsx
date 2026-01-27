import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Level {
  id: number;
  instruction: string;
  sarcasticHint: string;
  targetStyle: {
    justifyContent: string;
    alignItems: string;
    flexDirection?: string;
  };
  items: number;
}

const LEVELS: Level[] = [
  {
    id: 1,
    instruction: "The client wants the div centered. Vertically AND Horizontally. Groundbreaking.",
    sarcasticHint: "Have you tried 'center'? Oh wait, that doesn't exist.",
    targetStyle: { justifyContent: 'center', alignItems: 'center' },
    items: 1
  },
  {
    id: 2,
    instruction: "Move them to the end. The client says 'Start' is too aggressive.",
    sarcasticHint: "Think about the 'end' of your career if you can't do this.",
    targetStyle: { justifyContent: 'flex-end', alignItems: 'center' },
    items: 3
  },
  {
    id: 3,
    instruction: "Space them out evenly. But not *too* evenly.",
    sarcasticHint: "It's the one that has 'space' and 'around' in it. Or maybe 'between'?",
    targetStyle: { justifyContent: 'space-between', alignItems: 'center' },
    items: 3
  },
  {
    id: 4,
    instruction: "Column layout. Because scrolling is the future.",
    sarcasticHint: "Rotate your head 90 degrees.",
    targetStyle: { justifyContent: 'center', alignItems: 'center', flexDirection: 'column' },
    items: 3
  }
];

export default function FlexPlayground() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [styles, setStyles] = useState({
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'row'
  });
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState(false);

  const level = LEVELS[currentLevel];

  useEffect(() => {
    // Check win condition
    const isJustifyMatch = styles.justifyContent === level.targetStyle.justifyContent;
    const isAlignMatch = styles.alignItems === level.targetStyle.alignItems;
    const isDirectionMatch = (level.targetStyle.flexDirection || 'row') === styles.flexDirection;

    if (isJustifyMatch && isAlignMatch && isDirectionMatch) {
      setSuccess(true);
      setFeedback("Finally. Moving on...");
    } else {
      setSuccess(false);
      setFeedback("");
    }
  }, [styles, level]);

  const nextLevel = () => {
    if (currentLevel < LEVELS.length - 1) {
      setCurrentLevel(l => l + 1);
      setStyles({ justifyContent: 'flex-start', alignItems: 'stretch', flexDirection: 'row' });
      setSuccess(false);
      setFeedback("");
    } else {
      setFeedback("You actually finished? Go do some real work.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto">
      {/* Controls */}
      <div className="w-full md:w-1/3 space-y-6 bg-[var(--card-bg)] p-6 rounded-2xl shadow-xl border border-[var(--border-color)]">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Level {level.id}</h2>
          <p className="text-[var(--text-secondary)] mb-4">{level.instruction}</p>
          <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm italic border border-yellow-200">
            Hint: {level.sarcasticHint}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">justify-content</label>
            <select
              value={styles.justifyContent}
              onChange={(e) => setStyles(s => ({ ...s, justifyContent: e.target.value }))}
              className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg p-2.5 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all"
            >
              {['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">align-items</label>
            <select
              value={styles.alignItems}
              onChange={(e) => setStyles(s => ({ ...s, alignItems: e.target.value }))}
              className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg p-2.5 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all"
            >
              {['flex-start', 'flex-end', 'center', 'baseline', 'stretch'].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">flex-direction</label>
            <select
              value={styles.flexDirection}
              onChange={(e) => setStyles(s => ({ ...s, flexDirection: e.target.value }))}
              className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg p-2.5 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all"
            >
              {['row', 'row-reverse', 'column', 'column-reverse'].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 p-3 rounded-lg">
              <Check className="w-5 h-5" />
              {feedback}
            </div>
            <button
              onClick={nextLevel}
              className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Next Level
            </button>
          </motion.div>
        )}
      </div>

      {/* Playground */}
      <div className="flex-1 min-h-[400px] bg-[var(--bg-primary)] rounded-2xl border-4 border-[var(--border-color)] relative overflow-hidden">
        <div
          className="absolute inset-0 p-8 flex gap-4 transition-all duration-500"
          style={{
            justifyContent: styles.justifyContent,
            alignItems: styles.alignItems,
            flexDirection: styles.flexDirection as 'row' | 'row-reverse' | 'column' | 'column-reverse'
          }}
        >
          {Array.from({ length: level.items }).map((_, i) => (
            <motion.div
              key={i}
              layout
              className="w-20 h-20 bg-[#990000] rounded-xl shadow-lg flex items-center justify-center font-bold text-white text-xl border-4 border-white/20"
            >
              div
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
