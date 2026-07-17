import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <SquigglyBackground
        variant="worms"
        count={50}
        colors={['text-red-500/20', 'text-slate-400/30']}
        minStrokeWidth={1}
        maxStrokeWidth={3}
        minDuration={5}
        maxDuration={10}
        backgroundColor={theme.palette.background.default}
        className="fixed inset-0 -z-10 pointer-events-none"
      />

      <Box sx={{ position: 'relative', zIndex: 10, maxWidth: '42rem', width: '100%', textAlign: 'center' }}>
        <Stack spacing={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '4.5rem', md: '8rem' },
                fontWeight: 900,
                fontFamily: 'monospace',
                mb: 2,
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              404
            </Typography>
            <Typography variant="h4" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 700, color: 'text.primary', mb: 3 }}>
              Well, this is awkward.
            </Typography>
            <Typography sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' }, color: 'text.secondary', lineHeight: 1.625, mb: 4, maxWidth: '32rem', mx: 'auto' }}>
              {randomMessage}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Button
                onClick={() => navigate(-1)}
                variant="outlined"
                color="inherit"
                startIcon={<ArrowLeft className="w-4 h-4" style={{ transition: 'transform 0.3s' }} />}
                sx={{
                  px: 3,
                  py: 1.5,
                  color: 'text.primary',
                  bgcolor: 'background.paper',
                  borderColor: 'divider',
                  transition: 'all 0.3s',
                  '&:hover': { borderColor: 'text.secondary', bgcolor: 'background.paper' },
                  '&:hover svg': { transform: 'translateX(-4px)' },
                }}
              >
                Go Back
              </Button>

              <Button
                onClick={() => navigate('/')}
                variant="contained"
                startIcon={<Home className="w-4 h-4" />}
                sx={{
                  px: 3,
                  py: 1.5,
                  fontWeight: 500,
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'scale(1.05)' },
                  '&:active': { transform: 'scale(0.95)' },
                }}
              >
                Return Home
              </Button>
            </Stack>
          </motion.div>

          <Typography
            component={motion.p}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8, duration: 1 }}
            sx={{
              position: 'absolute',
              bottom: '-100px',
              left: 0,
              right: 0,
              px: 3,
              maxWidth: '100vw',
              overflowWrap: 'break-word',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: 'text.secondary',
            }}
          >
            (Seriously, there's nothing here. Go away.)
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
