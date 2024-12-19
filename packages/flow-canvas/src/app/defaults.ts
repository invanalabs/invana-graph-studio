import { FlowCanvasOptions } from "./types"
import { MarkerType } from "@xyflow/react"


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
        proOptions: { hideAttribution: true },
        defaultEdgeOptions: {
            markerEnd: MarkerType.Arrow,
        }
    },
    nodes: [],
    edges: [],
    style: defaultCanvasStyle,
    extraNodeTypes: {},
    extraEdgeTypes: {},
}