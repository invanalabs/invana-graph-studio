import React from 'react'
import { MenuItem, MenuItemProps } from './menu-item'

export interface NestedMenuProps {
  menuItems: MenuItemProps[]
}

export function NestedMenu(props: NestedMenuProps) {

  console.log("NestedMenu props", props)
  return (
    <nav
      className="w-[240px] p-2 border rounded-lg bg-background shadow-sm"
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

