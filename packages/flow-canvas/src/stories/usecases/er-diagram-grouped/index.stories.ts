import type { Meta, StoryObj } from '@storybook/react';
import { data } from "./data";
import FlowCanvas from '../../../app/app';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Use Cases/ERDriagramGrouped',
  component: FlowCanvas,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FlowCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;


export const ERDriagramGrouped: Story = {
  args: {
    nodes: data.nodes,
    edges: data.edges
  },
};