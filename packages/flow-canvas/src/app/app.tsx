import React, { useRef } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import { FlowCanvasOptions } from "./types";
import '@xyflow/react/dist/style.css';
import { defaultFlowCanvasOptions } from "./defaults";
import { addNodeDefaults } from "./utils";


const FlowCanvas = (options: FlowCanvasOptions) => {
  console.log("FlowCanvas options", options);
  options = { ...defaultFlowCanvasOptions, ...options };
  options.canvas.nodeTypes = { ...options.canvas.nodeTypes, ...options.extraNodeTypes };
  const ref = useRef<HTMLDivElement>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(options.nodes.map(
    node => addNodeDefaults(node, options.canvas.defaultNodeOptions || {}, options.layoutDirection || "TB")
  ));
  const [edges, setEdges, onEdgesChange] = useEdgesState(options?.edges || []);


  return (
    <div style={options.style}>
      <ReactFlowProvider fitView>
        <ReactFlow
          ref={ref}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodes={nodes}
          edges={edges}
          {...(options.canvas ? Object.fromEntries(
            Object.entries(options.canvas).filter(([key]) => key !== 'defaultNodeOptions')
          ) : {})}
        >
          <MiniMap zoomable pannable />
          <Background />
          {/* <Controls /> */}

          {options.children}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};


export default FlowCanvas;
