import React from "react";
import { Node, Edge, NodeTypes, EdgeTypes } from "@xyflow/react"


export type FlowCanvasProps = {
    initialNodes: Node[],
    initialEdges?: Edge[],
    children?: React.ReactNode,
    style?: React.CSSProperties,
    extraNodeTypes: NodeTypes
    extraEdgeTypes?: EdgeTypes,
    hideAttribution?: boolean
}
