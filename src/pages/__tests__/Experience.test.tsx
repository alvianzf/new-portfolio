import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Experience from '../Experience';
import { renderWithProviders } from '../../test-utils';

describe('Experience Page', () => {
  it('renders page title', () => {
    renderWithProviders(<Experience />);
    expect(screen.getByText(/13\+ Years of/)).toBeInTheDocument();
  });

  it('renders tab buttons', () => {
    renderWithProviders(<Experience />);
    expect(screen.getByRole('button', { name: /roles/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /npm packages/i })).toBeInTheDocument();
  });

  it('renders career timeline badge', () => {
    renderWithProviders(<Experience />);
    expect(screen.getByText(/career timeline/i)).toBeInTheDocument();
  });
});
