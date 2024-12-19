import { defaultNodeTypes } from "@/templates/nodes"
import { FlowCanvasOptions } from "./types"
import { MarkerType, Position, ConnectionLineType } from "@xyflow/react"


export const defaultCanvasStyle = {
    width: "100%",
    height: "100vh"
}


export const defaultFlowCanvasOptions: FlowCanvasOptions = {
    canvas: {
        colorMode: "system",
        minZoom: 0.1,
        maxZoom: 4,
        fitView: true,
        fitViewOptions: { padding: .2 },
        proOptions: { hideAttribution: true },
        defaultNodeOptions: {
            position: { x: 0, y: 0 },
            // sourcePosition: Position.Bottom,
            // targetPosition: Position.Top,
        },
        defaultEdgeOptions: {
            markerEnd: MarkerType.ArrowClosed,
        },
        debug: true,
        nodeTypes: defaultNodeTypes
    },
    nodes: [],
    edges: [],
    style: defaultCanvasStyle,
    extraNodeTypes: {},
    extraEdgeTypes: {},
    layoutDirection: "TB"
}