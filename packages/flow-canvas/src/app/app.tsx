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
import "../index.css";
import { DevTools } from "@/plugins/DevTools";


const FlowCanvas = (options: FlowCanvasOptions) => {
  console.log("FlowCanvas options", options);
  options = { ...defaultFlowCanvasOptions, ...options };
  // options.canvas.nodeTypes = { ...options.canvas.nodeTypes, ...options.extraNodeTypes };
  // options.canvas.nodeTypes = options.canvas.nodeTypes

  console.log("FlowCanvas options2", options);
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
          <Background {...options.background} />
          {/* <Controls /> */}


          {options.debug && <DevTools />}
          {options.children}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};


export default FlowCanvas;
