import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { SquigglyBackground } from '@alvianzf/squiggly-lines-go-brrr';

const messages = [
  "Wow, you found nothing. Just like my motivation on a Monday.",
  "404: Page not found. Or maybe it's just ignoring you.",
  "Looks like this link is as broken as my sleep schedule.",
  "Congratulations! You've reached the end of the internet. It's empty here.",
  "I'd help you find what you're looking for, but I'm just a div.",
  "This page is currently out for lunch. Forever.",
  "Error 404: Competence not found. (Just kidding, it's just a wrong link)",
  "You looked left, you looked right, and still found... nothing."
];

export default function NotFound() {
  const navigate = useNavigate();
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans relative overflow-hidden flex items-center justify-center p-6">
      <SquigglyBackground
        variant="worms"
        count={50}
        colors={['text-red-500/20', 'text-slate-400/30']}
        minStrokeWidth={1}
        maxStrokeWidth={3}
        minDuration={5}
        maxDuration={10}
        backgroundColor="#0f172a" // slate-900
        className="fixed inset-0 -z-10 pointer-events-none"
      />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500 mb-4 font-mono">
            404
          </h1>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">
            Well, this is awkward.
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-lg mx-auto">
            {randomMessage}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-all border border-slate-700 hover:border-slate-600 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 text-slate-900 hover:bg-white transition-all font-medium hover:scale-105 active:scale-95"
          >
            <Home className="w-4 h-4" />
            Return Home
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-[-100px] left-0 right-0 text-xs text-slate-700 font-mono"
        >
          (Seriously, there's nothing here. Go away.)
        </motion.p>
      </div>
    </div>
  );
}
