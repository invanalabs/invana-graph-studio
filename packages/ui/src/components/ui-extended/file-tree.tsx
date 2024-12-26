"use client"

import * as React from "react"
import { ChevronRight, Folder } from 'lucide-react'
import { cn } from "@/lib/utils"

interface TreeItem {
  id: string
  label: string
  icon?: React.ReactNode
  children?: TreeItem[]
}

interface FileTreeProps {
  items?: TreeItem[]
}


export function FileTree({ items = [] }: FileTreeProps) {
  /*
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

    */
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-72">
      <div className="p-2">
        <h2 className="text-lg font-semibold px-2 py-1">Left Side</h2>
        <div className="space-y-1">
          {items.map((item) => (
            <TreeNode key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TreeNode({ item }: { item: TreeItem }) {
  const [isExpanded, setIsExpanded] = React.useState(true)
  const hasChildren = item.children && item.children.length > 0

  return (
    <div>
      <button
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
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
        {hasChildren && <Folder className="h-4 w-4 shrink-0 text-yellow-500" />}
        <span className="truncate">{item.label}</span>
      </button>
      {hasChildren && isExpanded && (
        <div className="ml-4 border-l pl-2">
          {item.children?.map((child) => (
            <TreeNode key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  )
}

