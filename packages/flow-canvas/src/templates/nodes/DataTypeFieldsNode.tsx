import React, { memo } from "react";
import { Handle, NodeProps, Position, ReactFlowState, useStore, useStoreApi } from "@xyflow/react";
import { BaseNodeTemplate } from "@/components/BaseNodeTemplate";


export type DataField = {
  id: string
  label: string
  data_type: string
}

export type DataTypeFieldsNodeProps = NodeProps & {
  data: {
    label: string
    labelIcon?: React.ReactNode
    fields: DataField[]
  }
}


const DataTypeFieldsNode = ({ id, data, selected = false }: DataTypeFieldsNodeProps) => {
  const store = useStoreApi();
  const nodes = useStore((state: ReactFlowState) => state.nodes);
  const edges = useStore((state: ReactFlowState) => state.edges);
  const { setNodes, setEdges } = store.getState();

  const onMouseOver = (e: React.MouseEvent) => {
    const el = e.currentTarget;
    const nodeId: string = el.getAttribute("data-node-id") || "";
    const handleId: string | null = el.getAttribute("data-handle-id");
    // highlightHandlePathByNodeHandleId(nodeId, handleId, nodes, edges, setNodes, setEdges);
    // https://github.com/wbkd/react-flow/issues/2418
  };

  const onMouseOut = (e: React.MouseEvent) => {
    console.log("onMouseOut", e);
    // resetHandlePathHighlight(nodes, edges, setNodes, setEdges);
  };

  const handleClick = (e: React.MouseEvent) => {
    onMouseOver(e);
  };

  console.log("DataTypeFieldsNode", data);
  const fields = data.fields || [];

  return (
    <BaseNodeTemplate id={id} selected={selected} className="min-w-[240px] p-0">
      <Handle type="source" className="absolute top-5" position={Position.Right} id={id} />
      <Handle type="target" className="absolute top-5" position={Position.Left} id={id} />

      <div className={"bg-zinc-900 rounded-t-sm border-b border-neutral-700 " +
        " p-2 text-sm font-bold"}>{data.label}
      </div>

      <div className="absolute top-10"></div>


      <div>
        {fields && fields.map((field: DataField, index: number) => (
          <div
            className={`p-1 pl-2 pr-2 nodeField relative ${index !== fields.length - 1 ? 'border-b border-neutral-700' : ''}`}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            // id={generateFieldName(id, field.id)}
            onClick={handleClick}
            data-node-id={id}
            data-handle-id={field.id}
            key={"i-" + field.label}
          >
            <div className="flex justify-between text-gray-600 dark:text-gray-400 items-center">
              <div>{field.label}</div>
              <div className="text-xs">{field.data_type}</div>
            </div>
            {/* <Handle type="source" position={Position.Top} id={field.id}/>
                <Handle type="source" position={Position.Bottom} id={field.id}/> */}

            <Handle type="source" position={Position.Right} id={field.id} />
            <Handle type="target" position={Position.Left} id={field.id} />
          </div>
        ))}
      </div>
    </BaseNodeTemplate>
  );
};

export default memo(DataTypeFieldsNode);
