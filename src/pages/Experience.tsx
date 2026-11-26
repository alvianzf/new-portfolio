import { lazy, Suspense, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { experiences, projects, npmPackages } from '../data';
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Link,
} from '@mui/material';
import IsoPanel from '../components/iso/IsoPanel';
import SectionReveal from '../components/iso/SectionReveal';
import { Briefcase, Code, Terminal, Copy, Check } from 'lucide-react';
import SEO from '../components/SEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReact, faNode, faPython, faJs, faPhp, faLaravel, faAws, faVuejs, faDocker, faWordpress, faGoogle
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faServer, faFire, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const Scene3D = lazy(() => import('../components/three/Scene3D'));
const TimelineTower = lazy(() => import('../components/three/TimelineTower'));

// Helper to map string tech to icons
const getTechIcon = (tech: string): IconDefinition | null => {
  const map: Record<string, IconDefinition> = {
    'React.js': faReact,
    'Next.js': faReact, // closest
    'Vue.js': faVuejs,
    'Node.js': faNode,
    'Express.js': faNode, // closest
    'JavaScript': faJs,
    'TypeScript': faJs, // closest
    'PHP': faPhp,
    'Laravel': faLaravel,
    'CodeIgniter': faFire,
    'Python': faPython,
    'AWS': faAws,
    'GCP': faGoogle,
    'Docker': faDocker,
    'WordPress': faWordpress,
    'PostgreSQL': faDatabase,
    'MongoDB': faDatabase,
    'Firestore': faFire,
    'Redis': faServer,
    'Nginx': faServer,
    'Algolia': faHashtag,
  };

  return map[tech] || null;
};

