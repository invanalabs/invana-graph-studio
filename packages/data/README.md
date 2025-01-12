# Data Manager 



```typescript

import {GraphData } from 'src/'


const graph = new GraphData()

// Create nodes
const node1 = graph.addNode({ id: '1', label: 'Node 1' });
const node2 = graph.addNode({ id: '2', label: 'Node 2' });
const node3 = graph.addNode({ id: '3', label: 'Node 3' });

// Create edges
graph.addEdge({ id: '1-2', from: '1', to: '2', label: 'Edge 1-2' });
graph.addEdge({ id: '2-3', from: '2', to: '3', label: 'Edge 2-3' });
graph.addEdge({ id: '3-1', from: '3', to: '1', label: 'Edge 3-1' });
graph.addEdge({ id: '1-3', from: '1', to: '3', label: 'Edge 1-3' });
graph.addEdge({ id: '2-1', from: '2', to: '1', label: 'Edge 2-1' });






// Event listeners
graph.on('nodeAdded', (node) => {
  console.log('Node added:', node);
});

graph.on('nodeUpdated', (node) => {
  console.log('Node updated:', node);
});

graph.on('nodeDeleted', (node) => {
  console.log('Node deleted:', node);
});

graph.on('edgeAdded', (edge) => {
  console.log('Edge added:', edge);
});

graph.on('edgeUpdated', (edge) => {
  console.log('Edge updated:', edge);
});

graph.on('edgeDeleted', (edge) => {
  console.log('Edge deleted:', edge);
});

```