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

  it('toggles the pause overlay', () => {
    renderWithProviders(<QuickSync />);
    act(() => {
      fireEvent.click(screen.getByText('Start Working'));
    });

    const pauseButton = screen.getByRole('button', { name: /pause/i });
    act(() => {
      fireEvent.click(pauseButton);
    });
    expect(screen.getByText('OUT OF OFFICE')).toBeInTheDocument();

    act(() => {
      fireEvent.click(pauseButton);
    });
    expect(screen.queryByText('OUT OF OFFICE')).not.toBeInTheDocument();
  });

  it('ends the game on collision with a falling invite', async () => {
    vi.useFakeTimers();
    // Forces every spawn roll to succeed and every invite to spawn at x=5,
    // speed=0.6/frame — deterministic instead of relying on real randomness.
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);
    const { container } = renderWithProviders(<QuickSync />);

    act(() => {
      fireEvent.click(screen.getByText('Start Working'));
    });

    // Align the player with x=5% so the mocked-random invites collide with it.
    act(() => {
      fireEvent.mouseMove(container.firstChild as Element, { clientX: 0.05 * window.innerWidth });
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });

    expect(screen.getByText('Meeting Started!')).toBeInTheDocument();

    randomSpy.mockRestore();
    vi.useRealTimers();
  });
});
