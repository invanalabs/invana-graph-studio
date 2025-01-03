import React, { memo } from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { BaseNodeTemplate } from "@/components/BaseNodeTemplate";
import { ChevronRight, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchInput } from "@invana/ui";


export type DataTreeNodeItem = {
  id: string
  label: string
  icon?: React.ReactNode
  children?: DataTreeNodeItem[]
  onClick?: (id: string | number, label: string) => void
  isExpanded?: boolean

}

export type DataTreeNodeProps = NodeProps & {
  data: {
    icon?: React.ReactNode
    label: string
    children: DataTreeNodeItem[]
    searchable?: boolean
  }
}


function DataTreeNodeItem({ item }: { item: DataTreeNodeItem }) {
  const [isExpanded, setIsExpanded] = React.useState(item.isExpanded ?? false)
  const hasChildren = item.children && item.children.length > 0

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) { setIsExpanded(!isExpanded); }
          item.onClick?.(item.id, item.label);
        }}
        className={cn(
          "flex items-center gap-2 w-full rounded-sm px-2 py-1 relative hover:bg-accent hover:text-accent-foreground",
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
        <Handle type="source" className="bg-neutral-600 rounded-[2px] w-[1px] h-[1px]" position={Position.Right} id={item.id} />
        <Handle type="target" className="bg-neutral-600 rounded-[2px] w-[1px] h-[1px]" position={Position.Left} id={item.id} />

      </button>
      {hasChildren && isExpanded && (
        <div className="ml-4 pl-4 relative">
          <div className="absolute left-0 top-0 bottom-0 border-l border-muted-foreground/25" />
          {item.children?.map((child, index) => (
            <div key={child.id} className="relative">
              <div className="absolute -left-4 top-[15px] w-4 border-t border-muted-foreground/25" />
              <DataTreeNodeItem key={index} item={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


const DataTreeNode = ({ id, data, selected = false, ...props }: DataTreeNodeProps) => {
  console.log("DataTreeNode", data, props);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const filterItems = (items: DataTreeNodeItem[], query: string): DataTreeNodeItem[] => {
    if (!query) return items;
    return items
      .map(item => ({
        ...item,
        children: item.children ? filterItems(item.children, query) : [],
      }))
      .filter(item => item.label.toLowerCase().includes(query.toLowerCase()) || (item.children && item.children.length > 0));
  };

  const filteredItems = filterItems(data.children || [], searchQuery);


  return (
    <BaseNodeTemplate id={id} selected={selected} className="min-w-[240px] p-0">
      <div
        className="cursor-pointer relative rounded-t-sm nodeField border-b py-3 px-2
         bg-background">
        <div className="flex text-gray-600 dark:text-gray-400 items-center">
          <Handle type="source" className="absolute top-5 rounded-[2px] z-[1000]" position={Position.Right} id={id} />
          <Handle type="target" className="absolute top-5 rounded-[2px] z-[1000]" position={Position.Left} id={id} />

          <span className="mr-2">
            <FolderOpen className="h-4 w-4" />
          </span>
          <div>{data.label}</div>
        </div>
      </div>

      <div className={"mx-2 my-2"} >
        {data.searchable &&
          <SearchInput value={searchQuery} onChange={setSearchQuery} className={"dark:bg-neutral-800"} />
        }
      </div>

      <div className="space-y-0.5">

        {filteredItems.map((item) => (
          <DataTreeNodeItem key={item.id} item={item} />
        ))}
      </div>
      {/* <DataTreeNodeItem label={data.label} children={data.children} /> */}

    </BaseNodeTemplate >
  );
};

export default memo(DataTreeNode);
