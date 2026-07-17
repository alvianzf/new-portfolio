import { Link as RouterLink } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedium, faReact, faCloudflare } from '@fortawesome/free-brands-svg-icons';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';

const headingSx = {
  color: 'primary.main',
  fontWeight: 700,
  textTransform: 'uppercase',
  fontSize: '0.875rem',
  letterSpacing: '0.05em',
  mb: 2,
} as const;

const listSx = {
  listStyle: 'none',
  p: 0,
  m: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  fontSize: '0.875rem',
} as const;

const linkSx = {
  color: 'text.secondary',
  textDecoration: 'none',
  transition: 'color 0.3s',
  '&:hover': { color: 'text.primary' },
} as const;

const socialSx = {
  bgcolor: 'background.default',
  color: 'text.secondary',
  borderRadius: 2,
  transition: 'all 0.3s',
  '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' },
} as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        color: 'text.secondary',
        py: 8,
        transition: 'background-color 0.3s',
      }}
    >
      <Container maxWidth="xl" sx={{ px: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' },
            gap: 4,
            mb: 6,
          }}
        >
          {/* Brand & Description */}
          <Box sx={{ borderBottom: { xs: 1, md: 0 }, borderColor: { xs: 'divider' }, pb: { xs: 4, md: 0 } }}>
            <Link
              component={RouterLink}
              to="/"
              sx={{
                ...linkSx,
                display: 'block',
                fontSize: '1.5rem',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: 'text.primary',
                mb: 2,
                '&:hover': { color: 'primary.main' },
              }}
            >
              azf.
            </Link>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 3 }}>
              Program Manager, Technical Lead, and Full Stack Engineer bridging the gap between people and technology.
            </Typography>
            {/* Socials moved here for better mobile density */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton
                component="a"
                href="https://github.com/alvianzf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={socialSx}
              >
                <Github className="w-5 h-5" />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com/in/alvianzf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={socialSx}
              >
                <Linkedin className="w-5 h-5" />
              </IconButton>
              <IconButton
                component="a"
                href="https://medium.com/@alvianzf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medium"
                sx={socialSx}
              >
                <FontAwesomeIcon icon={faMedium} className="w-5 h-5" />
              </IconButton>
              <IconButton component="a" href="mailto:hello@alvianzf.id" aria-label="Email" sx={socialSx}>
                <Mail className="w-5 h-5" />
              </IconButton>
            </Box>
          </Box>

          {/* Links Group 1: Site & Games */}
          <Box>
            <Typography component="h3" sx={headingSx}>Explore</Typography>
            <Box component="ul" sx={listSx}>
              <li><Link component={RouterLink} to="/" sx={linkSx}>Home</Link></li>
              <li><Link component={RouterLink} to="/experience" sx={linkSx}>Experience</Link></li>
              <li><Link component={RouterLink} to="/blog" sx={linkSx}>Blog</Link></li>
              <li><Link component={RouterLink} to="/mentorship" sx={linkSx}>Mentorship</Link></li>
              <li><Link component={RouterLink} to="/about" sx={linkSx}>About</Link></li>
              <Box
                component="li"
                sx={{ pt: 2, fontWeight: 700, color: 'text.primary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                Games
              </Box>
              <li><Link component={RouterLink} to="/games/bug-squash" sx={linkSx}>Bug Squash</Link></li>
              <li><Link component={RouterLink} to="/games/quick-sync" sx={linkSx}>Quick Sync</Link></li>
              <li><Link component={RouterLink} to="/games/elusive-deploy" sx={linkSx}>Elusive Deploy</Link></li>
              <li><Link component={RouterLink} to="/games/learn-flex" sx={linkSx}>Flexbox Froggy</Link></li>
              <li><Link component={RouterLink} to="/games/learn-typescript" sx={linkSx}>Type Torture</Link></li>
            </Box>
          </Box>

          {/* Tools */}
          <Box>
            <Typography component="h3" sx={headingSx}>Tools</Typography>
            <Box component="ul" sx={listSx}>
              <Box
                component="li"
                sx={{ fontWeight: 600, color: 'text.secondary', opacity: 0.7, fontSize: '0.75rem', textTransform: 'uppercase', pt: 0.5, pb: 0.5 }}
              >
                Internal
              </Box>
              <li><Link component={RouterLink} to="/tools/thesis-creator" sx={linkSx}>Thesis Procrastinator</Link></li>
              <li><Link component={RouterLink} to="/tools/whatsapp-formatter" sx={linkSx}>Boomer Text Gen</Link></li>
              <li><Link component={RouterLink} to="/tools/markdown-to-pdf" sx={linkSx}>The AI Slop Polisher</Link></li>
              <li><Link component={RouterLink} to="/tools/database-playground" sx={linkSx}>DBA Cosplay Kit</Link></li>

              <Box
                component="li"
                sx={{ fontWeight: 600, color: 'text.secondary', opacity: 0.7, fontSize: '0.75rem', textTransform: 'uppercase', pt: 2, pb: 0.5 }}
              >
                Web Apps
              </Box>
              <li><Link href="https://jsonify.alvianzf.id" target="_blank" rel="noopener noreferrer" sx={linkSx}>Curly Brace Saver</Link></li>
              <li><Link href="https://invoice.alvianzf.id" target="_blank" rel="noopener noreferrer" sx={linkSx}>Beg For Money</Link></li>
              <li><Link href="https://hitungpajak.alvianzf.id" target="_blank" rel="noopener noreferrer" sx={linkSx}>Tax Calculator</Link></li>
            </Box>
          </Box>

          {/* NPM Packages */}
          <Box sx={{ gridColumn: { md: 'span 2', lg: 'span 2' } }}>
            <Typography component="h3" sx={headingSx}>NPM Packages</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: '0.875rem' }}>
              {[
                { href: 'https://www.npmjs.com/package/make-it-rain', label: 'Visual Inflation' },
                { href: 'https://www.npmjs.com/package/env-validate-sarcastically', label: 'Env Bully' },
                { href: 'https://www.npmjs.com/package/a-valid-json', label: 'Trust Issues' },
                { href: 'https://www.npmjs.com/package/@alvianzf/squiggly-lines-go-brrr', label: 'CPU Heater' },
              ].map((pkg) => (
                <Link
                  key={pkg.href}
                  href={pkg.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    ...linkSx,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '& span': { opacity: 0, transition: 'opacity 0.3s', color: 'primary.main', fontSize: '0.75rem' },
                    '&:hover span': { opacity: 1 },
                  }}
                >
                  {pkg.label} <span>→</span>
                </Link>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            pt: 4,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.8 }}>
            © {currentYear} Alvian Zachry Faturrahman. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'text.secondary',
              opacity: 0.8,
            }}
          >
            <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              Built with
              <FontAwesomeIcon icon={faReact} className="text-[#61DAFB] w-3.5 h-3.5" /> React
              &
              <img src="https://vitejs.dev/logo.svg" alt="Vite" className="w-3.5 h-3.5" /> Vite
            </Box>
            <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              Secured by <FontAwesomeIcon icon={faCloudflare} className="text-[#F38020] w-3.5 h-3.5" /> Cloudflare
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
