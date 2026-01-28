import { useState } from 'react';
import { SquigglyBackground } from '@alvianzf/squiggly-lines-go-brrr';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Bug, MoreHorizontal, Zap } from 'lucide-react';

type Variant = 'worms' | 'beetles' | 'ants' | 'thunder';

const variantIcons = {
  worms: Activity,
  beetles: Bug,
  ants: MoreHorizontal,
  thunder: Zap,
};

const variantLabels = {
  worms: 'Worms',
  beetles: 'Beetles',
  ants: 'Ants',
  thunder: 'Thunder',
};

export default function WormBackground() {
  const [variant, setVariant] = useState<Variant>('worms');
  const [isOpen, setIsOpen] = useState(false);

  const variants: Variant[] = ['worms', 'beetles', 'ants', 'thunder'];

  return (
    <>
      <SquigglyBackground
        variant={variant}
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
              className="absolute bottom-16 right-0 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 mb-2 min-w-[140px]"
            >
              <div className="space-y-1">
                {variants.map((v) => {
                  const Icon = variantIcons[v];
                  return (
                    <button
                      key={v}
                      onClick={() => {
                        setVariant(v);
                        setIsOpen(false);
                      }}
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
