import type { Meta, StoryObj } from '@storybook/react-vite';
import RunawayButton from '../games/RunawayButton';

const meta = {
  title: 'Games/RunawayButton',
  component: RunawayButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onAttempt: { action: 'attempt' },
  },
  decorators: [
    (Story) => (
      <div className="w-[500px] h-[500px] relative border border-dashed border-slate-300 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RunawayButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onAttempt: () => console.log('Attempt to click!'),
  },
};

export const Frozen: Story = {
  args: {
    onAttempt: () => console.log('Attempt on frozen button!'),
    frozen: true,
  },
};
