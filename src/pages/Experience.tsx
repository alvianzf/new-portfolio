import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences, projects, npmPackages } from '../data';
import {
  Box,
  Container,
  Stack,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Tooltip,
  IconButton,
  Link,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Calendar, Building, Briefcase, Wrench, Code, Terminal, Copy, Check, History } from 'lucide-react';
import SEO from '../components/SEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReact, faNode, faPython, faJs, faPhp, faLaravel, faAws, faVuejs, faDocker, faWordpress, faGoogle
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faServer } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

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

// Import solid icons for fallback/manual mapping
import { faFire, faHashtag } from '@fortawesome/free-solid-svg-icons';

import WormBackground from '../components/WormBackground';

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'roles' | 'projects' | 'npm'>('roles');
  const [copiedPkg, setCopiedPkg] = useState<string | null>(null);

  const handleCopy = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedPkg(command);
    setTimeout(() => setCopiedPkg(null), 2000);
  };

  const tabs = [
    { id: 'roles', label: 'Roles', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'npm', label: 'NPM Packages', icon: Terminal },
  ] as const;

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
        "startDate": exp.period.split("\u2013")[0].trim(),
        "description": Array.isArray(exp.description) ? exp.description[0] : exp.description
      }))
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 10, md: 16 }, pb: { xs: 10, md: 16 }, position: 'relative', overflow: 'hidden' }}>
      <WormBackground />
      <SEO
        title="Professional Experience"
        description="13+ years of full-stack engineering, program management, technical leadership, and developer hiring. Roles at Devshore Partners, TiketQ, Hacktiv8, and more."
        keywords={["Experience", "Resume", "CV", "Software Engineer", "Program Manager", "Tech Lead", "Alvian Zachry Faturrahman", "Indonesia", "Batam"]}
        schema={experienceSchema}
      />

      {/* Background Decor */}
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 500,
            height: 500,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
            borderRadius: '50%',
            filter: 'blur(100px)',
            opacity: 0.7,
            transform: 'translate(50%, -50%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 500,
            height: 500,
            bgcolor: (theme) => alpha(theme.palette.text.secondary, 0.05),
            borderRadius: '50%',
            filter: 'blur(100px)',
            opacity: 0.7,
            transform: 'translate(-50%, 50%)',
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                py: 1,
                px: 2,
                borderRadius: 9999,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
                fontWeight: 700,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                mb: 2,
                border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <History size={12} />
              Career Timeline
            </Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.25rem', md: '3.75rem' },
                fontWeight: 700,
                color: 'text.primary',
                mb: 3,
              }}
            >
              13+ Years of <Box component="span" sx={{ color: 'primary.main' }}>"It Works Locally".</Box>
            </Typography>
            <Typography
              sx={{
                fontSize: '1.125rem',
                color: 'text.secondary',
                maxWidth: '42rem',
                mx: 'auto',
                lineHeight: 1.75,
                fontStyle: 'italic',
              }}
            >
              "Recovering engineer turned manager who wears too many hats. I've gone from writing PHP (sorry) to judging other people's algorithms. I build systems, manage chaos, and occasionally claim credit for my team's hard work."
            </Typography>
          </Box>
        </motion.div>

        {/* Tabs */}
        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
          <Stack
            direction="row"
            spacing={{ xs: 0.5, sm: 2 }}
            sx={{
              justifyContent: 'center',
              bgcolor: 'background.paper',
              p: { xs: 0.5, sm: 1 },
              borderRadius: 4,
              border: 1,
              borderColor: 'divider',
              boxShadow: 1,
              maxWidth: '100%',
              overflow: 'hidden',
            }}
          >
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                startIcon={<tab.icon size={16} />}
                sx={{
                  px: { xs: 1.25, sm: 3 },
                  py: { xs: 1, sm: 1.5 },
                  minWidth: 0,
                  whiteSpace: 'nowrap',
                  fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                  borderRadius: 3,
                  fontWeight: 500,
                  ...(activeTab === tab.id
                    ? { bgcolor: 'primary.main', color: 'primary.contrastText', boxShadow: 4, '&:hover': { bgcolor: 'primary.main' } }
                    : { color: 'text.secondary', '&:hover': { color: 'text.primary', bgcolor: 'background.default' } }),
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Content Area */}
        <Box sx={{ maxWidth: '64rem', mx: 'auto', minHeight: 600 }}>
          <AnimatePresence mode="wait">

            {/* ROLES TAB */}
            {activeTab === 'roles' && (
              <motion.div
                key="roles"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Stack spacing={3}>
                  {experiences.map((exp, index) => {
                    const IconComponent = exp.icon || Briefcase;
                    return (
                      <Card
                        key={index}
                        sx={{
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
                            '& .role-icon, & .role-title': { color: 'primary.main' },
                            '& .role-icon': { transform: 'scale(1.05)' },
                          },
                        }}
                      >
                        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                            <Box sx={{ flexShrink: 0 }}>
                              <Box
                                className="role-icon"
                                sx={{
                                  width: 56,
                                  height: 56,
                                  borderRadius: 3,
                                  bgcolor: 'background.default',
                                  border: 1,
                                  borderColor: 'divider',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'text.secondary',
                                  transition: 'all 0.3s',
                                }}
                              >
                                {IconComponent && typeof IconComponent === 'object' && 'prefix' in IconComponent ? (
                                  <FontAwesomeIcon icon={IconComponent as IconDefinition} style={{ width: 24, height: 24 }} />
                                ) : IconComponent ? (
                                  <IconComponent size={24} />
                                ) : null}
                              </Box>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Stack
                                direction={{ xs: 'column', md: 'row' }}
                                sx={{ alignItems: { md: 'center' }, justifyContent: 'space-between', gap: 1, mb: 1 }}
                              >
                                <Typography
                                  variant="h3"
                                  className="role-title"
                                  sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'text.primary', transition: 'color 0.3s' }}
                                >
                                  {exp.title}
                                </Typography>
                                <Chip
                                  icon={<Calendar size={12} />}
                                  label={exp.period}
                                  size="small"
                                  sx={{
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    width: 'fit-content',
                                    '& .MuiChip-icon': { color: 'inherit' },
                                  }}
                                />
                              </Stack>
                              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', color: 'text.secondary', fontWeight: 500, mb: 2 }}>
                                <Building size={16} />
                                <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>{exp.company}</Typography>
                              </Stack>

                              <Box sx={{ color: 'text.secondary', lineHeight: 1.75, fontSize: '0.875rem', mb: 2 }}>
                                {Array.isArray(exp.description) ? (
                                  <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                                    {exp.description.map((item, i) => (
                                      <Stack component="li" key={i} direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                                        <Box
                                          sx={{
                                            mt: '0.5rem',
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            bgcolor: 'primary.main',
                                            flexShrink: 0,
                                            opacity: 0.5,
                                          }}
                                        />
                                        <span>{item}</span>
                                      </Stack>
                                    ))}
                                  </Stack>
                                ) : (
                                  <Typography sx={{ fontSize: '0.875rem' }}>{exp.description}</Typography>
                                )}
                              </Box>

                              {exp.techStack && (
                                <>
                                  <Divider sx={{ mt: 2 }} />
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pt: 2 }}>
                                    {exp.techStack.map((tech) => (
                                      <Chip
                                        key={tech}
                                        size="small"
                                        icon={
                                          getTechIcon(tech) ? (
                                            <FontAwesomeIcon icon={getTechIcon(tech)!} style={{ width: 12, height: 12, opacity: 0.7 }} />
                                          ) : (
                                            <Wrench size={12} style={{ opacity: 0.7 }} />
                                          )
                                        }
                                        label={tech}
                                        sx={{ fontSize: '0.75rem', fontWeight: 500, '& .MuiChip-icon': { color: 'inherit' } }}
                                      />
                                    ))}
                                  </Box>
                                </>
                              )}
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    )
                  })}
                </Stack>
              </motion.div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Grid container spacing={3}>
                  {projects.map((proj, index) => {
                    const IconComponent = proj.icon || Code;
                    return (
                      <Grid key={index} size={{ xs: 12, md: 6 }}>
                        <Card
                          sx={{
                            height: '100%',
                            position: 'relative',
                            '&:hover': {
                              borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
                              '& .project-icon, & .project-title': { color: 'primary.main' },
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                              <Box
                                className="project-icon"
                                sx={{
                                  p: 1.5,
                                  borderRadius: 2,
                                  bgcolor: 'background.default',
                                  border: 1,
                                  borderColor: 'divider',
                                  color: 'text.secondary',
                                  transition: 'color 0.3s',
                                }}
                              >
                                {IconComponent && typeof IconComponent === 'object' && 'prefix' in IconComponent ? (
                                  <FontAwesomeIcon icon={IconComponent as IconDefinition} style={{ width: 24, height: 24 }} />
                                ) : IconComponent ? (
                                  <IconComponent size={24} />
                                ) : null}
                              </Box>
                              <Box
                                sx={{
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  color: 'text.secondary',
                                  bgcolor: 'background.default',
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: 1,
                                  border: 1,
                                  borderColor: 'divider',
                                }}
                              >
                                {proj.period}
                              </Box>
                            </Stack>
                            <Typography
                              variant="h3"
                              className="project-title"
                              sx={{ fontSize: '1.125rem', fontWeight: 700, color: 'text.primary', mb: 0.5, transition: 'color 0.3s' }}
                            >
                              {proj.title}
                            </Typography>
                            <Typography sx={{ fontSize: '0.875rem', color: 'primary.main', fontWeight: 500, mb: 1.5 }}>
                              {proj.company}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.75, mb: 2 }}>
                              {Array.isArray(proj.description) ? proj.description[0] : proj.description}
                            </Typography>
                            {proj.link && (
                              <Link
                                href={proj.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="hover"
                                sx={{
                                  mt: 'auto',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  color: 'primary.main',
                                }}
                              >
                                View Project →
                              </Link>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                  })}
                </Grid>
              </motion.div>
            )}

            {/* NPM PACKAGES TAB */}
            {activeTab === 'npm' && (
              <motion.div
                key="npm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Grid container spacing={3}>
                  {npmPackages.map((pkg, index) => (
                    <Grid key={index} size={{ xs: 12, md: 6 }}>
                      <Card
                        sx={{
                          height: '100%',
                          '&:hover': {
                            borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
                            '& .npm-icon': { color: 'primary.main' },
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                            <Box className="npm-icon" sx={{ color: 'text.secondary', transition: 'color 0.3s', display: 'flex' }}>
                              <Terminal size={32} />
                            </Box>
                            <Link
                              href={pkg.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              underline="hover"
                              sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'primary.main' }}
                            >
                              View on NPM →
                            </Link>
                          </Stack>
                          <Typography
                            variant="h3"
                            sx={{ fontSize: '1.125rem', fontWeight: 700, color: 'text.primary', mb: 1, fontFamily: 'monospace' }}
                          >
                            {pkg.name}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem', mb: 3, minHeight: 40 }}>
                            {pkg.description}
                          </Typography>

                          <Box sx={{ position: 'relative' }}>
                            <Box
                              component="code"
                              sx={{
                                display: 'block',
                                bgcolor: 'background.default',
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 2,
                                p: 1.5,
                                pr: 6,
                                fontFamily: 'monospace',
                                fontSize: '0.75rem',
                                color: 'text.secondary',
                                overflowX: 'auto',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {pkg.command}
                            </Box>
                            <Tooltip title="Copy to install">
                              <IconButton
                                onClick={() => handleCopy(pkg.command)}
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  right: 8,
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  color: 'text.secondary',
                                  '&:hover': { bgcolor: 'background.paper' },
                                }}
                              >
                                {copiedPkg === pkg.command ? (
                                  <Check size={16} color="#22c55e" />
                                ) : (
                                  <Copy size={16} />
                                )}
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            )}

          </AnimatePresence>
        </Box>

        {/* Mentorship CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Box sx={{ mt: 12, textAlign: 'center', maxWidth: '42rem', mx: 'auto' }}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'text.primary', mb: 2 }}>
                  Want to land a role like these?
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 3 }}>
                  I mentor aspiring engineers to help them crack technical interviews and level up their careers.
                </Typography>
                <Button
                  href="/mentorship"
                  variant="contained"
                  sx={{
                    px: 3,
                    py: 1.5,
                    fontWeight: 700,
                    bgcolor: 'text.primary',
                    color: 'background.paper',
                    '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' },
                  }}
                >
                  Explore Mentorship
                </Button>
              </CardContent>
            </Card>
          </Box>
        </motion.div>

        {/* Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button
              href="/Alvian_Zachry_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<Briefcase size={20} />}
              sx={{
                px: 4,
                py: 2,
                fontWeight: 700,
                boxShadow: 4,
                transition: 'all 0.3s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 },
              }}
            >
              Download Curated Resume
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
