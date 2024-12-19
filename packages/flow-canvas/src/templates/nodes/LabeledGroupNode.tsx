import React, { memo } from "react";
import { Node, NodeProps } from "@xyflow/react";
import { BaseNodeTemplate } from "@/components/BaseNodeTemplate";


export type LabeledGroupNode = Node<{
  label: string;
}>;


const LabeledGroupNode = ({ id, data, selected = false }: NodeProps<LabeledGroupNode>) => {
  console.log("LabelGroupNode", id, data, selected);
  return (
    <BaseNodeTemplate id={id} selected={selected}
      className="bg-white !text-left !bg-opacity-50 h-full rounded-sm overflow-hidden p-0">
      {data.label && (
        <div className="bg-neutral-600 border-r border-b border-neutral-700 w-fit p-2 text-xs rounded-br-sm text-card-foreground">
          {data.label}
        </div>
      )}
    </BaseNodeTemplate>
  );
}

export default memo(LabeledGroupNode); 