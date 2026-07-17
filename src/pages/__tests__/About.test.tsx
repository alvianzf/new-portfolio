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
  it('renders the README header', () => {
    renderWithProviders(<About />);
    expect(screen.getByText('README.md')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('The Alvian Zachry');
  });

  it('renders feature sections', () => {
    renderWithProviders(<About />);
    expect(screen.getByText('The "Indecisive" Theme Engine')).toBeInTheDocument();
    expect(screen.getByText('The "Worm" Background')).toBeInTheDocument();
    expect(screen.getByText('The Testing Pyramid That Nobody Asked For')).toBeInTheDocument();
  });

  it('renders the GitHub link', () => {
    renderWithProviders(<About />);
    const link = screen.getByText('GitHub');
    expect(link.closest('a')).toHaveAttribute('href', 'https://github.com/alvianzf/new-portfolio/');
  });

  it('renders the contact section', () => {
    renderWithProviders(<About />);
    const email = screen.getByText('hello@alvianzf.id');
    expect(email).toBeInTheDocument();
    expect(email.closest('a')).toHaveAttribute('href', 'mailto:hello@alvianzf.id');
  });
});
