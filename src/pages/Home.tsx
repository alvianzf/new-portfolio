import { lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowRight, Download, Mail, Calendar, Linkedin, Github } from 'lucide-react';
import { Box, Button, Container, Link as MuiLink, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
// @ts-expect-error png import
import alvian from '../assets/potraits.png';
import { skills, categories } from "../data";
import IsoCard from "../components/iso/IsoCard";
import SectionReveal from "../components/iso/SectionReveal";
import SEO from '../components/SEO';

// 3D scene is heavy (three.js/r3f/drei) — lazy-loaded into its own chunk so
// pages that don't use it never pay for it.
const Scene3D = lazy(() => import('../components/three/Scene3D'));
const HeroScene = lazy(() => import('../components/three/HeroScene'));

// data.ts mixes FontAwesome icon definitions and lucide components
function SkillIcon({ icon }: { icon: (typeof skills)[number]['icon'] }) {
  if (icon && typeof icon === 'object' && 'prefix' in icon) {
    return <FontAwesomeIcon icon={icon} className="w-4 h-4" />;
  }
  if (icon) {
    const Icon = icon;
    return <Icon className="w-4 h-4" />;
  }
  return null;
}

const devSkillNames = ['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'];

const contactItems = [
  { title: 'Email', icon: Mail, href: 'mailto:hello@alvianzf.id', label: 'hello@alvianzf.id', external: false },
  { title: 'Schedule a Call', icon: Calendar, href: 'https://calendar.app.google/J3gjDH8fv98BjSHz7', label: 'Book a time', external: true },
  { title: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/alvianzf', label: 'linkedin.com/in/alvianzf', external: true },
  { title: 'GitHub', icon: Github, href: 'https://github.com/alvianzf', label: 'github.com/alvianzf', external: true },
];

export default function Home() {
  const reduceMotion = useReducedMotion();
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
  const nonTechCategories = categories.filter(cat => cat.name !== 'Technical Skills');

  return (
    <Box sx={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <SEO
        schema={personSchema}
        keywords={[
          "Alvian Zachry Faturrahman", "Software Engineer", "Recruiter", "Bootcamp Tech Instructor",
          "Program Manager", "Technical Lead", "Full Stack Engineer",
          "React Developer", "Engineering Manager", "Tech Mentorship Indonesia"
        ]}
      />

      {/* Hero — a real, draggable 3D isometric scene is the centerpiece, not
          a DOM card with a CSS tilt. Text sits above it, minimal and centered. */}
      <Container maxWidth="md" sx={{ px: 3, pt: { xs: '7rem', md: '8rem' }, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: '2.75rem', sm: '4rem', md: '5rem' }, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'text.primary' }}
          >
            Alvian Zachry.
          </Typography>
          <Typography
            sx={{ mt: 3, fontSize: { xs: '1.125rem', md: '1.375rem' }, color: 'text.secondary', lineHeight: 1.6, maxWidth: '36rem', mx: 'auto' }}
          >
            Software Engineer, Recruiter, &amp; Bootcamp Tech Instructor — bridging the gap between people and technology.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4, flexWrap: 'wrap', rowGap: 2 }}>
            <Button href="/experience" variant="contained" size="large" endIcon={<ArrowRight size={16} />} sx={{ px: 3.5, py: 1.5, borderRadius: 999 }}>
              See my work
            </Button>
            <Button
              href="/Alvian_Zachry_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              endIcon={<Download size={16} />}
              sx={{ px: 3.5, py: 1.5, borderRadius: 999, color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}
            >
              Download CV
            </Button>
          </Stack>
        </motion.div>
      </Container>

      <Box sx={{ mt: { xs: 2, md: -1 }, mb: { xs: 2, md: 0 } }}>
        <Suspense fallback={<Box sx={{ height: { xs: 320, md: 440 } }} />}>
          <Scene3D height={typeof window !== 'undefined' && window.innerWidth < 768 ? 320 : 440} reduceMotion={!!reduceMotion} zoom={64}>
            <HeroScene portraitSrc={alvian} />
          </Scene3D>
        </Suspense>
        <Typography sx={{ textAlign: 'center', mt: 1, fontSize: '0.75rem', color: 'text.secondary', opacity: 0.7 }}>
          Drag to rotate
        </Typography>
      </Box>

      {/* Expertise marquee — flat, borderless pills; the motion itself carries
          the "interactive" feel instead of boxy chrome. */}
      <Box sx={{ position: 'relative', py: { xs: 6, md: 10 }, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.035) }}>
        <Stack spacing={3}>
          <Box sx={{ maxWidth: '100vw', overflow: 'hidden' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex w-max gap-10 animate-marquee pause-on-hover">
              {[...devSkills, ...devSkills, ...devSkills].map((skill, index) => (
                <Stack key={`row1-${skill.name}-${index}`} direction="row" alignItems="center" spacing={1.25} sx={{ color: 'text.secondary', whiteSpace: 'nowrap', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>
                  <SkillIcon icon={skill.icon} />
                  <Typography component="span" sx={{ fontWeight: 600, fontSize: '1rem' }}>{skill.name}</Typography>
                </Stack>
              ))}
            </motion.div>
          </Box>
          <Box sx={{ maxWidth: '100vw', overflow: 'hidden' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex w-max gap-10 animate-marquee-reverse pause-on-hover">
              {[...infraSkills, ...infraSkills, ...infraSkills].map((skill, index) => (
                <Stack key={`row2-${skill.name}-${index}`} direction="row" alignItems="center" spacing={1.25} sx={{ color: 'text.secondary', whiteSpace: 'nowrap', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>
                  <SkillIcon icon={skill.icon} />
                  <Typography component="span" sx={{ fontWeight: 600, fontSize: '1rem' }}>{skill.name}</Typography>
                </Stack>
              ))}
            </motion.div>
          </Box>
        </Stack>
        <Box sx={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '8rem', background: (theme) => `linear-gradient(to right, ${theme.palette.background.default}, transparent)`, pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '8rem', background: (theme) => `linear-gradient(to left, ${theme.palette.background.default}, transparent)`, pointerEvents: 'none' }} />
      </Box>

      <Container maxWidth="md" sx={{ px: 3 }}>
        {/* Biography — a single, generously-spaced block of text, no card. */}
        <Box component="section" sx={{ pt: { xs: 10, md: 18 }, pb: { xs: 8, md: 12 } }}>
          <SectionReveal>
            <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, color: 'text.primary', mb: 4 }}>
              About Me
            </Typography>
            <Typography sx={{ fontSize: '1.25rem', color: 'text.secondary', lineHeight: 1.9 }}>
              Hi, I'm Ary! I'm a tech geek at heart who loves bringing people together. I spend my days building full-stack systems and—my favorite part—mentoring the next generation of engineers. I'm really passionate about bridging the gap between talent in Southeast Asia and opportunities in Europe. When I'm not deep in code, I'm usually coaching teams, helping someone pivot their career, or just geeking out on how to make Agile actually work.
            </Typography>
          </SectionReveal>
        </Box>
      </Container>

      {/* Soft skills & languages — one flagship isometric tile per category as
          a visual anchor, the individual skills listed plainly beneath it. */}
      <Container maxWidth="lg" sx={{ px: 3, pb: { xs: 10, md: 18 } }}>
        <Stack spacing={{ xs: 10, md: 16 }}>
          {nonTechCategories.map((category) => {
            const categorySkills = skills.filter(skill => skill.category === category.name.toLowerCase().split(' ')[0]);
            return (
              <SectionReveal key={category.name} iso>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '18rem 1fr' }, gap: { xs: 4, md: 8 }, alignItems: 'start' }}>
                  <IsoCard tiltOnHover={false}>
                    <Stack spacing={1.5} alignItems="flex-start">
                      <Box component={category.icon} sx={{ width: 32, height: 32, color: 'primary.main' }} />
                      <Typography variant="h5" component="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        {category.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'}
                      </Typography>
                    </Stack>
                  </IsoCard>

                  <Stack divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />} spacing={0}>
                    {categorySkills.map((skill) => (
                      <Stack key={skill.name} direction="row" spacing={2.5} sx={{ py: 2.5 }}>
                        <Box sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }}>
                          <SkillIcon icon={skill.icon} />
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>{skill.name}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>{skill.description}</Typography>
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </SectionReveal>
            );
          })}
        </Stack>
      </Container>

      {/* Contact — one panel, not four boxy cards. */}
      <Container maxWidth="md" sx={{ px: 3, pb: { xs: 12, md: 20 } }} id="contact">
        <SectionReveal iso>
          <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, color: 'text.primary', mb: 2 }}>
            Get in Touch
          </Typography>
          <Typography sx={{ fontSize: '1.125rem', color: 'text.secondary', mb: 6, maxWidth: '34rem' }}>
            Whether you're looking to collaborate on a project, need consulting, or just want to chat about tech and talent—I'd love to hear from you!
          </Typography>

          <IsoCard tiltOnHover={false}>
            <Stack divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />} spacing={0}>
              {contactItems.map((item) => (
                <MuiLink
                  key={item.title}
                  href={item.href}
                  underline="none"
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    py: 2.5,
                    color: 'text.primary',
                    '&:hover': { color: 'primary.main', '& .contact-arrow': { transform: 'translateX(4px)', opacity: 1 } },
                    transition: 'color 0.2s',
                  }}
                >
                  <item.icon className="w-5 h-5" style={{ flexShrink: 0 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 600, color: 'inherit' }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.label}</Typography>
                  </Box>
                  <Box className="contact-arrow" sx={{ opacity: 0.4, transition: 'all 0.2s', display: 'flex' }}>
                    <ArrowRight size={18} />
                  </Box>
                </MuiLink>
              ))}
            </Stack>
          </IsoCard>
        </SectionReveal>
      </Container>
    </Box>
  );
}
