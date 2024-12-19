import type { ReactNode, CSSProperties } from "react";
import { Node, Edge, NodeTypes, EdgeTypes, ReactFlowProps } from "@xyflow/react"




export interface FlowCanvasOptions {
    children?: ReactNode;
    canvas: Omit<ReactFlowProps, "nodes" | "edges" | "onNodesChange">;
    nodes: Node[];
    edges: Edge[];
    style?: CSSProperties;
    extraNodeTypes: NodeTypes;
    extraEdgeTypes?: EdgeTypes;
}
