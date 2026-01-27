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
    const worms = container.querySelectorAll('path');
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
