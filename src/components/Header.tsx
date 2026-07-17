import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Github, Linkedin, ChevronDown, FileJson, Receipt, CloudRain, MessageSquareWarning, CheckCircle2, Menu, X, Terminal, Coins, AreaChart } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedium } from '@fortawesome/free-brands-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { AppBar, Toolbar, Container, Box, Stack, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

const NAV_ITEMS = ['Home', 'Experience', 'Blog', 'Mentorship', 'About'];

interface MenuItemDef {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  to?: string;
  href?: string;
}

const emojiIcon = (emoji: string, faClass?: string) => (
  <Box
    component="i"
    className={faClass}
    sx={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontStyle: 'normal' }}
  >
    {emoji}
  </Box>
);

const GAMES_SECTIONS: { heading: string; items: MenuItemDef[] }[] = [
  {
    heading: 'Waste Time',
    items: [
      { title: 'Bug Squash', desc: 'Whack-a-Bug (Stress Relief)', to: '/games/bug-squash', color: '#dc2626', icon: emojiIcon('🐞', 'fas fa-bug') },
      { title: 'Quick Sync Dodge', desc: 'Avoid the calendar invites', to: '/games/quick-sync', color: '#2563eb', icon: emojiIcon('📅', 'fas fa-calendar-minus') },
      { title: 'Elusive Deploy', desc: 'Try to click the button', to: '/games/elusive-deploy', color: '#ea580c', icon: emojiIcon('🚀', 'fas fa-rocket') },
    ],
  },
  {
    heading: '"Actually" Learn',
    items: [
      {
        title: 'Flexbox Froggy', desc: 'Center a div correctly', to: '/games/learn-flex', color: '#9333ea',
        icon: (
          <Box sx={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 10, border: '2px solid currentColor', borderRadius: 1 }}>
            CSS
          </Box>
        ),
      },
      {
        title: 'Type Torture', desc: 'Fix the red squiggly lines', to: '/games/learn-typescript', color: '#2563eb',
        icon: (
          <Box sx={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 10 }}>
            TS
          </Box>
        ),
      },
    ],
  },
];

const TOOLS_PRODUCTIVITY: MenuItemDef[] = [
  { title: 'Thesis Procrastinator', desc: 'Solve relativity instead of working', to: '/tools/thesis-creator', color: '#475569', icon: <Receipt size={20} /> },
  { title: 'Boomer Text Gen', desc: 'Formatting for family group chats', to: '/tools/whatsapp-formatter', color: '#16a34a', icon: <MessageSquareWarning size={20} /> },
];

const TOOLS_WEB_APPS: MenuItemDef[] = [
  { title: 'Curly Brace Saver', desc: 'Make ugly APIs look pretty', href: 'https://jsonify.alvianzf.id', color: '#990000', icon: <FileJson size={20} /> },
  { title: 'Beg For Money', desc: "PDFs for clients who won't pay", href: 'https://invoice.alvianzf.id', color: '#16a34a', icon: <Receipt size={20} /> },
  { title: 'Tax Calculator', desc: "Want to know how much you're actually paying?", href: 'https://hitungpajak.alvianzf.id', color: '#16a34a', icon: <Coins size={20} /> },
  { title: 'Finance Tracker', desc: 'See how broke you are and how far are you from that Palisade.', href: 'https://gold-tracker.alvianzf.id', color: '#ca8a04', icon: <AreaChart size={20} /> },
];

const TOOLS_NPM: MenuItemDef[] = [
  { title: 'Visual Inflation', desc: 'Handles the tough job of making your numbers actually readable', href: 'https://www.npmjs.com/package/make-it-rain', color: '#9333ea', icon: <CloudRain size={20} /> },
  { title: 'Env Bully', desc: 'Yells at you for missing keys', href: 'https://www.npmjs.com/package/env-validate-sarcastically', color: '#ca8a04', icon: <MessageSquareWarning size={20} /> },
  { title: 'Trust Issues', desc: 'Paranoid JSON validation', href: 'https://www.npmjs.com/package/a-valid-json', color: '#0d9488', icon: <CheckCircle2 size={20} /> },
  { title: 'CPU Heater', desc: 'Laggy background lines', href: 'https://www.npmjs.com/package/@alvianzf/squiggly-lines-go-brrr', color: '#db2777', icon: emojiIcon('🪱') },
];

