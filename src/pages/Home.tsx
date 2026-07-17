import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowRight, Download, Mail, Calendar, Linkedin, Github } from 'lucide-react';
import { Box, Button, Container, Grid, Link as MuiLink, Stack, Typography } from '@mui/material';
// @ts-expect-error png import
import alvian from '../assets/potraits.png';
import { skills, categories } from "../data";
import ModernCard from "../components/ModernCard";
import SEO from '../components/SEO';
// import PromoPopup from '../components/PromoPopup';

// data.ts mixes FontAwesome icon definitions and lucide components
function SkillIcon({ icon }: { icon: (typeof skills)[number]['icon'] }) {
  if (icon && typeof icon === 'object' && 'prefix' in icon) {
    return <FontAwesomeIcon icon={icon} className="w-5 h-5" />;
  }
  if (icon) {
    const Icon = icon;
    return <Icon className="w-5 h-5" />;
  }
  return null;
}

const devSkillNames = ['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'];

const marqueePillSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  px: 3,
  py: 1.5,
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 1,
  boxShadow: 1,
  whiteSpace: 'nowrap',
  color: 'text.secondary',
  transition: 'all 0.3s',
  '&:hover': {
    borderColor: 'primary.main',
    boxShadow: 2,
    color: 'primary.main',
  },
} as const;

