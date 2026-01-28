import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import About from '../About';
import { renderWithProviders } from '../../test-utils';

// Mock components that might cause issues or are tested separately
vi.mock('../../components/ModernCard', () => ({
  default: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div data-testid="modern-card" className={className}>{children}</div>
  )
}));

describe('About Page', () => {
  it('renders hero section', () => {
    renderWithProviders(<About />);
    expect(screen.getByText("Alvian")).toBeInTheDocument();
    expect(screen.getByText("Zachry.")).toBeInTheDocument();
  });

  it('renders skills section', () => {
    renderWithProviders(<About />);
    expect(screen.getByText('JavaScript & TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React.js & Next.js')).toBeInTheDocument();
  });

  it('renders "Get in touch" button', () => {
    renderWithProviders(<About />);
    const button = screen.getByText('Get in touch');
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '#contact');
  });
});
