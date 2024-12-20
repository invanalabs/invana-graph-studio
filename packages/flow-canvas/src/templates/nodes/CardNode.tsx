import React, { memo } from "react";
import { Node, NodeProps } from "@xyflow/react";
import { BaseNodeTemplate } from "@/components/BaseNodeTemplate";
import RenderHTML from "@/components/RenderHTML";
import RenderIconOrImg from "@/components/RenderImageOrIcon";


export type CardNodeProps = Node<{
  label: string;
  icon?: string | React.ReactNode;
  body: string | React.ReactNode;
}>;


const CardNode = ({ id, data, selected = false }: NodeProps<CardNodeProps>) => {
  console.log("CardNode", data)
  return (
    <BaseNodeTemplate
      selected={selected}
      id={id}
      className="min-w-[240px] text-card-foreground"
    >
      <div className="flex items-center mb-2 border-b pb-2 border-b border-gray-600 dark:border-gray-300 ">
        {data?.icon && <RenderIconOrImg icon={data.icon} />} <strong className="ml-1">{data.label}</strong>
      </div>
      <RenderHTML html={data.body} />
    </BaseNodeTemplate>
  );
};

export default memo(CardNode);
