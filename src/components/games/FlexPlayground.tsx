import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Box, Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

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

const CONTROLS: Array<{ key: 'justifyContent' | 'alignItems' | 'flexDirection'; label: string; options: string[] }> = [
  { key: 'justifyContent', label: 'justify-content', options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'] },
  { key: 'alignItems', label: 'align-items', options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'] },
  { key: 'flexDirection', label: 'flex-direction', options: ['row', 'row-reverse', 'column', 'column-reverse'] },
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
      <Paper elevation={8} className="w-full md:w-1/3" sx={{ p: 3, borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>Level {level.id}</Typography>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>{level.instruction}</Typography>
          <Box
            sx={(theme) => ({
              bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.warning.main, 0.15) : '#fefce8',
              color: theme.palette.mode === 'dark' ? theme.palette.warning.light : '#854d0e',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' ? alpha(theme.palette.warning.main, 0.4) : '#fef08a',
              p: 1.5,
              borderRadius: 2,
              fontSize: '0.875rem',
              fontStyle: 'italic',
            })}
          >
            Hint: {level.sarcasticHint}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {CONTROLS.map(control => (
            <TextField
              key={control.key}
              select
              label={control.label}
              value={styles[control.key]}
              onChange={(e) => setStyles(s => ({ ...s, [control.key]: e.target.value }))}
              fullWidth
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              {control.options.map(opt => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </TextField>
          ))}
        </Box>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#16a34a', fontWeight: 'bold', bgcolor: '#f0fdf4', p: 1.5, borderRadius: 2 }}>
              <Check className="w-5 h-5" />
              {feedback}
            </Box>
            <Button
              onClick={nextLevel}
              variant="contained"
              fullWidth
              sx={{ py: 1.5, bgcolor: '#0f172a', color: 'white', fontWeight: 'bold', borderRadius: 2, '&:hover': { bgcolor: '#1e293b' } }}
            >
              Next Level
            </Button>
          </motion.div>
        )}
      </Paper>

      {/* Playground */}
      <Box className="flex-1 min-h-[400px] relative overflow-hidden" sx={{ bgcolor: 'background.default', borderRadius: 4, border: '4px solid', borderColor: 'divider' }}>
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
      </Box>
    </div>
  );
}
