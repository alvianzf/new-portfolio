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

  it('renders the page heading', async () => {
    renderWithProviders(<Blog />);
    expect(await screen.findByRole('heading', { name: /Latest Thoughts/i })).toBeInTheDocument();
  });

  it('renders blog posts after fetch', async () => {
    renderWithProviders(<Blog />);

    await waitFor(() => {
      // Posts render in both the card grid and the All Posts sidebar
      expect(screen.getAllByText('Test Post 1').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Test Post 2').length).toBeGreaterThan(0);
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
