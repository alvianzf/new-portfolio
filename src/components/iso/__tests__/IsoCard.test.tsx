import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import IsoCard from '../IsoCard';

describe('IsoCard Component', () => {
  it('renders children correctly', () => {
    render(
      <IsoCard>
        <p>Test Content</p>
      </IsoCard>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <IsoCard className="custom-class">
        <p>Content</p>
      </IsoCard>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders without crashing when tiltOnHover/accent vary', () => {
    render(
      <IsoCard tiltOnHover={false} accent="none">
        <p>Flat content</p>
      </IsoCard>
    );
    expect(screen.getByText('Flat content')).toBeInTheDocument();
  });
});
