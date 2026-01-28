import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import BugSquash from '../BugSquash';

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
    render(<BugSquash />);
    expect(screen.getByText('Bug Squash')).toBeInTheDocument();
    expect(screen.getByText('Start Debugging')).toBeInTheDocument();
  });

  it('starts game when button is clicked', () => {
    render(<BugSquash />);
    const startButton = screen.getByText('Start Debugging');

    act(() => {
      fireEvent.click(startButton);
    });

    // Score should be visible (0)
    expect(screen.getByText('0')).toBeInTheDocument();
    // Start button should be gone
    expect(screen.queryByText('Start Debugging')).not.toBeInTheDocument();
  });
});
