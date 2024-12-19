import React from "react";
import { BaseNodeTemplate } from "@/components/BaseNodeTemplate";
import { Handle, Node, NodeResizer } from "@xyflow/react";
import { defaultFlowCanvasOptions } from "@/app/defaults";
import { computeHandlePositions } from "@/app/utils";


export type BaseNodeProps = Node<{
  label: string;
}>;


export const GenericNode = ({ id, data, selected = false, ...props }: BaseNodeProps) => {
  console.log("GenericNode", id, data, selected, props);
  const { sourcePosition, targetPosition } = computeHandlePositions(defaultFlowCanvasOptions.layoutDirection);

  return (
    <BaseNodeTemplate id={id} selected={selected} className="min-w-[200px] text-center">
      <>
        {/* <NodeResizer minWidth={100} minHeight={30} /> */}

        {data.label}
        <Handle type="source" position={props.sourcePosition ?? sourcePosition} />
        <Handle type="target" position={props.targetPosition ?? targetPosition} />
      </>
    </BaseNodeTemplate>
  );
}