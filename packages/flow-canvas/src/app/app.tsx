import React, { useRef } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  Controls,
  Panel,
} from "@xyflow/react";
import { FlowCanvasOptions } from "./types";
import '@xyflow/react/dist/style.css';
import { defaultFlowCanvasOptions } from "./defaults";
import { addNodeDefaults } from "./utils";
import "../index.css";
import { DevTools } from "@/plugins/toolbars/DevTools";
import { CanvasToolBar } from "@/plugins/toolbars/CanvasToolBar";


const FlowCanvas: React.FC<FlowCanvasOptions> = (options) => {
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
          {options.display?.plugins?.miniMap && <MiniMap zoomable pannable />}
          {options.display?.plugins?.background && <Background {...options.background} />}
          {options.display?.plugins?.controls && <Controls />}
          {/* {options.display?.plugins?.devTools && <DevTools position="top-left" className="p-0 border rounded shadow-sm" />} */}

          <Panel position="top-left" className="bg-neutral-800 flex items-center 
           text-card-foreground transition-colors"> <CanvasToolBar /> </Panel>
          {options.children}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};


export default FlowCanvas;
