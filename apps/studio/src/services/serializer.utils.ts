import { Node, Edge } from '@xyflow/react'
import { QueryReponseItem } from './types';

interface QueryResult {
  _run_query: {
    data: Array<QueryReponseItem> | QueryReponseItem;
  };
}

export const serializeToGraph = (queryResult: QueryResult): { nodes: Node[], edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  console.log("=====queryResult", queryResult)
  const data = queryResult._run_query.data;
  if (Array.isArray(data)) {
    data.forEach((item, index: number) => {
      if (item.type === 'vertex') {
        nodes.push({
          id: item.id.toString(),
          type: "GenericNode",
          data: {
            label: item.properties.name,
          },
          position: {
            x: 0,
            y: index * 50, // Example positioning logic
          },
        });
      } else if (item.type === 'edge') {
        edges.push({
          id: item.id.toString(),
          source: item.source, // Assuming source and target are part of the edge item
          target: item.target,
          type: item.label,
        });
      }
    });
  }

  return { nodes, edges };
}