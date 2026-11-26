import { motion } from 'framer-motion';
import { ExternalLink, Flame, Target, MessageCircle, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import learnWithAndiLogo from '../assets/learnwithandi.png';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import IsoCard from '../components/iso/IsoCard';
import IsoPanel from '../components/iso/IsoPanel';
import IsoGrid from '../components/iso/IsoGrid';
import SectionReveal from '../components/iso/SectionReveal';

export default function Mentorship() {
  const { theme } = useTheme();
  const isCyberpunk = theme === 'cyberpunk';
  const features = [
    {
      icon: <Flame size={22} />,
      title: "Get Roasted",
      description: "I'll dig into your fundamentals until you discover your own gaps."
    },
    {
      icon: <Target size={22} />,
      title: "Real Interview Simulation",
      description: "Practice with someone who's been on both sides of the interview table."
    },
    {
      icon: <MessageCircle size={22} />,
      title: "Brutally Honest Feedback",
      description: "No nitpicking on hard skills—just pure interview performance."
    },
    {
      icon: <Zap size={22} />,
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
    <Box sx={{ minHeight: '100vh', pb: { xs: 10, md: 16 } }}>
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

      {/* Hero — left-aligned, generous whitespace, no boxed eyebrow badge */}
      <Container maxWidth="md" sx={{ pt: { xs: '7rem', md: '9rem' }, pb: { xs: 8, md: 12 } }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'primary.main', mb: 2 }}>
            <Flame size={16} />
            <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Now Accepting Students
            </Typography>
          </Stack>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 700, color: 'text.primary', lineHeight: 1.1, mb: 4 }}>
            I'll <Box component="span" sx={{ color: 'primary.main' }}>Roast</Box> Your Tech Interview Skills.
          </Typography>
          <Typography sx={{ fontSize: '1.25rem', color: 'text.secondary', mb: 5, maxWidth: '36rem', lineHeight: 1.6 }}>
            No fluff. No hand-holding. Just brutal, honest feedback that'll actually prepare you
            for the real thing. Think you're ready? Let's find out.
          </Typography>
          <Button
            href="https://learnwithandi.com?utm_source=alvianzf.id"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="large"
            endIcon={<ExternalLink size={18} />}
            sx={{ px: 4, py: 1.75, borderRadius: 999, fontWeight: 700, fontSize: '1.0625rem' }}
          >
            Book a Session
          </Button>
        </motion.div>
      </Container>

      {/* Features — a bold, airy 2x2 grid of isometric tiles */}
      <Container maxWidth="md" sx={{ pb: { xs: 10, md: 16 } }}>
        <IsoGrid columns={2} stagger>
          {features.map((feature) => (
            <IsoCard key={feature.title} className="h-full">
              <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
              <Typography variant="h6" component="h3" sx={{ fontSize: '1.125rem', fontWeight: 700, color: 'text.primary', mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.9375rem' }}>{feature.description}</Typography>
            </IsoCard>
          ))}
        </IsoGrid>
      </Container>

      {/* What you'll get — plain text list beside one dark flagship panel */}
      <Container maxWidth="lg" sx={{ pb: { xs: 10, md: 16 } }}>
        <SectionReveal iso>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 6, lg: 10 }, alignItems: 'center' }}>
            <Box>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 700, color: 'text.primary', mb: 4 }}>
                What You'll Get <Box component="span" sx={{ color: 'primary.main' }}>Grilled</Box> On
              </Typography>
              <Stack spacing={2.5}>
                {benefits.map((benefit) => (
                  <Stack key={benefit} direction="row" alignItems="center" spacing={1.5}>
                    <CheckCircle2 size={20} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                    <Typography sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '1.0625rem' }}>{benefit}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            <IsoPanel
              elevated
              sx={{
                ...(isCyberpunk
                  ? { bgcolor: 'background.paper', border: '1px solid', borderColor: 'primary.main', color: 'text.primary' }
                  : { background: 'linear-gradient(to bottom right, #0f172a, #1e293b)', border: 'none', color: '#ffffff' }),
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
            </IsoPanel>
          </Box>
        </SectionReveal>
      </Container>

      {/* Footer with Logo */}
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', pt: 5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Box
            component="a"
            href="https://learnwithandi.com?utm_source=alvianzf.id"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'inline-block', mb: 2, transition: 'opacity 0.3s', '&:hover': { opacity: 0.8 } }}
          >
            <Box component="img" src={learnWithAndiLogo} alt="Learn With Andi" sx={{ height: 40, mx: 'auto' }} />
          </Box>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
            Mentoring aspiring engineers to land their dream jobs.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
