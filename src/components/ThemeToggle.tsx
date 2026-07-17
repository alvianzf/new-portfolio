import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Terminal } from 'lucide-react';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('cyberpunk');
    else setTheme('light');
  };

  const getIcon = () => {
    switch (theme) {
      case 'dark': return <Moon className="w-5 h-5 text-blue-400" />;
      case 'cyberpunk': return <Terminal className="w-5 h-5 text-green-400" />;
      default: return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <IconButton
      onClick={toggleTheme}
      aria-label="Toggle theme"
      sx={{
        p: 1.5,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        boxShadow: 4,
        backdropFilter: 'blur(4px)',
        transition: 'all 0.3s',
        zIndex: 100,
        '&:hover': {
          bgcolor: 'background.paper',
          boxShadow: 8,
          transform: 'scale(1.1)',
        },
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>
    </IconButton>
  );
}
