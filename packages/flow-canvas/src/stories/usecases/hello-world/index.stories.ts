import FlowCanvas from '@/app/app';
import type { Meta, StoryObj } from '@storybook/react';
import { data  } from "./data";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Use Cases/SimpleStory',
  component: FlowCanvas,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FlowCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;


export const SimpleStory: Story = {
  args: {
    initialNodes: data.nodes,
    initialEdges: data.edges,
  },
};