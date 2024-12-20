import FlowCanvas from '@/app/app';
import type { Meta, StoryObj } from '@storybook/react';
import { data } from "./data";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'NodeTemplates/AnnotationNode',
  component: FlowCanvas,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} satisfies Meta<typeof FlowCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;


export const AnnotationNode: Story = {
  args: {
    nodes: data.nodes,
    edges: data.edges,
    layoutDirection: "TB"
  },
};