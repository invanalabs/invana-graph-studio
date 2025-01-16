

import {
  Graph
} from '@antv/g6';
import { GraphStore } from '@invana/data-store/index'
import { convert_icanvas_edge_to_g6_edge, convert_icanvas_node_to_g6_node } from './utils';


export class GraphManager {

  g6graph!: Graph;
  graphStore: GraphStore;

  constructor(g6graph: Graph, graphStore?: GraphStore) {
    this.g6graph = g6graph;
    this.graphStore = graphStore ? graphStore : new GraphStore();
    this.initDataListeners();
  }

  getGraph(): Graph {
    return this.g6graph;
  }

  setGraph(g6graph: Graph) {
    this.g6graph = g6graph;
  }

  /** Set theme */
  setTheme(theme: 'light' | 'dark') {
    this.g6graph.setOptions({ theme });
    // const themeConfig = theme === 'light'
    //   ? { defaultNode: { style: { fill: '#fff', stroke: '#000' } } }
    //   : { defaultNode: { style: { fill: '#333', stroke: '#fff' } } };

    // this.g6graph.updateItem('global', themeConfig);
    // this.g6graph.refresh();
  }


  initDataListeners() {

    // node
    this.graphStore.data.on('nodeAdded', ({ key }) => {
      // console.log(`Node created: ${key}`);
      const node = this.graphStore.fineNodeById(key);
      // console.log("node", node);
      if (node) {
        const g6Node = convert_icanvas_node_to_g6_node(node);
        // console.log("g6Node", g6Node);
        this.g6graph.addNodeData([g6Node])
      }
    });

    this.graphStore.data.on('nodeDropped', (nodeKey) => {
      console.log(`Node deleted: ${nodeKey}`);
    });

    this.graphStore.data.on('nodeAttributesUpdated', (nodeKey) => {
      console.log(`Node updated: ${nodeKey}`);
    });

    // edge
    this.graphStore.data.on('edgeAdded', ({ key }) => {
      // console.log(`Edge created: ${key}`);
      const edge = this.graphStore.fineEdgeById(key);
      // console.log("edge", edge);
      if (edge) {
        const g6Edge = convert_icanvas_edge_to_g6_edge(edge);
        // console.log("g6Edge", g6Edge);
        this.g6graph.addEdgeData([g6Edge])
      }


    });

    this.graphStore.data.on('edgeDropped', (edgeKey) => {
      console.log(`Edge deleted: ${edgeKey}`);
    });

    this.graphStore.data.on('edgeAttributesUpdated', (edgeKey) => {
      console.log(`Edge updated: ${edgeKey}`);
    });

    // g6graph
    this.graphStore.data.on('cleared', () => {
      console.log(`Graph cleared`);
    });
  }




  // updateData(data: GraphData) {

  // }

  // removeData(dataIds: { nodes: ID[], edges: ID[], combos: ID[] }) {
  //   if (dataIds.edges) this.g6graph.removeEdgeData(dataIds.edges);
  //   if (dataIds.nodes) this.g6graph.removeNodeData(dataIds.nodes);
  //   if (dataIds.combos) this.g6graph.removeComboData(dataIds.combos);
  //   this.g6graph.render();
  // }

  // updateNodeData(nodes: NodeData[]) {
  //   this.g6graph.updateNodeData(nodes);
  //   this.g6graph.render();
  // }

  // setGraphData(data: { nodes: NodeData[]; edges: EdgeData[] }) {
  //   this.g6graph.setData(data);
  //   this.g6graph.render();

  // }
}

export default GraphStore;
