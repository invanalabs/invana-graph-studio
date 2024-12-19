import { Node } from "@xyflow/react"



export const addNodeDefaults = (node: Node, nodeDefaults: Partial<Node>) => {
    const defaultPosition = nodeDefaults?.position;
    const defaultSourcePosition = nodeDefaults.sourcePosition;
    const defaultTargetPosition = nodeDefaults.targetPosition;

    delete nodeDefaults.position;
    delete nodeDefaults.sourcePosition;
    delete nodeDefaults.targetPosition;
    return {
      ...node,
      position: {
        x: node.position.x ?? defaultPosition?.x ?? 0,
        y: node.position.y ?? defaultPosition?.y ?? 0,
      },
      sourcePosition: node.sourcePosition ?? defaultSourcePosition,
      targetPosition: node.targetPosition ?? defaultTargetPosition,
      ...nodeDefaults
    }
  }