const contactItems = [
  { title: 'Email', icon: Mail, href: 'mailto:hello@alvianzf.id', label: 'hello@alvianzf.id', external: false },
  { title: 'Schedule a Call', icon: Calendar, href: 'https://calendar.app.google/J3gjDH8fv98BjSHz7', label: 'Book a time', external: true },
  { title: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/alvianzf', label: 'linkedin.com/in/alvianzf', external: true },
  { title: 'GitHub', icon: Github, href: 'https://github.com/alvianzf', label: 'github.com/alvianzf', external: true },
];

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alvian Zachry Faturrahman",
    "alternateName": ["Alvian", "Ary", "alvianzf"],
    "url": "https://alvianzf.id",
    "image": "https://alvianzf.id/potraits.png",
    "sameAs": [
      "https://github.com/alvianzf",
      "https://linkedin.com/in/alvianzf",
      "https://twitter.com/alvianzf"
    ],
    "jobTitle": "Full Stack Engineer",
    "description": "Full Stack Engineer, Program Manager, Technical Lead, and Bootcamp Instructor with 13+ years of experience in software engineering, education, and technical hiring. Based in Batam, Indonesia.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Batam",
      "addressRegion": "Riau Islands",
      "addressCountry": "ID"
    },
    "worksFor": [
      {
        "@type": "Organization",
        "name": "Devshore Partners, s.r.o.",
        "url": "https://devshore.io"
      },
      {
        "@type": "Organization",
        "name": "TiketQ"
      }
    ],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Full Stack Engineer",
        "skills": "React, TypeScript, Node.js, Express.js, PostgreSQL, Redis, AWS, Docker"
      },
      {
        "@type": "Occupation",
        "name": "Technical Lead & Program Manager",
        "skills": "Engineering Leadership, Agile, Roadmap Planning, Team Management"
      },
      {
        "@type": "Occupation",
        "name": "Talent Acquisition Specialist",
        "skills": "Technical Hiring, Assessment Design, Recruitment"
      }
    ],
    "knowsAbout": [
      "Full Stack Development", "React", "TypeScript", "Node.js", "Python",
      "PHP", "Laravel", "PostgreSQL", "Redis", "AWS", "Docker",
      "Engineering Leadership", "Technical Hiring", "Bootcamp Instruction",
      "Software Architecture", "Agile", "Mentorship"
    ],
    "knowsLanguage": ["Indonesian", "English"]
  };

  const devSkills = skills.filter(s => devSkillNames.includes(s.name));
  const infraSkills = skills.filter(s => !devSkillNames.includes(s.name) && s.category === 'technical');

  return (
    <Box sx={{ minHeight: '100vh', pt: '5rem', overflowX: 'hidden' }}>
      <SEO
        schema={personSchema}
        keywords={[
          "Alvian Zachry Faturrahman", "Software Engineer", "Recruiter", "Bootcamp Tech Instructor",
          "Program Manager", "Technical Lead", "Full Stack Engineer",
          "React Developer", "Engineering Manager", "Tech Mentorship Indonesia"
        ]}
      />
      <Container maxWidth={false} sx={{ px: 3, py: { xs: 5, md: 10 } }}>
        {/* Hero Section */}
        <Box component="section" sx={{ mb: 8 }}>
          <Grid container spacing={8} alignItems="center" sx={{ maxWidth: '80rem', mx: 'auto' }}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '3rem', md: '6rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.05em',
                    color: 'text.primary',
                    mb: 4,
                    lineHeight: 1.25,
                  }}
                >
                  Alvian
                  <br />
                  <Box component="span" sx={{ color: 'text.secondary' }}>Zachry.</Box>
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    color: 'text.secondary',
                    maxWidth: '32rem',
                    lineHeight: 1.625,
                    mb: 5,
                  }}
                >
                  Software Engineer, Recruiter, & Bootcamp Tech Instructor <br />
                  <Box component="span" sx={{ fontSize: '1.25rem' }}>bridging the gap between people and technology.</Box>
                </Typography>

                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
                  <Button
                    href="/experience"
                    variant="contained"
                    endIcon={<ArrowRight size={16} />}
                    sx={{ px: 3, py: 1.5 }}
                  >
                    See my work
                  </Button>
                  <Button
                    href="/Alvian_Zachry_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<Download size={16} />}
                    sx={{
                      px: 3,
                      py: 1.5,
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                    }}
                  >
                    Download CV
                  </Button>
                </Stack>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ position: 'relative' }}
              >
                {/* Updated accent color blob */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'primary.main',
                    borderRadius: '50%',
                    filter: 'blur(64px)',
                    opacity: 0.1,
                    transform: 'translate(2.5rem, 2.5rem)',
                  }}
                />
                <Box
                  component="img"
                  src={alvian}
                  alt="Alvian Zachry"
                  className="grayscale hover:grayscale-0"
                  sx={{
                    position: 'relative',
                    borderRadius: '1rem',
                    width: '100%',
                    maxWidth: '28rem',
                    mx: 'auto',
                    display: 'block',
                    boxShadow: 24,
                    transition: 'all 0.7s',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Technical Expertise (Infinite Marquee) */}
        <Box component="section" sx={{ mb: { xs: 6, md: 12 }, position: 'relative' }}>
          <Stack spacing={1}>
            {/* Row 1: Development & Frameworks (Right to Left) */}
            <Box className="mask-linear-gradient" sx={{ maxWidth: '100vw', overflow: 'hidden' }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex w-max gap-4 animate-marquee pause-on-hover py-1"
              >
                {[...devSkills, ...devSkills, ...devSkills].map((skill, index) => (
                  <Box key={`row1-${skill.name}-${index}`} sx={marqueePillSx}>
                    <SkillIcon icon={skill.icon} />
                    <Typography component="span" variant="body2" sx={{ fontWeight: 500, color: 'inherit' }}>{skill.name}</Typography>
                  </Box>
                ))}
              </motion.div>
            </Box>

            {/* Row 2: Infrastructure & Tools (Left to Right) */}
            <Box className="mask-linear-gradient" sx={{ maxWidth: '100vw', overflow: 'hidden' }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex w-max gap-4 animate-marquee-reverse pause-on-hover py-1"
              >
                {[...infraSkills, ...infraSkills, ...infraSkills].map((skill, index) => (
                  <Box key={`row2-${skill.name}-${index}`} sx={marqueePillSx}>
                    <SkillIcon icon={skill.icon} />
                    <Typography component="span" variant="body2" sx={{ fontWeight: 500, color: 'inherit' }}>{skill.name}</Typography>
                  </Box>
                ))}
              </motion.div>
            </Box>
          </Stack>

          {/* Gradient Masks for fading effect - updated to match theme bg */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '5rem',
              background: (theme) => `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              width: '5rem',
              background: (theme) => `linear-gradient(to left, ${theme.palette.background.default}, transparent)`,
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />
        </Box>

        {/* Biography (About Me) */}
        <Box component="section" sx={{ maxWidth: '56rem', mx: 'auto', mb: { xs: 6, md: 12 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h4" component="h2" sx={{ fontSize: '1.875rem', fontWeight: 700, color: 'text.primary', mb: 4 }}>
              About Me
            </Typography>
            <Typography sx={{ fontSize: '1.125rem', color: 'text.secondary', lineHeight: 2 }}>
              Hi, I'm Ary! I’m a tech geek at heart who loves bringing people together. I spend my days building full-stack systems and—my favorite part—mentoring the next generation of engineers. I’m really passionate about bridging the gap between talent in Southeast Asia and opportunities in Europe. When I’m not deep in code, I’m usually coaching teams, helping someone pivot their career, or just geeking out on how to make Agile actually work.
            </Typography>
          </motion.div>
        </Box>

        {/* Soft Skills & Languages (Horizontal Layout) */}
        <Box component="section" sx={{ maxWidth: '80rem', mx: 'auto', mb: { xs: 8, md: 16 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Stack spacing={6}>
              {categories.filter(cat => cat.name !== 'Technical Skills').map((category) => (
                <Stack key={category.name} spacing={3}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'text.primary',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      pb: 2,
                    }}
                  >
                    <Box component={category.icon} sx={{ width: 24, height: 24, color: 'primary.main' }} />
                    {category.name}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {skills
                      .filter(skill => skill.category === category.name.toLowerCase().split(' ')[0])
                      .map((skill) => (
                        <Box key={skill.name} sx={{ flex: 1, minWidth: { xs: '240px', sm: '280px' }, maxWidth: '350px' }}>
                          <ModernCard className="h-full flex items-center gap-4 p-5">
                            <Box
                              sx={{
                                p: 1.5,
                                bgcolor: 'background.default',
                                borderRadius: '0.75rem',
                                color: 'text.secondary',
                                transition: 'color 0.3s',
                                '.card-modern:hover &': { color: 'primary.main' },
                              }}
                            >
                              <SkillIcon icon={skill.icon} />
                            </Box>
                            <Box>
                              <Typography component="h4" sx={{ fontWeight: 600, color: 'text.primary' }}>{skill.name}</Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, lineHeight: 1.375 }}>{skill.description}</Typography>
                            </Box>
                          </ModernCard>
                        </Box>
                      ))}
                  </Box>
                </Stack>
              ))}
            </Stack>
          </motion.div>
        </Box>

        {/* Contact Section */}
        <Box component="section" id="contact" sx={{ maxWidth: '56rem', mx: 'auto', mb: { xs: 6, md: 12 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h4" component="h2" sx={{ fontSize: '1.875rem', fontWeight: 700, color: 'text.primary', mb: 4 }}>
              Get in Touch
            </Typography>
            <Typography sx={{ fontSize: '1.125rem', color: 'text.secondary', lineHeight: 1.625, mb: 5 }}>
              Whether you're looking to collaborate on a project, need consulting, or just want to chat about tech and talent—I'd love to hear from you!
            </Typography>

            <Grid container spacing={3}>
              {contactItems.map((item) => (
                <Grid key={item.title} size={{ xs: 12, md: 6 }}>
                  <ModernCard className="h-full">
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Box
                        sx={{
                          p: 1.5,
                          bgcolor: 'background.default',
                          borderRadius: '0.75rem',
                          color: 'text.secondary',
                          transition: 'color 0.3s',
                          '.card-modern:hover &': { color: 'primary.main' },
                        }}
                      >
                        <item.icon className="w-6 h-6" />
                      </Box>
                      <Box>
                        <Typography component="h3" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>{item.title}</Typography>
                        <MuiLink
                          href={item.href}
                          underline="none"
                          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          sx={{ color: 'text.secondary', transition: 'color 0.3s', '&:hover': { color: 'primary.main' } }}
                        >
                          {item.label}
                        </MuiLink>
                      </Box>
                    </Stack>
                  </ModernCard>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
        {/* <PromoPopup /> */}
      </Container>
    </Box>
  );
}
