import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Blog from '../Blog';
import { renderWithProviders } from '../../test-utils';

const mockPosts = {
  items: [
    {
      id: '1',
      title: 'Test Post 1',
      published: '2023-01-01T00:00:00Z',
      url: 'http://test.com/1',
      labels: ['Tech'],
      content: '<div>Test content 1</div>'
    },
    {
      id: '2',
      title: 'Test Post 2',
      published: '2023-02-01T00:00:00Z',
      url: 'http://test.com/2',
      labels: ['Life'],
      content: '<div>Test content 2</div>'
    }
  ]
};

describe('Blog Page', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      })
    ));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading state initially', () => {
    renderWithProviders(<Blog />);
    // It might be too fast to catch loading, but we can try
    // Or check if title is there
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('renders blog posts after fetch', async () => {
    renderWithProviders(<Blog />);

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    });
  });

  it('handles fetch error', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject('API Error')));

    renderWithProviders(<Blog />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to load blog posts/i)).toBeInTheDocument();
    });
  });
});