function SectionHeading({ children, noBorder }: { children: React.ReactNode; noBorder?: boolean }) {
  return (
    <Typography
      component="h3"
      sx={{
        fontSize: '0.75rem',
        fontWeight: 700,
        color: 'text.secondary',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        mb: 2,
        ...(noBorder ? {} : { borderBottom: 1, borderColor: 'divider', pb: 1 }),
      }}
    >
      {children}
    </Typography>
  );
}

function MegaMenuItem({ item }: { item: MenuItemDef }) {
  const linkProps = item.to
    ? { component: NavLink, to: item.to }
    : { component: 'a' as const, href: item.href, target: '_blank', rel: 'noopener noreferrer' };

  return (
    <Box
      {...linkProps}
      sx={{
        display: 'block',
        p: 1,
        mx: -1,
        borderRadius: 2,
        textDecoration: 'none',
        transition: 'background-color 0.2s',
        '&:hover': {
          bgcolor: 'action.hover',
          '& .mega-title, & .mega-icon': { color: 'primary.main' },
        },
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Box
          className="mega-icon"
          sx={{
            p: 1,
            borderRadius: 2,
            color: item.color,
            bgcolor: alpha(item.color, 0.12),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s',
          }}
        >
          {item.icon}
        </Box>
        <Box>
          <Typography className="mega-title" sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.primary', transition: 'color 0.2s' }}>
            {item.title}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{item.desc}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}

function MobileMenuLink({ item }: { item: MenuItemDef }) {
  const linkProps = item.to
    ? { component: NavLink, to: item.to }
    : { component: 'a' as const, href: item.href, target: '_blank', rel: 'noopener noreferrer' };

  return (
    <Box {...linkProps} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.secondary', fontWeight: 500, textDecoration: 'none' }}>
      <Box sx={{ color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</Box>
      {item.title}
    </Box>
  );
}

function HoverDropdown({
  label,
  align,
  width,
  children,
}: {
  label: string;
  align: 'center' | 'right';
  width: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        disableRipple
        endIcon={<ChevronDown size={16} />}
        sx={{
          color: open ? 'primary.main' : 'text.secondary',
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: 1.5,
          py: 0,
          px: 0,
          minWidth: 0,
          boxShadow: 'none',
          '&:hover': { bgcolor: 'transparent', color: 'primary.main', boxShadow: 'none' },
        }}
      >
        {label}
      </Button>

      <Box
        sx={{
          position: 'absolute',
          top: '100%',
          width,
          pt: 2,
          ...(align === 'center' ? { left: '50%', transform: 'translateX(-50%)' } : { right: 0 }),
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'opacity 0.2s, visibility 0.2s',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 8,
            border: 1,
            borderColor: 'divider',
            p: 3,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -8,
              ...(align === 'center' ? { left: '50%', ml: '-8px' } : { right: 24 }),
              width: 16,
              height: 16,
              bgcolor: 'background.paper',
              borderTop: 1,
              borderLeft: 1,
              borderColor: 'divider',
              transform: 'rotate(45deg)',
            }}
          />
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
  });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: 1200,
        bgcolor: alpha(theme.palette.background.default, 0.8),
        backgroundImage: 'none',
        backdropFilter: 'blur(12px)',
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: 'none',
        transition: 'all 0.3s',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '73px !important', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box
            component={NavLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: 'text.primary',
              textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <Terminal size={20} color={theme.palette.primary.main} />
            azf.
          </Box>

          {/* Regular Navigation (Tablet & Desktop) */}
          <Stack direction="row" spacing={4} alignItems="center" component="nav" sx={{ display: { xs: 'none', md: 'flex' } }}>
            {NAV_ITEMS.map((item) => (
              <Box
                key={item}
                component={NavLink}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                style={navLinkStyle}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  '&:hover': { color: `${theme.palette.primary.main} !important` },
                }}
              >
                {item}
              </Box>
            ))}

            {/* Games Dropdown (Desktop) */}
            <HoverDropdown label="Games" align="center" width={600}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                {GAMES_SECTIONS.map((section) => (
                  <Box key={section.heading}>
                    <SectionHeading>{section.heading}</SectionHeading>
                    <Stack spacing={1}>
                      {section.items.map((item) => (
                        <MegaMenuItem key={item.title} item={item} />
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Box>
            </HoverDropdown>

            {/* Tools Dropdown (Desktop) */}
            <HoverDropdown label="Tools" align="right" width={500}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                <Box sx={{ gridColumn: 'span 2', borderBottom: 1, borderColor: 'divider', pb: 2, mb: 1 }}>
                  <SectionHeading noBorder>Productivity Killers</SectionHeading>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    {TOOLS_PRODUCTIVITY.map((item) => (
                      <MegaMenuItem key={item.title} item={item} />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <SectionHeading>Over-Engineered</SectionHeading>
                  <Stack spacing={1}>
                    {TOOLS_WEB_APPS.map((item) => (
                      <MegaMenuItem key={item.title} item={item} />
                    ))}
                  </Stack>
                </Box>

                <Box>
                  <SectionHeading>Node_Modules Bloat</SectionHeading>
                  <Stack spacing={1}>
                    {TOOLS_NPM.map((item) => (
                      <MegaMenuItem key={item.title} item={item} />
                    ))}
                  </Stack>
                </Box>
              </Box>
            </HoverDropdown>
          </Stack>

          {/* Social Icons & Hamburger (Mobile and Desktop) */}
          <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
            <Stack direction="row" spacing={{ xs: 0.5, md: 1 }} alignItems="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Tooltip title="GitHub">
                <IconButton component="a" href="https://github.com/alvianzf" target="_blank" rel="noopener noreferrer" size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  <Github size={20} />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <IconButton component="a" href="https://linkedin.com/in/alvianzf" target="_blank" rel="noopener noreferrer" size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  <Linkedin size={20} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Medium">
                <IconButton component="a" href="https://medium.com/@alvianzf" target="_blank" rel="noopener noreferrer" size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  <FontAwesomeIcon icon={faMedium} style={{ width: 20, height: 20 }} />
                </IconButton>
              </Tooltip>
              <Button
                component="a"
                href="mailto:hello@alvianzf.id"
                variant="contained"
                disableElevation
                sx={{
                  display: { xs: 'none', lg: 'inline-flex' },
                  px: 2,
                  py: 1,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  bgcolor: 'text.primary',
                  color: 'background.paper',
                  '&:hover': { bgcolor: 'primary.main', color: '#ffffff' },
                }}
              >
                Contact
              </Button>
            </Stack>

            {/* Hamburger Button */}
            <IconButton
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              sx={{ display: { md: 'none' }, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            sx={{
              position: 'fixed',
              top: '73px',
              left: 0,
              right: 0,
              bottom: 0,
              height: 'calc(100vh - 73px)',
              bgcolor: 'background.default',
              overflowY: 'auto',
              display: { md: 'none' },
            }}
          >
            <Container maxWidth="xl" sx={{ py: 4 }}>
              <Stack spacing={4}>
                {/* Navigation Links */}
                <Stack spacing={3}>
                  {NAV_ITEMS.map((item) => (
                    <Box
                      key={item}
                      component={NavLink}
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      style={({ isActive }: { isActive: boolean }) => ({
                        color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                      })}
                      sx={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', transition: 'color 0.2s' }}
                    >
                      {item}
                    </Box>
                  ))}

                  {/* Mobile Games Dropdown */}
                  <Stack spacing={2}>
                    <Box
                      component="button"
                      onClick={() => setIsGamesOpen(!isGamesOpen)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'text.primary',
                        bgcolor: 'transparent',
                        border: 0,
                        p: 0,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      <span>Games</span>
                      <motion.div animate={{ rotate: isGamesOpen ? 180 : 0 }}>
                        <ChevronDown size={24} />
                      </motion.div>
                    </Box>

                    <AnimatePresence>
                      {isGamesOpen && (
                        <Box
                          component={motion.div}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          sx={{ overflow: 'hidden', pl: 2, borderLeft: 2, borderColor: 'divider' }}
                        >
                          <Stack spacing={2} sx={{ pt: 1 }}>
                            {GAMES_SECTIONS.map((section) => (
                              <Stack key={section.heading} spacing={2}>
                                <SectionHeading noBorder>{section.heading}</SectionHeading>
                                {section.items.map((item) => (
                                  <MobileMenuLink key={item.title} item={item} />
                                ))}
                              </Stack>
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </AnimatePresence>
                  </Stack>

                  {/* Mobile Tools Dropdown */}
                  <Stack spacing={2}>
                    <Box
                      component="button"
                      onClick={() => setIsToolsOpen(!isToolsOpen)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'text.primary',
                        bgcolor: 'transparent',
                        border: 0,
                        p: 0,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      <span>Tools</span>
                      <motion.div animate={{ rotate: isToolsOpen ? 180 : 0 }}>
                        <ChevronDown size={24} />
                      </motion.div>
                    </Box>

                    <AnimatePresence>
                      {isToolsOpen && (
                        <Box
                          component={motion.div}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          sx={{ overflow: 'hidden', pl: 2, borderLeft: 2, borderColor: 'divider' }}
                        >
                          <Stack spacing={2} sx={{ pt: 1 }}>
                            <SectionHeading noBorder>Productivity Killers</SectionHeading>
                            {/* Thesis Procrastinator is hidden on mobile */}
                            {TOOLS_PRODUCTIVITY.filter((item) => item.to !== '/tools/thesis-creator').map((item) => (
                              <MobileMenuLink key={item.title} item={item} />
                            ))}

                            <SectionHeading noBorder>Over-Engineered</SectionHeading>
                            {TOOLS_WEB_APPS.map((item) => (
                              <MobileMenuLink key={item.title} item={item} />
                            ))}

                            <SectionHeading noBorder>Node_Modules Bloat</SectionHeading>
                            {TOOLS_NPM.map((item) => (
                              <MobileMenuLink key={item.title} item={item} />
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </AnimatePresence>
                  </Stack>
                </Stack>

                {/* Social and Contact */}
                <Box sx={{ pt: 4, borderTop: 1, borderColor: 'divider' }}>
                  <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
                    <IconButton component="a" href="https://github.com/alvianzf" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, p: 0 }}>
                      <Github size={32} />
                    </IconButton>
                    <IconButton component="a" href="https://linkedin.com/in/alvianzf" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, p: 0 }}>
                      <Linkedin size={32} />
                    </IconButton>
                    <IconButton component="a" href="https://medium.com/@alvianzf" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, p: 0 }}>
                      <FontAwesomeIcon icon={faMedium} style={{ width: 32, height: 32 }} />
                    </IconButton>
                  </Stack>
                  <Button
                    component="a"
                    href="mailto:hello@alvianzf.id"
                    fullWidth
                    variant="contained"
                    disableElevation
                    sx={{
                      px: 3,
                      py: 2,
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      bgcolor: 'text.primary',
                      color: 'background.paper',
                      '&:hover': { bgcolor: 'primary.main', color: '#ffffff' },
                    }}
                  >
                    Get in Touch
                  </Button>
                </Box>
              </Stack>
            </Container>
          </Box>
        )}
      </AnimatePresence>
    </AppBar>
  );
}
