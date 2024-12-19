import { Node, NodeProps } from "@xyflow/react";
import { BaseNodeTemplate } from "@/components/templates/BaseNode";


type LabeledGroupNode = Node<{
  label: string;
}>;


export const LabeledGroupNode = ({ data, selected }: NodeProps<LabeledGroupNode>) => {
  return (
    <BaseNodeTemplate
      selected={selected}
      className="bg-white bg-opacity-50 h-full rounded-sm overflow-hidden p-0"
    >
      {data.label && (
        <div className="bg-gray-200 w-fit p-2 text-xs rounded-br-sm bg-secondary text-card-foreground" >
          {data.label}
        </div>
      )}
    </BaseNodeTemplate>
  );
}

LabeledGroupNode.displayName = "LabeledGroupNode";