import React from "react";
import { BaseNodeTemplate } from "@/components/BaseNodeTemplate";
import { Handle, Node } from "@xyflow/react";
import { defaultFlowCanvasOptions } from "@/app/defaults";
import { computeHandlePositions } from "@/app/utils";


export type BaseNodeProps = Node<{
  label: string;
}>;


export const BaseNode = ({ id, data, selected = false, ...props }: BaseNodeProps) => {
  console.log("BaseNode", id, data, selected, props);
  const { sourcePosition, targetPosition } = computeHandlePositions(defaultFlowCanvasOptions.layoutDirection);

  return (
    <BaseNodeTemplate id={id} selected={selected}>
      <>
        {data.label}
        <Handle type="source" position={props.sourcePosition ?? sourcePosition} />
        <Handle type="target" position={props.targetPosition ?? targetPosition} />
      </>
    </BaseNodeTemplate>
  );
}