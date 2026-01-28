import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Experience from '../Experience';
import { renderWithProviders } from '../../test-utils';

describe('Experience Page', () => {
  it('renders page title', () => {
    renderWithProviders(<Experience />);
    expect(screen.getByText('Professional Journey')).toBeInTheDocument();
  });

  it('renders work experience cards', () => {
    renderWithProviders(<Experience />);
    // Check for specific text that should be present
    expect(screen.getByText(/timeline of my career/i)).toBeInTheDocument();
  });

  it('renders experience list', () => {
    renderWithProviders(<Experience />);
    // Check for "Professional Journey" which we already did.
    expect(screen.getByText(/timeline of my career/i)).toBeInTheDocument();
  });
});
