import React, { useCallback, useRef, useState } from "react";
import {
    ReactFlow,
    ReactFlowProvider,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Position
  } from "@xyflow/react";
import { FlowCanvasProps } from "./types";
import '@xyflow/react/dist/style.css';
import { defaultCanvasStyle } from "./defaults";
  
  
const FlowCanvas = ({
    children,
    initialNodes = [],
    initialEdges = [],
    style = defaultCanvasStyle,
    extraNodeTypes = {},
    extraEdgeTypes = {},
    // canvasSettings = defaultCanvasSettings,
    // hideAttribution = false,
    ...props
  }: FlowCanvasProps) => {
    console.log("==FlowCanvas canvasSettings", props ,extraNodeTypes, extraEdgeTypes);
  
    const ref = useRef<HTMLDivElement>(null);
  
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes.map(node => ({
      ...node,
      position: {
        x: node.position.x ? node.position.x : 0,
        y: node.position.y ? node.position.y : 0,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      },
    })));
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
    return (
      <div style={style}>
        <ReactFlowProvider fitView>
          <ReactFlow
            ref={ref}
            nodes={nodes}
            edges={edges}
            colorMode={'system'}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            minZoom={0.1}
            attributionPosition="top-right"
            proOptions={{ hideAttribution: true }}
          >
            <MiniMap zoomable pannable />
            <Background />
            <Controls />
  
            {children}
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    );
  };
  
  
  export default FlowCanvas;
  