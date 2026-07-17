import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WormBackground from '../WormBackground';

describe('WormBackground Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<WormBackground />);
    expect(container).toBeInTheDocument();
  });

  it('generates correct number of worms', () => {
    const { container } = render(<WormBackground />);
    // We configured 50 worms in the component
    // Exclude the variant-toggle button's lucide icon paths
    const worms = [...container.querySelectorAll('path')].filter(pth => !pth.closest('button'));
    expect(worms.length).toBe(50);
  });

  it('generates valid SVG paths', () => {
    const { container } = render(<WormBackground />);
    const firstWorm = container.querySelector('path');
    expect(firstWorm).toHaveAttribute('d');
    const d = firstWorm?.getAttribute('d');
    // Check if path starts with M (Move) and contains Q (Quadratic Bezier)
    expect(d).toMatch(/^M/);
    expect(d).toContain('Q');
  });
});
