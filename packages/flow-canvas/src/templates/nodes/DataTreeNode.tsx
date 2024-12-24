import React, { memo } from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { BaseNodeTemplate } from "@/components/BaseNodeTemplate";
import { useState } from "react";
import { File, Folder, FolderOpen } from "lucide-react";


export type DataField = {
  id: string
  label: string
  icon?: React.ReactNode
  // data_type?: string
  fields?: DataField[]
  isChild?: boolean
}

export type DataTreeNodeProps = NodeProps & {
  data: {
    label: string
    icon?: React.ReactNode
    fields: DataField[]
  }
}



export const DataTreeNodeLet = ({ id, label, fields = [], isChild = false, ...props }: DataField) => {
  console.log("DataTreeNodeLet", id, label, fields, props, isChild);
  const [collapsed, setCollapsed] = useState(false);

  return <div className={`p-0 ${isChild ? 'ml-6' : ''}`}>

    <div
      className="p-1 pl-2 pr-2 text-sm nodeField relative border-l border-neutral-700"
      onClick={() => setCollapsed(!collapsed)}
    >
      <div className="flex text-gray-600 dark:text-gray-400 items-center">
        <Handle type="source" className="absolute bg-neutral-600 border-neutral-800  rounded-[2px] z-[1000] w-[1px] h-[1px]" position={Position.Right} id={id} />
        <Handle type="target" className="absolute bg-neutral-600 border-neutral-800  rounded-[2px] z-[1000] w-[1px] h-[1px]" position={Position.Left} id={id} />

        <span className="mr-2">
          {collapsed ? (
            <Folder className="h-4 w-4" />
          ) : (
            <FolderOpen className="h-4 w-4" />
          )}
        </span>
        <div>{label}</div>
      </div>
    </div>
    {/* fields  */}
    {!collapsed && fields && fields.map((field: DataField, index: number) => (
      field.fields ? (
        <DataTreeNodeLet id={id} label={field.label} fields={field.fields} isChild={true} key={"i-" + field.label} />
      ) : (
        <div
          className={`p-1 ml-6 pl-2 pr-2 nodeField relative border-l border-neutral-700 ${index !== fields.length - 1 ? ' border-neutral-700' : ''}`}
          data-node-id={id}
          data-handle-id={field.id}
          key={"i-" + field.label}
        >
          <div className="flex text-sm text-gray-600 dark:text-gray-400 items-center">
            <span className="mr-2"><File className="h-4 w-4" /></span>
            <div> {field.label} </div>
          </div>
          <Handle type="source" className="bg-neutral-600 border-neutral-800 rounded-[2px] w-[1px] h-[1px]" position={Position.Right} id={field.id} />
          <Handle type="target" className="bg-neutral-600 border-neutral-800 rounded-[2px] w-[1px] h-[1px]" position={Position.Left} id={field.id} />
        </div>
      )
    ))}
  </div>

}


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

      <DataTreeNodeLet id={id} label={data.label} fields={data.fields} />

    </BaseNodeTemplate >
  );
};

export default memo(DataTreeNode);
