import { createTheme, Theme } from '@mui/material/styles';

export type AppThemeMode = 'light' | 'dark' | 'cyberpunk';

declare module '@mui/material/styles' {
  interface Theme {
    custom: { isCyberpunk: boolean };
  }
  interface ThemeOptions {
    custom?: { isCyberpunk: boolean };
  }
}

// Single source of truth for colors is the CSS vars defined in src/index.css
// (:root / .dark / .cyberpunk). We read the live computed values instead of
// hand-duplicating the palette here, so the two can't drift out of sync.
// Fallbacks below only apply when index.css hasn't been loaded (e.g. jsdom
// test environment, which doesn't process stylesheets) — real browsers
// always resolve the actual var.
const FALLBACK = {
  bgPrimary: '#f8fafc',
  textPrimary: '#0f172a',
  textSecondary: '#64748b',
  accentPrimary: '#990000',
  accentSecondary: '#7f1d1d',
  borderColor: '#e2e8f0',
  cardBg: '#ffffff',
  fontPrimary: '"Inter", sans-serif',
  fontHeading: '"Outfit", sans-serif',
};

function readCssVars() {
  const s = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) => s.getPropertyValue(name).trim() || fallback;
  return {
    bgPrimary: v('--bg-primary', FALLBACK.bgPrimary),
    textPrimary: v('--text-primary', FALLBACK.textPrimary),
    textSecondary: v('--text-secondary', FALLBACK.textSecondary),
    accentPrimary: v('--accent-primary', FALLBACK.accentPrimary),
    accentSecondary: v('--accent-secondary', FALLBACK.accentSecondary),
    borderColor: v('--border-color', FALLBACK.borderColor),
    cardBg: v('--card-bg', FALLBACK.cardBg),
    fontPrimary: v('--font-primary', FALLBACK.fontPrimary),
    fontHeading: v('--font-heading', FALLBACK.fontHeading),
  };
}

export function createAppTheme(appMode: AppThemeMode): Theme {
  const c = readCssVars();
  const isCyberpunk = appMode === 'cyberpunk';
  const muiMode = appMode === 'light' ? 'light' : 'dark';
  const radius = isCyberpunk ? 0 : 16;

  return createTheme({
    custom: { isCyberpunk },
    palette: {
      mode: muiMode,
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
