import { createTheme, Theme } from '@mui/material/styles';

export type AppThemeMode = 'light' | 'dark' | 'cyberpunk';

// Mirrors the CSS variables defined in src/index.css so MUI components
// stay in sync with the existing light/dark/cyberpunk themes.
const palettes = {
  light: {
    mode: 'light' as const,
    bgPrimary: '#f8fafc',
    textPrimary: '#0f172a',
    textSecondary: '#64748b',
    accentPrimary: '#990000',
    accentSecondary: '#7f1d1d',
    borderColor: '#e2e8f0',
    cardBg: '#ffffff',
    fontPrimary: '"Inter", sans-serif',
    fontHeading: '"Outfit", sans-serif',
  },
  dark: {
    mode: 'dark' as const,
    bgPrimary: '#0f172a',
    textPrimary: '#ffffff',
    textSecondary: '#cbd5e1',
    accentPrimary: '#ef4444',
    accentSecondary: '#f87171',
    borderColor: '#1e293b',
    cardBg: '#1e293b',
    fontPrimary: '"Inter", sans-serif',
    fontHeading: '"Outfit", sans-serif',
  },
  cyberpunk: {
    mode: 'dark' as const,
    bgPrimary: '#000000',
    textPrimary: '#00ff41',
    textSecondary: '#4ade80',
    accentPrimary: '#ff00ff',
    accentSecondary: '#00ffff',
    borderColor: '#00ff41',
    cardBg: '#0a0a0a',
    fontPrimary: '"Courier New", monospace',
    fontHeading: '"Courier New", monospace',
  },
};

export function createAppTheme(appMode: AppThemeMode): Theme {
  const c = palettes[appMode];
  const isCyberpunk = appMode === 'cyberpunk';
  const radius = isCyberpunk ? 0 : 16;

  return createTheme({
    palette: {
      mode: c.mode,
      primary: { main: c.accentPrimary },
      secondary: { main: c.accentSecondary },
      background: { default: c.bgPrimary, paper: c.cardBg },
      text: { primary: c.textPrimary, secondary: c.textSecondary },
      divider: c.borderColor,
    },
    typography: {
      fontFamily: c.fontPrimary,
      h1: { fontFamily: c.fontHeading, letterSpacing: '-0.025em' },
      h2: { fontFamily: c.fontHeading, letterSpacing: '-0.025em' },
      h3: { fontFamily: c.fontHeading, letterSpacing: '-0.025em' },
      h4: { fontFamily: c.fontHeading, letterSpacing: '-0.025em' },
      h5: { fontFamily: c.fontHeading, letterSpacing: '-0.025em' },
      h6: { fontFamily: c.fontHeading, letterSpacing: '-0.025em' },
      button: { textTransform: 'none', fontWeight: 500 },
    },
    shape: { borderRadius: radius },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: isCyberpunk ? 0 : 9999,
            boxShadow: 'none',
            ...(isCyberpunk && {
              boxShadow: `4px 4px 0px ${c.accentSecondary}`,
              '&:hover': { boxShadow: `6px 6px 0px ${c.accentSecondary}` },
            }),
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: c.cardBg,
            border: `1px solid ${c.borderColor}`,
            backgroundImage: 'none',
            transition: 'all 0.3s',
            ...(isCyberpunk && { boxShadow: `4px 4px 0px ${c.accentPrimary}` }),
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: c.bgPrimary,
            color: c.textSecondary,
            border: `1px solid ${c.borderColor}`,
            borderRadius: isCyberpunk ? 0 : 9999,
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: c.borderColor,
            borderRadius: isCyberpunk ? 0 : 9999,
          },
          bar: { backgroundColor: c.accentPrimary },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: appMode === 'light' ? '#0f172a' : c.cardBg,
            fontSize: '0.75rem',
          },
        },
      },
    },
  });
}
