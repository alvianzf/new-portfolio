import { useState } from 'react';
import type { AnimationVariant, Direction, SpeedPreset } from '@alvianzf/squiggly-lines-go-brrr';
import { SquigglyBackground } from '@alvianzf/squiggly-lines-go-brrr';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Bug, Hash, MoreHorizontal, Shuffle, Type, Zap } from 'lucide-react';

const variantIcons = {
  worms: Activity,
  beetles: Bug,
  ants: MoreHorizontal,
  thunder: Zap,
  letters: Type,
  numbers: Hash,
  alphanumeric: Shuffle,
};

const variantLabels = {
  worms: 'Worms',
  beetles: 'Beetles',
  ants: 'Ants',
  thunder: 'Thunder',
  letters: 'Letters',
  numbers: 'Numbers',
  alphanumeric: 'Alphanumeric',
};

const variants: AnimationVariant[] = ['worms', 'beetles', 'ants', 'thunder', 'letters', 'numbers', 'alphanumeric'];
const directions: Direction[] = ['default', 'horizontal', 'vertical', 'diagonal', 'random'];
const speeds: SpeedPreset[] = ['slow', 'normal', 'fast', 'ludicrous'];

export default function WormBackground() {
  const [variant, setVariant] = useState<AnimationVariant>('worms');
  const [direction, setDirection] = useState<Direction>('default');
  const [speed, setSpeed] = useState<SpeedPreset>('normal');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SquigglyBackground
        variant={variant}
        direction={direction}
        speed={speed}
        count={50}
        colors={['text-red-500/20', 'text-slate-400/30']}
        minStrokeWidth={1}
        maxStrokeWidth={3}
        minDuration={5}
        maxDuration={10}
        backgroundColor="var(--bg-primary)"
        className="fixed inset-0 -z-10 pointer-events-none"
      />

      {/* Variant Switcher */}
      <div className="fixed bottom-20 right-4 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-16 right-0 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 mb-2 min-w-[180px]"
            >
              <div className="space-y-1">
                {variants.map((v) => {
                  const Icon = variantIcons[v];
                  return (
                    <button
                      key={v}
                      onClick={() => setVariant(v)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${variant === v
                        ? 'bg-[#990000] text-white'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{variantLabels[v]}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <p className="px-1 pb-1 text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">Direction</p>
                <div className="flex flex-wrap gap-1">
                  {directions.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDirection(d)}
                      className={`px-2 py-1 rounded-md text-xs font-medium capitalize transition-all ${direction === d
                        ? 'bg-[#990000] text-white'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <p className="px-1 pb-1 text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">Speed</p>
                <div className="flex flex-wrap gap-1">
                  {speeds.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={`px-2 py-1 rounded-md text-xs font-medium capitalize transition-all ${speed === s
                        ? 'bg-[#990000] text-white'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:shadow-xl transition-all group"
          aria-label="Change animation variant"
        >
          {(() => {
            const Icon = variantIcons[variant];
            return <Icon className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-[#990000] transition-colors" />;
          })()}
        </motion.button>
      </div>
    </>
  );
}
