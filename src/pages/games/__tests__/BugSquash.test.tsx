import { screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import BugSquash from '../BugSquash';
import { renderWithProviders } from '../../../test-utils';

// Mock requestAnimationFrame
const requestAnimationFrameMock = (callback: FrameRequestCallback) => {
  return setTimeout(() => callback(performance.now()), 16);
};
const cancelAnimationFrameMock = (id: number) => {
  clearTimeout(id);
};

describe('BugSquash Game', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', requestAnimationFrameMock);
    vi.stubGlobal('cancelAnimationFrame', cancelAnimationFrameMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders start screen initially', () => {
    renderWithProviders(<BugSquash />);
    expect(screen.getByText('Bug Squash')).toBeInTheDocument();
    expect(screen.getByText('Start Debugging')).toBeInTheDocument();
  });

  it('starts game when button is clicked', () => {
    renderWithProviders(<BugSquash />);
    const startButton = screen.getByText('Start Debugging');

    act(() => {
      fireEvent.click(startButton);
    });

    // Score should be visible (0)
    expect(screen.getByText('0')).toBeInTheDocument();
    // Start button should be gone
    expect(screen.queryByText('Start Debugging')).not.toBeInTheDocument();
  });

  it('toggles the pause overlay', () => {
    renderWithProviders(<BugSquash />);
    act(() => {
      fireEvent.click(screen.getByText('Start Debugging'));
    });

    const pauseButton = screen.getByRole('button', { name: /pause/i });
    act(() => {
      fireEvent.click(pauseButton);
    });
    expect(screen.getByText('PAUSED')).toBeInTheDocument();

    act(() => {
      fireEvent.click(pauseButton);
    });
    expect(screen.queryByText('PAUSED')).not.toBeInTheDocument();
  });

  it('ends the game once health reaches 0, and restart recovers from it', async () => {
    vi.useFakeTimers();
    renderWithProviders(<BugSquash />);

    act(() => {
      fireEvent.click(screen.getByText('Start Debugging'));
    });

    // Health drains by >=0.05/frame (16ms tick) even with zero bugs on
    // screen; 40s of simulated time is comfortably enough to hit 0.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(40000);
    });

    expect(screen.getByText(/ran into a problem and needs to restart/i)).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByText('MANUAL REBOOT'));
    });

    // Restart drops straight back into a fresh, playing round (not the
    // start screen), with health and score reset.
    expect(screen.queryByText(/ran into a problem/i)).not.toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();

    vi.useRealTimers();
  });
});
