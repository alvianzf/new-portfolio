import { screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import QuickSync from '../QuickSync';
import { renderWithProviders } from '../../../test-utils';

// Mock requestAnimationFrame
const requestAnimationFrameMock = (callback: FrameRequestCallback) => {
  return setTimeout(() => callback(performance.now()), 16);
};
const cancelAnimationFrameMock = (id: number) => {
  clearTimeout(id);
};

describe('QuickSync Game', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', requestAnimationFrameMock);
    vi.stubGlobal('cancelAnimationFrame', cancelAnimationFrameMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders start screen initially', () => {
    renderWithProviders(<QuickSync />);
    expect(screen.getByText('Quick Sync Dodge')).toBeInTheDocument();
    expect(screen.getByText('Start Working')).toBeInTheDocument();
  });

  it('starts game when button is clicked', () => {
    renderWithProviders(<QuickSync />);
    const startButton = screen.getByText('Start Working');

    act(() => {
      fireEvent.click(startButton);
    });

    // Score should be 0s
    expect(screen.getByText('0s')).toBeInTheDocument();
  });
});
