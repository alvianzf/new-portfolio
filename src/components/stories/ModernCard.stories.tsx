import type { Meta, StoryObj } from '@storybook/react-vite';
import ModernCard from '../ModernCard';

const meta = {
  title: 'Components/ModernCard',
  component: ModernCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof ModernCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p className="text-[var(--text-primary)]">This is a modern card content.</p>,
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'bg-red-500 text-white',
    children: <p>Card with custom classes</p>,
  },
};

export const ComplexContent: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[var(--text-primary)]">Card Title</h3>
        <p className="text-[var(--text-secondary)]">
          This card contains more complex content structure to demonstrate how it handles children.
        </p>
        <button className="px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded">
          Action
        </button>
      </div>
    ),
  },
};
