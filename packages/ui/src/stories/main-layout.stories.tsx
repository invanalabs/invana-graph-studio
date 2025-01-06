import type { Meta } from '@storybook/react';
import { MainLayout } from '@invana/ui';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Layouts/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'centered',
  },
  // tags: ['autodocs'],
  args: {
    headerTitle: <div>Main Content here</div>,
    children: <div>Main Content here</div>,
  },
} satisfies Meta<typeof MainLayout>;

export default meta;
// type Story = StoryObj<typeof meta>;
