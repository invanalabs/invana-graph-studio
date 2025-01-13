

import {
  Graph
} from '@antv/g6';
import { GraphStore } from '@invana/data-store'


export class GraphManager {

  private graph: Graph;
  graphStore: GraphStore;

  constructor(graph: Graph, graphStore?: GraphStore) {
    this.graph = graph;
    this.graphStore = graphStore ? graphStore : new GraphStore();
    this.initDataListeners();
  }

  setGraph(graph: Graph) {
    this.graph = graph;
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
    this.graphStore.data.on('nodeAdded', (nodeKey) => {
      console.log(`Node created: ${nodeKey}`);
    });

    this.graphStore.data.on('nodeDropped', (nodeKey) => {
      console.log(`Node deleted: ${nodeKey}`);
    });

    this.graphStore.data.on('nodeAttributesUpdated', (nodeKey) => {
      console.log(`Node updated: ${nodeKey}`);
    });

    // edge
    this.graphStore.data.on('edgeAdded', ({ key, source, target, attributes }) => {
      console.log(`Edge created: ${key}, from ${source} to ${target}: attributes: ${JSON.stringify(attributes)}`);
    });

    this.graphStore.data.on('edgeDropped', (edgeKey) => {
      console.log(`Edge deleted: ${edgeKey}`);
    });

    this.graphStore.data.on('edgeAttributesUpdated', (edgeKey) => {
      console.log(`Edge updated: ${edgeKey}`);
    });

    // graph
    this.graphStore.data.on('cleared', () => {
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
