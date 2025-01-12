

import {
  EdgeData, Graph,
  GraphData, ID, NodeData, NodeOptions
} from '@antv/g6';


class GraphService {
  private graph: Graph;

  constructor(graph: Graph) {
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


  updateNodeSettings(nodeSettings: NodeOptions) {

  }

  updateNodeLabelSettings(labelNodeSettings: NodeOptions) {
    // of each label

    // const existingOptions = this.graph.getOptions();

    // const node = this.graph.getNod(nodeSettings.id);
    // if (node) {
    //   this.graph.updateItem(node, {
    //     style: nodeSettings.style,
    //     label: nodeSettings.label,
    //   });
    // }
  }

  addData(data: GraphData) {
    this.graph.addData(data);
    this.graph.render();
  }

  // updateData(data: GraphData) {

  // }

  removeData(dataIds: { nodes: ID[], edges: ID[], combos: ID[] }) {
    if (dataIds.edges) this.graph.removeEdgeData(dataIds.edges);
    if (dataIds.nodes) this.graph.removeNodeData(dataIds.nodes);
    if (dataIds.combos) this.graph.removeComboData(dataIds.combos);
    this.graph.render();
  }

  updateNodeData(nodes: NodeData[]) {
    this.graph.updateNodeData(nodes);
    this.graph.render();
  }

  setGraphData(data: { nodes: NodeData[]; edges: EdgeData[] }) {
    this.graph.setData(data);
    this.graph.render();

  }
}

export default GraphService;
