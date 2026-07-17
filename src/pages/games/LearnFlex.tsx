import { Layout } from 'lucide-react';
import { Box, Chip, Container, Typography } from '@mui/material';
import FlexPlayground from '../../components/games/FlexPlayground';

export default function LearnFlex() {
  return (
    <Box className="min-h-screen pt-20 pb-10" sx={{ bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ px: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-6 transition-transform">
            <Layout className="w-8 h-8 text-purple-600" />
          </div>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
            Learn Flexbox (The "Fun" Way)
          </Typography>
          <Typography sx={{ fontSize: '1.125rem', color: 'text.secondary', maxWidth: 672, mx: 'auto' }}>
            Forget about Froggy. Here you center divs because the client changed their mind 5 times today.
          </Typography>
          <Chip
            label="display: flex; justify-content: cry;"
            sx={{ mt: 1, fontFamily: 'monospace', fontSize: '0.75rem' }}
          />
        </Box>

        <FlexPlayground />
      </Container>
    </Box>
  );
}
