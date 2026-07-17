import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, TrendingUp } from 'lucide-react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

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
          className="fixed bottom-20 right-6 z-40 max-w-sm w-full md:w-[400px] px-4 md:px-0"
        >
          <Paper
            elevation={12}
            sx={{
              overflow: 'hidden',
              border: 1,
              borderColor: 'primary.main',
              bgcolor: 'background.paper',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 2,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp className="w-5 h-5" />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.125rem', color: 'inherit' }}>
                  2025 Tech Hiring Review
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={handleClose}
                aria-label="Close"
                sx={{ color: 'inherit', opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                <X className="w-5 h-5" />
              </IconButton>
            </Box>

            {/* Content */}
            <Box sx={{ p: 2.5 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                <Box component="strong" sx={{ color: 'text.primary' }}>Devshore Partners</Box> presents an annual analysis of the forces shaping the global and UK tech hiring market.
              </Typography>
              <Typography variant="caption" component="p" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
                Explore how AI, cybersecurity, and global talent shortages reshaped 2025. We distill key developments and remote team strategies for business leaders.
              </Typography>

              <Button
                fullWidth
                variant="outlined"
                component="a"
                href="https://devshorepartners.com"
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<ExternalLink className="w-4 h-4" />}
                sx={{
                  color: 'text.primary',
                  borderColor: 'divider',
                  bgcolor: 'background.default',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    borderColor: 'primary.main',
                  },
                }}
              >
                Read the Report
              </Button>
            </Box>
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
