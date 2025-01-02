import type { Meta, StoryObj } from '@storybook/react';
import "@invana/ui/index.css";
import { TreeView, TreeItem } from '@invana/ui';


const exampleData: TreeItem[] = [
  {
    id: "1",
    label: "Root 1",
    children: [
      {
        id: "1-1",
        label: "Child 1-1",
        children: [
          { id: "1-1-1", label: "Grandchild 1-1-1" },
          { id: "1-1-2", label: "Grandchild 1-1-2" }
        ]
      },
      { id: "1-2", label: "Child 1-2" }
    ]
  },
  {
    id: "2",
    label: "Root 2",
    children: [
      { id: "2-1", label: "Child 2-1" },
      { id: "2-2", label: "Child 2-2" }
    ]
  }
]

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/TreeView',
  component: TreeView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    items: exampleData
  },
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    items: exampleData
  },
};
