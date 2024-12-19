import type { ReactNode, CSSProperties } from "react";
import { Node, Edge, NodeTypes, EdgeTypes, ReactFlowProps as ReactFlowPropsOriginal } from "@xyflow/react"




interface ReactFlowProps extends ReactFlowPropsOriginal {
    defaultNodeOptions?: Partial<Node>;
  }

export interface FlowCanvasOptions {
    children?: ReactNode;
    canvas: Omit<ReactFlowProps, "nodes" | "edges">;
    nodes: Node[];
    edges: Edge[];
    style?: CSSProperties;
    extraNodeTypes: NodeTypes;
    extraEdgeTypes?: EdgeTypes;
}
