import React from 'react'
import { MenuItem, MenuItemProps } from './menu-item'
import { cn } from "../../lib/utils"

export interface NestedMenuProps {
  menuItems: MenuItemProps[]
}

export const NestedMenu: React.FC<NestedMenuProps> = (props) => {
  console.log("NestedMenu props", props)
  return (
    <nav
      className={cn("w-[240px] p-2 border rounded-lg bg-background shadow-sm")}
      role="menubar"
    >
      <ul className="space-y-0.5" role="menu">
        {props.menuItems.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </ul>
    </nav>
  )
}

