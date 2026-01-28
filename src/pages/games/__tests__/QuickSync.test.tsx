import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import QuickSync from '../QuickSync';

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
    render(<QuickSync />);
    expect(screen.getByText('Quick Sync Dodge')).toBeInTheDocument();
    expect(screen.getByText('Start Working')).toBeInTheDocument();
  });

  it('starts game when button is clicked', () => {
    render(<QuickSync />);
    const startButton = screen.getByText('Start Working');

    act(() => {
      fireEvent.click(startButton);
    });

    // Score should be 0s
    expect(screen.getByText('0s')).toBeInTheDocument();
  });
});
