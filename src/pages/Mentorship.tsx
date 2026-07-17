import { motion } from 'framer-motion';
import { ExternalLink, Flame, Target, MessageCircle, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import learnWithAndiLogo from '../assets/learnwithandi.png';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';

import WormBackground from '../components/WormBackground';

export default function Mentorship() {
  const { theme } = useTheme();
  const isCyberpunk = theme === 'cyberpunk';
  const features = [
    {
      icon: <Flame size={24} />,
      title: "Get Roasted",
      description: "I'll dig into your fundamentals until you discover your own gaps."
    },
    {
      icon: <Target size={24} />,
      title: "Real Interview Simulation",
      description: "Practice with someone who's been on both sides of the interview table."
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Brutally Honest Feedback",
      description: "No nitpicking on hard skills—just pure interview performance."
    },
    {
      icon: <Zap size={24} />,
      title: "Find Your Gaps",
      description: "You'll identify exactly where you need to improve—yourself."
    }
  ];

  const benefits = [
    "Interview communication skills",
    "Fundamentals deep-dive",
    "Problem-solving approach",
    "Thinking out loud",
    "Handling pressure",
    "Self-awareness building"
  ];

  const mentorshipSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Tech Interview Mentorship by Alvian Zachry Faturrahman",
    "url": "https://alvianzf.id/mentorship",
    "provider": {
      "@type": "Person",
      "name": "Alvian Zachry Faturrahman",
      "url": "https://alvianzf.id"
    },
    "serviceType": "Technical Interview Coaching",
    "description": "Brutal, honest mock technical interviews to prepare software engineers for real job interviews. Covers interview communication, fundamentals, problem-solving, and self-awareness.",
    "areaServed": "Worldwide",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://learnwithandi.com",
      "serviceType": "Online"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://learnwithandi.com",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 10, md: 16 }, pb: 10, transition: 'background-color 0.3s' }}>
      <WormBackground />
      <SEO
        title="Tech Interview Mentorship"
        description="Brutal, honest mock technical interviews with a recruiter who's been on both sides of the table. Book at learnwithandi.com."
        keywords={[
          "Tech Interview Prep", "Mock Interview", "Software Engineer Interview",
          "Coding Interview", "System Design Interview", "Career Coaching",
          "Mentorship", "Interview Roasting", "Learn With Andi",
          "Recruiter Advice", "Bootcamp Instructor", "Alvian Zachry Faturrahman"
        ]}
        schema={mentorshipSchema}
      />
      <Container maxWidth="xl" sx={{ px: 3 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 896, mx: 'auto' }}>
            <Chip
              icon={<Flame size={16} />}
              label="Now Accepting Students"
              sx={{
                mb: 3,
                fontWeight: 500,
                fontSize: '0.875rem',
                color: 'primary.main',
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                '& .MuiChip-icon': { color: 'primary.main' },
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.25rem', md: '3.75rem' },
                fontWeight: 700,
                color: 'text.primary',
                mb: 3,
                lineHeight: 1.25,
              }}
            >
              I'll <Box component="span" sx={{ color: 'primary.main' }}>Roast</Box> Your Tech Interview Skills
              <Box component="span" sx={{ color: 'primary.main' }}>.</Box>
            </Typography>

            <Typography
              sx={{
                fontSize: '1.25rem',
                color: 'text.secondary',
                mb: 4,
                maxWidth: 672,
                mx: 'auto',
                lineHeight: 1.625,
              }}
            >
              No fluff. No hand-holding. Just brutal, honest feedback that'll actually prepare you
              for the real thing. Think you're ready? Let's find out.
            </Typography>

            <motion.div
              style={{ display: 'inline-block' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                href="https://learnwithandi.com?utm_source=alvianzf.id"
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<ExternalLink size={20} />}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'background.default',
                  bgcolor: 'text.primary',
                  boxShadow: 3,
                  transition: 'background-color 0.3s',
                  '&:hover': { bgcolor: 'primary.main', color: '#ffffff', boxShadow: 6 },
                }}
              >
                Book a Session
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {features.map((feature, index) => (
              <Grid key={feature.title} size={{ xs: 12, md: 6, lg: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  style={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      '&:hover': { borderColor: (theme) => alpha(theme.palette.primary.main, 0.3) },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          p: 1.5,
                          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                          color: 'primary.main',
                          borderRadius: 3,
                          width: 'fit-content',
                          mb: 2,
                          display: 'flex',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{ fontSize: '1.125rem', fontWeight: 700, color: 'text.primary', mb: 1 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* What You'll Get Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Typography
                variant="h2"
                sx={{ fontSize: '1.875rem', fontWeight: 700, color: 'text.primary', mb: 3 }}
              >
                What You'll Get <Box component="span" sx={{ color: 'primary.main' }}>Grilled</Box> On
              </Typography>
              <Stack spacing={2}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Box component={CheckCircle2} size={20} sx={{ color: 'primary.main', flexShrink: 0 }} />
                      <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>{benefit}</Typography>
                    </Stack>
                  </motion.div>
                ))}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <Card
                sx={{
                  p: 4,
                  ...(isCyberpunk
                    ? {
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'primary.main',
                        color: 'text.primary',
                      }
                    : {
                        background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
                        border: 'none',
                        color: '#ffffff',
                      }),
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ color: isCyberpunk ? 'text.secondary' : '#cbd5e1', mb: 1 }}>Ready to get uncomfortable?</Typography>
                  <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2, color: isCyberpunk ? 'text.primary' : '#ffffff' }}>
                    Stop practicing in your comfort zone
                  </Typography>
                  <Typography sx={{ color: isCyberpunk ? 'text.secondary' : '#94a3b8', mb: 3 }}>
                    Real interviews are stressful. That's why I make our sessions stressful too.
                    The more you sweat in training, the less you bleed in battle.
                  </Typography>
                  <Button
                    href="https://learnwithandi.com?utm_source=alvianzf.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<ArrowRight size={16} />}
                    sx={{
                      px: 3,
                      py: 1.5,
                      fontWeight: 700,
                      ...(isCyberpunk
                        ? { bgcolor: 'primary.main', color: 'primary.contrastText' }
                        : { bgcolor: '#ffffff', color: '#0f172a' }),
                      transition: 'all 0.3s',
                      '&:hover': { bgcolor: 'primary.main', color: isCyberpunk ? 'primary.contrastText' : '#ffffff' },
                    }}
                  >
                    Visit learnwithandi.com
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </motion.div>

        {/* Footer with Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
            <Box
              component="a"
              href="https://learnwithandi.com?utm_source=alvianzf.id"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-block',
                mb: 2,
                transition: 'opacity 0.3s',
                '&:hover': { opacity: 0.8 },
              }}
            >
              <Box component="img" src={learnWithAndiLogo} alt="Learn With Andi" sx={{ height: 40, mx: 'auto' }} />
            </Box>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              Mentoring aspiring engineers to land their dream jobs.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
