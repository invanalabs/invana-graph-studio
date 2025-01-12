import Graph from 'graphology';
import { ICanvasNode } from './types';



export class GraphData {
  private graph: Graph;

  constructor() {
    this.graph = new Graph();
  }

  // Create a node
  addNode(node: ICanvasNode): void {
    this.graph.addNode(nodeId, attributes);
  }

  // Read a node
  readNode(nodeId: string): object | undefined {
    if (this.graph.hasNode(nodeId)) {
      return this.graph.getNodeAttributes(nodeId);
    }
    return undefined;
  }

  // Update a node
  updateNode(nodeId: string, attributes: object): void {
    if (this.graph.hasNode(nodeId)) {
      this.graph.mergeNodeAttributes(nodeId, attributes);
    } else {
      throw new Error(`Node with id ${nodeId} does not exist.`);
    }
  }

  // Delete a node
  deleteNode(nodeId: string): void {
    if (this.graph.hasNode(nodeId)) {
      this.graph.dropNode(nodeId);
    } else {
      throw new Error(`Node with id ${nodeId} does not exist.`);
    }
  }

  // Create an edge
  addEdge(source: string, target: string, attributes: object = {}): void {
    this.graph.addEdge(source, target, attributes);
  }

  // Read an edge
  readEdge(source: string, target: string): object | undefined {
    if (this.graph.hasEdge(source, target)) {
      return this.graph.getEdgeAttributes(source, target);
    }
    return undefined;
  }

  // Update an edge
  updateEdge(source: string, target: string, attributes: object): void {
    if (this.graph.hasEdge(source, target)) {
      this.graph.mergeEdgeAttributes(source, target, attributes);
    } else {
      throw new Error(`Edge from ${source} to ${target} does not exist.`);
    }
  }

  // Delete an edge
  deleteEdge(source: string, target: string): void {
    if (this.graph.hasEdge(source, target)) {
      this.graph.dropEdge(source, target);
    } else {
      throw new Error(`Edge from ${source} to ${target} does not exist.`);
    }
  }
}

