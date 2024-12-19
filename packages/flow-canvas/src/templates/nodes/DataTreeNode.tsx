import React, { memo } from "react";
import { Handle, NodeProps, Position, ReactFlowState, useStore, useStoreApi } from "@xyflow/react";
import { BaseNodeTemplate } from "@/components/BaseNodeTemplate";
import { useState } from "react";
import { File, Folder, FolderOpen } from "lucide-react";


export type DataField = {
  id: string
  label: string
  data_type: string
}

export type DataTreeNodeProps = NodeProps & {
  data: {
    label: string
    labelIcon?: React.ReactNode
    fields: DataField[]
  }
}


const DataTreeNode = ({ id, data, selected = false }: DataTreeNodeProps) => {

  console.log("DataTreeNode", data);
  const fields = data.fields || [];

  const [collapsed, setCollapsed] = useState(false);

  return (
    <BaseNodeTemplate id={id} selected={selected} className="min-w-[240px] p-0">
      <Handle type="source" className="absolute top-5" position={Position.Right} id={id} />
      <Handle type="target" className="absolute top-5" position={Position.Left} id={id} />

      <div className={"bg-zinc-900 rounded-t-sm border-b border-neutral-700 " +
        " p-2 text-sm font-bold"}>{data.label}
      </div>

      <div>
        <div
          className="cursor-pointer p-1 pl-2 pr-2 nodeField relative border-b border-neutral-700"
          onClick={() => setCollapsed(!collapsed)}
        >
          <div className="flex text-gray-600 dark:text-gray-400 items-center">
            <span className="mr-2">
              {collapsed ? (
                <Folder className="h-4 w-4" />
              ) : (
                <FolderOpen className="h-4 w-4" />
              )}
            </span>
            <div>{data.label}</div>
            {/* <div className="text-xs flex  "></div> */}
            {/* {collapsed ? "Expand" : "Collapse"} */}

          </div>
        </div>
      </div>
      {!collapsed && fields && fields.map((field: DataField, index: number) => (
        <div
          className={`p-1 ml-6 pl-2 pr-2 nodeField relative ${index !== fields.length - 1 ? 'border-b border-neutral-700' : ''}`}
          data-node-id={id}
          data-handle-id={field.id}
          key={"i-" + field.label}
        >
          <div className="flex   text-gray-600 dark:text-gray-400 items-center">
            <span className="mr-2"><File className="h-4 w-4" /></span>
            <div> {field.label} </div>
          </div>
          <Handle type="source" position={Position.Right} id={field.id} />
          <Handle type="target" position={Position.Left} id={field.id} />
        </div>
      ))}



    </BaseNodeTemplate >
  );
};

export default memo(DataTreeNode);
