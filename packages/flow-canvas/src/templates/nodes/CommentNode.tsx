import React, { memo } from "react";
import { Node, NodeProps } from "@xyflow/react";
import { StickyNoteIcon } from "lucide-react";
import { BaseNodeTemplate } from "@/components/BaseNodeTemplate";
import RenderHTML from "@/components/RenderHTML";
import RenderIconOrImg from "@/components/RenderImageOrIcon";


export type CommentNode = Node<{
  icon: string | React.ReactNode;
  commentText: string;
}>;


const CommentNode = ({ id, data, selected = false }: NodeProps<CommentNode>) => {
  const icon = data.icon ? data.icon : <StickyNoteIcon className="w-4 h-4" />
  return (
    <BaseNodeTemplate selected={selected} id={id} className={"w-[220px] text-card-foreground"} >
      {<RenderIconOrImg icon={icon} />}
      <RenderHTML html={data?.commentText || ""} className={"text-xs"} />
    </BaseNodeTemplate>
  );
};

export default memo(CommentNode);
