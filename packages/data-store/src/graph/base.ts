import Graph from "graphology";


// export interface IGraphBase {

// }


export class GraphBase {

  data: Graph;

  constructor() {
    this.data = new Graph();
  }

  public getGraph(): Graph {
    return this.data;
  }


}