import Graph from "graphology";


// export interface IGraphBase {

// }


export class GraphBase {

  graph: Graph;

  constructor() {
    this.graph = new Graph();
  }

  public getGraph(): Graph {
    return this.graph;
  }


}