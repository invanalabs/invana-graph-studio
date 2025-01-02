import React, { memo } from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { BaseNodeTemplate } from "@/components/BaseNodeTemplate";
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";


export type TreeItem = {
  id: string
  label: string
  icon?: React.ReactNode
  children?: TreeItem[]
  onClick?: (id: string | number, label: string) => void
  isExpanded?: boolean

}

export type DataTreeNodeProps = NodeProps & {
  data: {
    label: string
    icon?: React.ReactNode
    children: TreeItem[]
  }
}


function TreeItem({ item }: { item: TreeItem }) {
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
        <Handle type="source" className="bg-neutral-600 border-neutral-800 rounded-[2px] w-[1px] h-[1px]" position={Position.Right} id={item.id} />
        <Handle type="target" className="bg-neutral-600 border-neutral-800 rounded-[2px] w-[1px] h-[1px]" position={Position.Left} id={item.id} />

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

// export const DataTreeNodeLet = ({ id, label, children = [], isChild = false, ...props }: TreeItem) => {
//   console.log("DataTreeNodeLet", id, label, children, props, isChild);
//   const [collapsed, setCollapsed] = useState(false);

//   return <>
//     {/* head */}
//     <div
//       className="cursor-pointer bg-zinc-900 rounded-t-sm p-1 pl-2 pr-2 nodeField relative border-b border-neutral-700"
//       onClick={() => setCollapsed(!collapsed)}
//     >
//       <div className="flex text-gray-600 dark:text-gray-400 items-center">
//         <Handle type="source" className="absolute top-5 rounded-[2px] z-[1000]" position={Position.Right} id={id} />
//         <Handle type="target" className="absolute top-5 rounded-[2px] z-[1000]" position={Position.Left} id={id} />

//         <span className="mr-2">
//           {collapsed ? (
//             <Folder className="h-4 w-4" />
//           ) : (
//             <FolderOpen className="h-4 w-4" />
//           )}
//         </span>
//         <div>{label}</div>
//       </div>
//     </div>
//     {/* children  */}
//     {!collapsed && children && children.map((field: TreeItem, index: number) => (


//       <div
//         className={`p-1 ml-6 pl-2 pr-2 nodeField relative border-l border-neutral-700 ${index !== children.length - 1 ? ' border-neutral-700' : ''}`}
//         data-node-id={id}
//         data-handle-id={field.id}
//         key={"i-" + field.label}
//       >
//         <div className="flex text-sm text-gray-600 dark:text-gray-400 items-center">
//           <span className="mr-2"><File className="h-4 w-4" /></span>
//           <div> {field.label} </div>
//         </div>
//         <Handle type="source" className="bg-neutral-600 border-neutral-800 rounded-[2px] w-[1px] h-[1px]" position={Position.Right} id={field.id} />
//         <Handle type="target" className="bg-neutral-600 border-neutral-800 rounded-[2px] w-[1px] h-[1px]" position={Position.Left} id={field.id} />
//       </div>
//     ))}
//   </>

// }


const DataTreeNode = ({ id, data, selected = false, ...props }: DataTreeNodeProps) => {

  console.log("DataTreeNode", data, props);


  return (
    <BaseNodeTemplate id={id} selected={selected} className="min-w-[240px] p-0">
      {/* <Handle type="source" className="absolute top-5 rounded-[2px] z-[1000]" position={Position.Right} id={id} />
      <Handle type="target" className="absolute top-5 rounded-[2px] z-[1000]" position={Position.Left} id={id} /> */}

      <div
        className="cursor-pointer bg-zinc-900 rounded-t-sm p-1 pl-2 pr-2 nodeField relative border-b border-neutral-700"

      >
        <div className="flex text-gray-600 dark:text-gray-400 items-center">
          <Handle type="source" className="absolute top-5 rounded-[2px] z-[1000]" position={Position.Right} id={id} />
          <Handle type="target" className="absolute top-5 rounded-[2px] z-[1000]" position={Position.Left} id={id} />

          <span className="mr-2">
            <FolderOpen className="h-4 w-4" />
          </span>
          <div>{data.label}</div>
        </div>
      </div>

      <div className="space-y-0.5">
        {data.children.map((item) => (
          <TreeItem key={item.id} item={item} />
        ))}
      </div>
      {/* <TreeItem label={data.label} children={data.children} /> */}

    </BaseNodeTemplate >
  );
};

export default memo(DataTreeNode);
