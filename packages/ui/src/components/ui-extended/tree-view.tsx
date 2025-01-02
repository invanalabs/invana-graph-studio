"use client"
import * as React from "react"
import { ChevronRight } from 'lucide-react'
import { cn } from "../../lib/utils"

export interface TreeItem {
  id: string | number
  label: string
  icon?: React.ReactElement<React.ComponentProps<'svg'>> | React.ReactNode
  onClick?: (id: string | number, label: string) => void
  children?: TreeItem[]
}

export interface TreeViewProps {
  style?: React.CSSProperties,
  className?: string,
  items: TreeItem[]
}


export function TreeView(props: TreeViewProps) {
  /*
  const exampleData: TreeItem[] = [
    {
      id: "1",
      label: "Root 1",
      icon: <Folder className="h-4 w-4 shrink-0 text-yellow-500" />,
      children: [
        {
          id: "1-1",
          label: "Child 1-1",
          icon: <Folder className="h-4 w-4 shrink-0 text-yellow-500" />,
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
      icon: <Folder className="h-4 w-4 shrink-0 text-yellow-500" />,
      children: [
        { id: "2-1", label: "Child 2-1" },
        { id: "2-2", label: "Child 2-2" }
      ]
    }
  ]

    */
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm w-[240px]", props.className)}
      style={props.style} >
      <div className="p-3">
        {/* <h2 className="text-lg font-semibold px-2 mb-2">Left Side</h2> */}
        <div className="space-y-0.5">
          {props.items.map((item) => (
            <TreeItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TreeItem({ item }: { item: TreeItem }) {
  const [isExpanded, setIsExpanded] = React.useState(true)
  const hasChildren = item.children && item.children.length > 0

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) { setIsExpanded(!isExpanded); }
          item.onClick?.(item.id, item.label);
        }}
        className={cn(
          "flex items-center gap-2 w-full rounded-sm px-2 py-1 hover:bg-accent hover:text-accent-foreground",
          hasChildren && "cursor-pointer font-medium"
        )}
      >
        {hasChildren && (
          <ChevronRight
            className={cn("h-4 w-4 shrink-0 transition-transform",
              isExpanded && "rotate-90"
            )}
          />
        )}
        {item.icon}
        <span className="truncate">{item.label}</span>
      </button>
      {hasChildren && isExpanded && (
        <div className="ml-4 pl-4 relative">
          <div className="absolute left-0 top-0 bottom-0 border-l border-muted-foreground/25" />
          {item.children?.map((child, index) => (
            <div key={child.id} className="relative">
              <div className="absolute -left-4 top-[15px] w-4 border-t border-muted-foreground/25" />
              <TreeItem key={index} item={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

