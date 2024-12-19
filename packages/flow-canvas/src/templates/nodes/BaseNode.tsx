import React from "react";
import { BaseNodeTemplate } from "@/components/templates/BaseNode";
import { Handle, Node } from "@xyflow/react";
import { defaultFlowCanvasOptions } from "@/app/defaults";
import { computeHandlePositions } from "@/app/utils";


type BaseNodeProps = Node<{
  label: string;
}>;


export const BaseNode = ({ id, data, selected = false, ...props }: BaseNodeProps) => {
  console.log("BaseNode", id, data, selected, props);
  const { sourcePosition, targetPosition } = computeHandlePositions(defaultFlowCanvasOptions.layoutDirection);

  return (
    <BaseNodeTemplate>
      <>
        {data.label}
        <Handle type="source" position={props.sourcePosition ?? sourcePosition} />
        <Handle type="target" position={props.targetPosition ?? targetPosition} />
      </>
    </BaseNodeTemplate>
  );
}