const tabs = [
  { id: 'roles', label: 'Roles' },
  { id: 'projects', label: 'Projects' },
  { id: 'npm', label: 'NPM Packages' },
] as const;

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'roles' | 'projects' | 'npm'>('roles');
  const [copiedPkg, setCopiedPkg] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const handleCopy = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedPkg(command);
    setTimeout(() => setCopiedPkg(null), 2000);
  };

  const experienceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Alvian Zachry Faturrahman",
      "url": "https://alvianzf.id",
      "hasCredential": experiences.map(exp => ({
        "@type": "EducationalOccupationalCredential",
        "name": exp.title,
        "recognizedBy": { "@type": "Organization", "name": exp.company }
      })),
      "hasOccupation": experiences.map(exp => ({
        "@type": "Role",
        "roleName": exp.title,
        "worksFor": { "@type": "Organization", "name": exp.company },
        "startDate": exp.period.split("–")[0].trim(),
        "description": Array.isArray(exp.description) ? exp.description[0] : exp.description
      }))
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', pb: { xs: 10, md: 16 } }}>
      <SEO
        title="Professional Experience"
        description="13+ years of full-stack engineering, program management, technical leadership, and developer hiring. Roles at Devshore Partners, TiketQ, Hacktiv8, and more."
        keywords={["Experience", "Resume", "CV", "Software Engineer", "Program Manager", "Tech Lead", "Alvian Zachry Faturrahman", "Indonesia", "Batam"]}
        schema={experienceSchema}
      />

      <Container maxWidth="md" sx={{ pt: { xs: '7rem', md: '9rem' }, pb: { xs: 8, md: 12 } }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 2 }}>
            Career Timeline
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 700, color: 'text.primary', lineHeight: 1.1, mb: 4 }}>
            13+ Years of <Box component="span" sx={{ color: 'primary.main' }}>"It Works Locally."</Box>
          </Typography>
          <Box sx={{ borderLeft: '3px solid', borderColor: 'primary.main', pl: 3 }}>
            <Typography sx={{ fontSize: '1.125rem', color: 'text.secondary', lineHeight: 1.75, fontStyle: 'italic' }}>
              "Recovering engineer turned manager who wears too many hats. I've gone from writing PHP (sorry) to judging other people's algorithms. I build systems, manage chaos, and occasionally claim credit for my team's hard work."
            </Typography>
          </Box>
        </motion.div>
      </Container>

      <Box sx={{ my: { xs: 2, md: 4 } }}>
        <Suspense fallback={<Box sx={{ height: { xs: 260, md: 340 } }} />}>
          <Scene3D height={typeof window !== 'undefined' && window.innerWidth < 768 ? 260 : 340} reduceMotion={!!reduceMotion} zoom={70}>
            <TimelineTower />
          </Scene3D>
        </Suspense>
      </Box>

      {/* Tabs — plain underlined text, not a boxed segmented control */}
      <Box sx={{ position: 'sticky', top: '4.5rem', zIndex: 20, bgcolor: 'background.default', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="md">
          <Stack direction="row" spacing={{ xs: 3, md: 5 }}>
            {tabs.map((tab) => (
              <Box
                key={tab.id}
                component="button"
                onClick={() => setActiveTab(tab.id)}
                sx={{
                  bgcolor: 'transparent',
                  border: 0,
                  cursor: 'pointer',
                  py: 2.5,
                  fontSize: { xs: '0.9375rem', md: '1rem' },
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  color: activeTab === tab.id ? 'text.primary' : 'text.secondary',
                  position: 'relative',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="experience-tab-underline"
                    style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, background: 'var(--accent-primary)' }}
                  />
                )}
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pt: { xs: 8, md: 12 } }}>
        <AnimatePresence mode="wait">
          {/* ROLES — a plain vertical timeline, not a stack of identical cards */}
          {activeTab === 'roles' && (
            <motion.div
              key="roles"
              initial={{ opacity: 0, rotateX: 8, y: 20 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: -8, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
            >
              <Stack spacing={0}>
                {experiences.map((exp, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: { xs: 3, md: 5 }, pb: index < experiences.length - 1 ? 7 : 0 }}>
                    <Box sx={{ flexShrink: 0, width: { xs: 70, md: 120 }, textAlign: 'right', pt: 0.5 }}>
                      <Typography sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}>
                        {exp.period}
                      </Typography>
                    </Box>
                    <Box sx={{ position: 'relative', flexShrink: 0, width: 2, bgcolor: 'divider' }}>
                      <Box sx={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    </Box>
                    <Box sx={{ flex: 1, pb: 1 }}>
                      <Typography variant="h3" sx={{ fontSize: '1.375rem', fontWeight: 700, color: 'text.primary' }}>
                        {exp.title}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', fontWeight: 500, mb: 2 }}>{exp.company}</Typography>

                      <Box sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '0.9375rem', mb: 2 }}>
                        {Array.isArray(exp.description) ? (
                          <Stack component="ul" spacing={1} sx={{ listStyle: 'disc', pl: 2.5, m: 0 }}>
                            {exp.description.map((item, i) => <li key={i}>{item}</li>)}
                          </Stack>
                        ) : (
                          <Typography sx={{ fontSize: '0.9375rem' }}>{exp.description}</Typography>
                        )}
                      </Box>

                      {exp.techStack && (
                        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
                          {exp.techStack.map((tech) => (
                            <Stack key={tech} direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
                              {getTechIcon(tech) && <FontAwesomeIcon icon={getTechIcon(tech)!} style={{ width: 11, height: 11, opacity: 0.6 }} />}
                              <span>{tech}</span>
                            </Stack>
                          ))}
                        </Stack>
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </motion.div>
          )}

          {/* PROJECTS — isometric tiles, two per row, big gaps */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, rotateX: 8, y: 20 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: -8, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
            >
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: { xs: 4, md: 5 } }}>
                {projects.map((proj, index) => {
                  const IconComponent = proj.icon || Code;
                  return (
                    <IsoPanel key={index} className="h-full">
                      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ color: 'primary.main' }}>
                          {IconComponent && typeof IconComponent === 'object' && 'prefix' in IconComponent ? (
                            <FontAwesomeIcon icon={IconComponent as IconDefinition} style={{ width: 22, height: 22 }} />
                          ) : IconComponent ? (
                            <IconComponent size={22} />
                          ) : null}
                        </Box>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary' }}>{proj.period}</Typography>
                      </Stack>
                      <Typography variant="h3" sx={{ fontSize: '1.125rem', fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                        {proj.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.875rem', color: 'primary.main', fontWeight: 500, mb: 1.5 }}>{proj.company}</Typography>
                      <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.75, mb: 2 }}>
                        {Array.isArray(proj.description) ? proj.description[0] : proj.description}
                      </Typography>
                      {proj.link && (
                        <Link href={proj.link} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'primary.main' }}>
                          View Project →
                        </Link>
                      )}
                    </IsoPanel>
                  );
                })}
              </Box>
            </motion.div>
          )}

          {/* NPM PACKAGES */}
          {activeTab === 'npm' && (
            <motion.div
              key="npm"
              initial={{ opacity: 0, rotateX: 8, y: 20 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: -8, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
            >
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: { xs: 4, md: 5 } }}>
                {npmPackages.map((pkg, index) => (
                  <IsoPanel key={index} className="h-full">
                    <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                      <Terminal size={28} color="currentColor" style={{ opacity: 0.6 }} />
                      <Link href={pkg.url} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'primary.main' }}>
                        View on NPM →
                      </Link>
                    </Stack>
                    <Typography variant="h3" sx={{ fontSize: '1.0625rem', fontWeight: 700, color: 'text.primary', mb: 1, fontFamily: 'monospace' }}>
                      {pkg.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem', mb: 2.5, minHeight: 40 }}>{pkg.description}</Typography>
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        component="code"
                        sx={{ display: 'block', bgcolor: 'background.default', borderRadius: 2, p: 1.5, pr: 6, fontFamily: 'monospace', fontSize: '0.75rem', color: 'text.secondary', overflowX: 'auto', whiteSpace: 'nowrap' }}
                      >
                        {pkg.command}
                      </Box>
                      <Tooltip title="Copy to install">
                        <IconButton
                          onClick={() => handleCopy(pkg.command)}
                          size="small"
                          sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: 'text.secondary' }}
                        >
                          {copiedPkg === pkg.command ? <Check size={16} color="#22c55e" /> : <Copy size={16} />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </IsoPanel>
                ))}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        <SectionReveal>
          <Box sx={{ mt: { xs: 12, md: 18 }, textAlign: 'center', maxWidth: '36rem', mx: 'auto' }}>
            <IsoPanel elevated>
              <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'text.primary', mb: 2 }}>
                Want to land a role like these?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 3 }}>
                I mentor aspiring engineers to help them crack technical interviews and level up their careers.
              </Typography>
              <Button href="/mentorship" variant="contained" size="large" sx={{ px: 3, py: 1.5, borderRadius: 999, fontWeight: 700 }}>
                Explore Mentorship
              </Button>
            </IsoPanel>

            <Link
              href="/Alvian_Zachry_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mt: 5, fontWeight: 600, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <Briefcase size={16} />
              Download Curated Resume
            </Link>
          </Box>
        </SectionReveal>
      </Container>
    </Box>
  );
}
