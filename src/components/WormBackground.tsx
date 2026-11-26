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
      <div className="fixed bottom-20 right-4 z-50 iso-perspective">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, rotateX: -10, y: 10 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: -10, y: 10 }}
              style={{
                transformStyle: 'preserve-3d',
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                boxShadow: '8px 8px 0px var(--border-color)',
              }}
              className="absolute bottom-16 right-0 rounded-xl border p-2 mb-2 min-w-[180px]"
            >
              <div className="space-y-1">
                {variants.map((v) => {
                  const Icon = variantIcons[v];
                  const active = variant === v;
                  return (
                    <button
                      key={v}
                      onClick={() => setVariant(v)}
                      style={active ? { backgroundColor: 'var(--accent-primary)', color: '#fff' } : { color: 'var(--text-secondary)' }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:brightness-95"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{variantLabels[v]}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <p className="px-1 pb-1 text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Direction</p>
                <div className="flex flex-wrap gap-1">
                  {directions.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDirection(d)}
                      style={direction === d ? { backgroundColor: 'var(--accent-primary)', color: '#fff' } : { color: 'var(--text-secondary)' }}
                      className="px-2 py-1 rounded-md text-xs font-medium capitalize transition-all hover:brightness-95"
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <p className="px-1 pb-1 text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Speed</p>
                <div className="flex flex-wrap gap-1">
                  {speeds.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      style={speed === s ? { backgroundColor: 'var(--accent-primary)', color: '#fff' } : { color: 'var(--text-secondary)' }}
                      className="px-2 py-1 rounded-md text-xs font-medium capitalize transition-all hover:brightness-95"
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
          whileHover={{ rotateX: -6, rotateY: 6 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            boxShadow: '4px 4px 0px var(--border-color)',
            transformStyle: 'preserve-3d',
          }}
          className="w-12 h-12 rounded-full border flex items-center justify-center transition-all group"
          aria-label="Change animation variant"
        >
          {(() => {
            const Icon = variantIcons[variant];
            return <Icon className="w-5 h-5 transition-colors" style={{ color: 'var(--text-secondary)' }} />;
          })()}
        </motion.button>
      </div>
    </>
  );
}
