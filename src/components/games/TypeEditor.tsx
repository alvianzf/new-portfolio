import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Box, Button, InputBase } from '@mui/material';

interface Challenge {
  id: number;
  codeBefore: string;
  codeAfter: string;
  placeholder: string;
  correctAnswer: (input: string) => boolean;
  hint: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    codeBefore: "const user: ",
    codeAfter: " = { name: 'Alvian', id: 1 };",
    placeholder: "any",
    // Must NOT be 'any' or 'object'. Must be explicit.
    correctAnswer: (input) => !input.includes('any') && !input.includes('object') && input.includes('{') && input.includes('string'),
    hint: "Don't you dare use 'any'. Be specific."
  },
  {
    id: 2,
    codeBefore: "function process<T>(data: ",
    codeAfter: "): T { return data; }",
    placeholder: "any",
    // Must use T
    correctAnswer: (input) => input.trim() === 'T',
    hint: "It's generic for a reason. Use the T."
  },
  {
    id: 3,
    codeBefore: "type ReallyComplex = ",
    codeAfter: ";",
    placeholder: "string",
    // Must be unnecessarily complex
    correctAnswer: (input) => input.length > 20 && (input.includes('|') || input.includes('&') || input.includes('Record')),
    hint: "Make it complicated. If a junior dev can read it, it's wrong."
  }
];

export default function TypeEditor() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");

  const challenge = CHALLENGES[currentLevel];

  const checkAnswer = () => {
    if (input.trim() === 'any') {
      setStatus('error');
      setMessage("I will personally delete your GitHub account if you use 'any'.");
      return;
    }

    if (challenge.correctAnswer(input)) {
      setStatus('success');
      setMessage("Acceptable. You may pass.");
    } else {
      setStatus('error');
      setMessage(challenge.hint);
    }
  };

  const nextLevel = () => {
    if (currentLevel < CHALLENGES.length - 1) {
      setCurrentLevel(l => l + 1);
      setInput("");
      setStatus('idle');
      setMessage("");
    } else {
      setMessage("You have proven yourself worthy of the compiler. Now go fix the 400 other errors.");
    }
  };

  const inputColor = status === 'error' ? '#F48771' : status === 'success' ? '#4EC9B0' : undefined;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="bg-[#1E1E1E] rounded-xl shadow-2xl overflow-hidden border border-slate-700 font-mono text-sm md:text-base">
        {/* Editor Toolbar */}
        <div className="bg-[#252526] px-4 py-2 flex items-center gap-2 border-b border-[#333]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="ml-4 text-slate-400 text-xs">pain.ts</span>
        </div>

        {/* Code Area */}
        <div className="p-8 text-[#D4D4D4] leading-loose">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-[#569CD6]"></span>
            <span>{challenge.codeBefore}</span>
            <div className="relative inline-block min-w-[100px]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  checkAnswer();
                }}
              >
                <InputBase
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setStatus('idle');
                  }}
                  placeholder={challenge.placeholder}
                  autoFocus
                  fullWidth
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: 'inherit',
                    color: inputColor ?? 'white',
                    borderBottom: '2px solid',
                    borderColor: inputColor ?? '#569CD6',
                    borderRadius: 0,
                    transition: 'color 0.2s, border-color 0.2s',
                    '& .MuiInputBase-input': { p: 0 },
                  }}
                />
                {/* Hidden submit so Enter triggers Compile */}
                <button type="submit" hidden />
              </form>
              {status === 'error' && (
                <div className="absolute top-full left-0 w-full h-1 bg-red-500/50 wave-underline" />
              )}
            </div>
            <span>{challenge.codeAfter}</span>
          </div>
        </div>
      </div>

      {/* Feedback & Controls */}
      <div className="flex flex-col items-center gap-4 min-h-[100px]">
        {status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                ...(status === 'success'
                  ? { bgcolor: 'rgba(34, 197, 94, 0.15)', color: '#16a34a' }
                  : { bgcolor: 'rgba(239, 68, 68, 0.15)', color: '#dc2626' }),
              }}
            >
              {status === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
              <span>{message}</span>
            </Box>
          </motion.div>
        )}

        <div className="flex gap-4">
          <Button
            onClick={checkAnswer}
            disabled={status === 'success'}
            variant="contained"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              bgcolor: '#2563eb',
              color: 'white',
              boxShadow: 4,
              '&:hover': { bgcolor: '#1d4ed8', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)' },
            }}
          >
            Compile
          </Button>

          {status === 'success' && currentLevel < CHALLENGES.length - 1 && (
            <Button
              onClick={nextLevel}
              variant="contained"
              sx={{ px: 4, py: 1.5, bgcolor: '#1e293b', color: 'white', fontWeight: 'bold', borderRadius: 2, boxShadow: 4, '&:hover': { bgcolor: '#334155' } }}
            >
              Next Error
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
