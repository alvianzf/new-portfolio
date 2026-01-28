import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Mentorship from '../Mentorship';
import { renderWithProviders } from '../../test-utils';

// Mock specific image imports if they cause issues in Jest/Vitest
vi.mock('../../assets/learnwithandi.png', () => ({ default: 'test-image-url' }));

describe('Mentorship Page', () => {
  it('renders main heading', () => {
    renderWithProviders(<Mentorship />);
    expect(screen.getByText(/Roast/i)).toBeInTheDocument();
  });

  it('renders features', () => {
    renderWithProviders(<Mentorship />);
    expect(screen.getByText('Get Roasted')).toBeInTheDocument();
    expect(screen.getByText('Real Interview Simulation')).toBeInTheDocument();
  });

  it('renders mentorship benefits', () => {
    renderWithProviders(<Mentorship />);
    expect(screen.getByText('Interview communication skills')).toBeInTheDocument();
  });
});
