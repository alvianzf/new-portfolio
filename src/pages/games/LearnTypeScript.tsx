import { Box, Container, Typography } from '@mui/material';
import TypeEditor from '../../components/games/TypeEditor';

export default function LearnTypeScript() {
  return (
    <Box className="min-h-screen pt-20 pb-10" sx={{ bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ px: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <div className="font-bold text-2xl text-blue-600">TS</div>
          </div>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
            Type Torture
          </Typography>
          <Typography sx={{ fontSize: '1.125rem', color: 'text.secondary', maxWidth: 672, mx: 'auto' }}>
            You said you know TypeScript. Prove it.
            <br />
            Replace the <Box component="span" sx={{ fontFamily: 'monospace', color: '#ef4444' }}>any</Box> with something that makes the linter happy (and your colleagues confused).
          </Typography>
        </Box>

        <TypeEditor />
      </Container>
    </Box>
  );
}
