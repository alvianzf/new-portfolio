import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, TrendingUp } from 'lucide-react';
import ModernCard from './ModernCard';

export default function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a small delay to not annoy immediately
    const timer = setTimeout(() => {
      // Check session storage to see if already dismissed
      const dismissed = sessionStorage.getItem('devshore-promo-dismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('devshore-promo-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full md:w-[400px] px-4 md:px-0"
        >
          <ModernCard className="relative bg-[var(--card-bg)] border border-brand-red/30 shadow-2xl p-0 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-red to-red-700 p-4 text-white flex items-start justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-white/90" />
                <h3 className="font-bold text-lg">2025 Tech Hiring Review</h3>
              </div>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                <strong className="text-[var(--text-primary)]">Devshore Partners</strong> presents an annual analysis of the forces shaping the global and UK tech hiring market.
              </p>
              <p className="text-[var(--text-secondary)] text-xs mb-4 leading-relaxed">
                Explore how AI, cybersecurity, and global talent shortages reshaped 2025. We distill key developments and remote team strategies for business leaders.
              </p>

              <a
                href="https://devshorepartners.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[var(--bg-primary)] hover:bg-brand-red hover:text-white text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg font-semibold text-sm transition-all group"
              >
                Read the Report
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </ModernCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
