import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider>
          <div className="h-screen bg-[var(--bg-primary)]">
            <Story />
            <div className="pt-20 px-6">
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dummy Page Content</h1>
              <p className="text-[var(--text-secondary)]">Content to show transparency effects.</p>
            </div>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
