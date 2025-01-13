

import {
  EdgeData, Graph,
  GraphData, ID, NodeData, NodeOptions
} from '@antv/g6';
import { GraphDataStore, ICanvasNode, ICanvasEdge } from '@invana/data-store'


class GraphStore {
  private graph: Graph;
  dataStore: GraphDataStore;

  constructor(graph: Graph, dataStore: GraphDataStore) {
    this.graph = graph;
    this.dataStore = dataStore ? dataStore : new GraphDataStore();
    this.initDataListeners();
  }

  /** Set theme */
  setTheme(theme: 'light' | 'dark') {
    this.graph.setOptions({ theme });
    // const themeConfig = theme === 'light'
    //   ? { defaultNode: { style: { fill: '#fff', stroke: '#000' } } }
    //   : { defaultNode: { style: { fill: '#333', stroke: '#fff' } } };

    // this.graph.updateItem('global', themeConfig);
    // this.graph.refresh();
  }


  initDataListeners() {

    // node
    this.dataStore.graph.on('nodeAdded', (nodeKey) => {
      console.log(`Node created: ${nodeKey}`);
    });

    this.dataStore.graph.on('nodeDropped', (nodeKey) => {
      console.log(`Node deleted: ${nodeKey}`);
    });

    this.dataStore.graph.on('nodeAttributesUpdated', (nodeKey) => {
      console.log(`Node updated: ${nodeKey}`);
    });

    // edge
    this.dataStore.graph.on('edgeAdded', ({ key, source, target, attributes }) => {
      console.log(`Edge created: ${key}, from ${source} to ${target}: attributes: ${JSON.stringify(attributes)}`);
    });

    this.dataStore.graph.on('edgeDropped', (edgeKey) => {
      console.log(`Edge deleted: ${edgeKey}`);
    });

    this.dataStore.graph.on('edgeAttributesUpdated', (edgeKey) => {
      console.log(`Edge updated: ${edgeKey}`);
    });

    // graph
    this.dataStore.graph.on('cleared', () => {
      console.log(`Graph cleared`);
    });


  }

  // addData(data: GraphData) {
  //   this.graph.addData(data);
  //   this.graph.render();
  // }

  // updateData(data: GraphData) {

  // }

  // removeData(dataIds: { nodes: ID[], edges: ID[], combos: ID[] }) {
  //   if (dataIds.edges) this.graph.removeEdgeData(dataIds.edges);
  //   if (dataIds.nodes) this.graph.removeNodeData(dataIds.nodes);
  //   if (dataIds.combos) this.graph.removeComboData(dataIds.combos);
  //   this.graph.render();
  // }

  // updateNodeData(nodes: NodeData[]) {
  //   this.graph.updateNodeData(nodes);
  //   this.graph.render();
  // }

  // setGraphData(data: { nodes: NodeData[]; edges: EdgeData[] }) {
  //   this.graph.setData(data);
  //   this.graph.render();

  // }
}

export default GraphStore;
