import type { ReactNode, CSSProperties } from "react";
import { Node, Edge, NodeTypes, EdgeTypes, ReactFlowProps as ReactFlowPropsOriginal } from "@xyflow/react"




interface ReactFlowProps extends ReactFlowPropsOriginal {
  defaultNodeOptions?: Partial<Node>;
}

export interface FlowCanvasOptions {
  children?: ReactNode;
  canvas: Omit<ReactFlowProps, "nodes" | "edges">;
  style?: CSSProperties;
  // data
  nodes: Node[];
  edges: Edge[];
  // templates
  extraNodeTypes: NodeTypes;
  extraEdgeTypes?: EdgeTypes;
  // layout
  layoutDirection: "TB" | "LR" | "BT" | "RL";
  debug?: boolean;
}
