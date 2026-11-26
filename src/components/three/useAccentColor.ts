import { useEffect, useState } from 'react';

/**
 * Reads a CSS custom property (e.g. the theme's --accent-primary) so r3f
 * materials — which can't consume MUI theme tokens directly — stay in sync
 * with the light/dark/cyberpunk toggle. Re-reads whenever the toggle swaps
 * the class on <html>, since this hook doesn't live inside a re-rendering
 * React tree that would otherwise pick up the change.
 */
export function useAccentColor(varName = '--accent-primary', fallback = '#990000') {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    const read = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      if (value) setColor(value);
    };
    read();

    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [varName]);

  return color;
}
