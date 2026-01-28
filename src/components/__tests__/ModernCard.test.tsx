import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ModernCard from '../ModernCard';

describe('ModernCard Component', () => {
  it('renders children correctly', () => {
    render(
      <ModernCard>
        <p>Test Content</p>
      </ModernCard>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <ModernCard className="custom-class">
        <p>Content</p>
      </ModernCard>
    );
    // ModernCard wraps children in a div with card-modern class
    const card = screen.getByText('Content').closest('div');
    expect(card).toHaveClass('custom-class');
    expect(card).toHaveClass('card-modern');
  });

  it('renders with cyberpunk-compatible structure', () => {
    // Cyberpunk theme relies on CSS variables which are applied at root/body
    // The component itself just needs to render the correct base classes
    const { container } = render(
      <ModernCard>Content</ModernCard>
    );
    expect(container.firstChild).toHaveClass('p-6');
  });
});
