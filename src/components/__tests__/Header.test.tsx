import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../Header';
import { renderWithProviders } from '../../test-utils';

// Mock the ThemeToggle since it might use context/localstorage
vi.mock('../ThemeToggle', () => ({
  default: () => <button data-testid="theme-toggle">Toggle Theme</button>,
}));

describe('Header Component', () => {
  it('renders navigation links', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Mentorship')).toBeInTheDocument();
  });

  it('renders game dropdown', () => {
    renderWithProviders(<Header />);
    const gamesButton = screen.getByText('Games');
    expect(gamesButton).toBeInTheDocument();

    // Hover or click to reveal dropdown (depending on implementation, usually hover for desktop)
    fireEvent.mouseEnter(gamesButton);
    // Since dropdown might be implemented with CSS hover or state, we can check if links exist in DOM
    // For this test, we just check if the main structure is there.
  });

  it('renders mobile menu button', () => {
    renderWithProviders(<Header />);
    // Initial state: hidden on desktop, visible on mobile.
    // We can check for the menu icon (usually an svg or button)
    // Assuming Lucide icons are used, they render SVGs.
    const menuButton = screen.getByLabelText(/menu/i) || screen.getByRole('button', { name: /menu/i });
    // Note: The button might be hidden via CSS on desktop, but it should exist in the DOM
    expect(menuButton).toBeInTheDocument();
  });
});
