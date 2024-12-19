import React, { memo } from "react";
import { Node, NodeProps } from "@xyflow/react";
import { BaseNodeTemplate } from "@/components/BaseNodeTemplate";


export type LabeledGroupNode = Node<{
  label: string;
}>;


const LabeledGroupNode = ({ id, data, selected }: NodeProps<LabeledGroupNode>) => {
  console.log("LabelGroupNode", id, data, selected);
  return (
    <BaseNodeTemplate id={id} selected={selected}
      className="bg-white text-left bg-opacity-50 h-full rounded-sm overflow-hidden p-0">
      Hello LabeledGroupNode
      {/* {data.label && (
        <div className="bg-gray-200 w-fit p-2 text-xs rounded-br-sm bg-secondary text-card-foreground" >
          {data.label}
        </div>
      )} */}
    </BaseNodeTemplate>
  );
}

export default memo(LabeledGroupNode); 