import type { Meta, StoryObj } from '@storybook/react';
import "@invana/ui/index.css";
import { SearchInput } from '@invana/ui';




// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/SearchInput',
  component: SearchInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {

  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// // // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {

};