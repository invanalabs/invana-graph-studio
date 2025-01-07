import type { Meta } from '@storybook/react';
import { BlankLayout } from '@invana/ui';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Layouts/BlankLayout2',
  component: BlankLayout,
  parameters: {
    layout: 'centered',
  },
  // tags: ['autodocs'],
  args: {
    children: <div>Main Content here</div>,
  },
} satisfies Meta<typeof BlankLayout>;

export default meta;
// type Story = StoryObj<typeof meta>;
