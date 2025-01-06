import type { Meta } from '@storybook/react';
import { BlankLayout, SideBarNavitemProps } from '@invana/ui';
import {
  Activity, Compass, Database, Home,
  Network,
  Settings
} from 'lucide-react'


const navigation: SideBarNavitemProps[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Explorer", href: "/explorer", icon: Compass },
  { name: "Modeller", href: "/modeller", icon: Network },
  { name: "Database Connection", href: "/connections", icon: Database },
]

const secondaryNavigation: SideBarNavitemProps[] = [
  { name: "Activity", href: "/activity", icon: Activity },
  { name: "Settings", href: "#", icon: Settings },
]

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Layouts/BlankLayout',
  component: BlankLayout,
  parameters: {
    layout: 'centered',
  },
  // tags: ['autodocs'],
  args: {
    logo: <Compass className='h-4 w-4' />,
    sideBarTopNavitems: navigation,
    sideBarBottomNavitems: secondaryNavigation,
    children: <div>Main Content here</div>,
  },
} satisfies Meta<typeof BlankLayout>;

export default meta;
// type Story = StoryObj<typeof meta>;
