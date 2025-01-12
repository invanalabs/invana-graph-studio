import { GraphBase } from './base';
import { ICanvasEdge, ICanvasEdgeDisplay, ICanvasItemID, ICanvasNode, ICanvasNodeDisplay, IProperties } from '../types';


export class GraphDataCRUD extends GraphBase {

  // Create a node
  addNode(node: ICanvasNode): void {
    const { id, ...attributes } = node;
    if (this.graph.hasNode(id)) {
      throw new Error(`Node with id ${id} already exist.`);
    }
    this.graph.addNode(id, attributes);
  }

  // Read a node
  readNodeById(id: ICanvasItemID): ICanvasNode | undefined {
    if (this.graph.hasNode(id)) {
      const attributes = this.graph.getNodeAttributes(id);
      return { id, ...attributes } as ICanvasNode
    }
    return undefined;
  }

  // Update a node
  _updateNode(id: ICanvasItemID, attributes: Partial<Omit<ICanvasNode, 'id'>>): void {
    if (!this.graph.hasNode(id)) {
      throw new Error(`Node with id ${id} does not exist.`);
    }
    this.graph.mergeNodeAttributes(id, attributes);
  }

  updateNodeProperties(id: ICanvasItemID, properties: IProperties): void {
    if (!this.graph.hasNode(id)) {
      throw new Error(`Node with id ${id} does not exist.`);
    }
    this._updateNode(id, { properties })
  }

  updateNodePosition(id: ICanvasItemID, x: number, y: number): void {
    if (!this.graph.hasNode(id)) {
      throw new Error(`Node with id ${id} does not exist.`);
    }
    this._updateNode(id, { x, y })
  }

  updateNodeDisplay(id: ICanvasItemID, display: ICanvasNodeDisplay): void {
    if (!this.graph.hasNode(id)) {
      throw new Error(`Node with id ${id} does not exist.`);
    }
    this._updateNode(id, { ...display })
  }

  // Delete a node
  deleteNode(id: ICanvasItemID): void {
    if (!this.graph.hasNode(id)) {
      throw new Error(`Node with id ${id} does not exist.`);
    }
    this.graph.dropNode(id);
  }

  // Create an edge
  addEdge(edge: ICanvasEdge): void {
    const { id, source, target, ...attributes } = edge;
    if (this.graph.hasEdge(id)) {
      throw new Error(`Edge with id ${id} already exist.`);
    }
    this.graph.addEdgeWithKey(id, source, target, attributes);
  }


  // Update an edge
  _updateEdge(id: ICanvasItemID, edge: Partial<Omit<ICanvasEdge, 'id' | 'source' | 'target'>>): void {
    if (!this.graph.hasEdge(id)) {
      throw new Error(`Edge with id ${id} does not exist.`);
    }
    this.graph.updateEdgeAttributes(id, (attributes) => ({
      ...attributes, // Retain existing attributes
      ...edge // Update with new attributes
    }));
  }

  updateEdgeProperties(id: ICanvasItemID, properties: IProperties): void {
    if (!this.graph.hasEdge(id)) {
      throw new Error(`Edge with id ${id} does not exist.`);
    }
    this._updateEdge(id, { properties })
  }

  updateEdgeDisplay(id: ICanvasItemID, display: ICanvasEdgeDisplay): void {
    if (!this.graph.hasEdge(id)) {
      throw new Error(`Edge with id ${id} does not exist.`);
    }
    this._updateEdge(id, { ...display })
  }

  // Read an edge
  readEdgeById(id: ICanvasItemID): ICanvasEdge | undefined {
    if (!this.graph.hasEdge(id)) {
      throw new Error(`Edge with id ${id} does not exist.`);
    }
    const source = this.graph.source(id);
    const target = this.graph.target(id);
    const attributes = this.graph.getEdgeAttributes(id);
    return { id, source, target, ...attributes } as ICanvasEdge;
  }

  // Delete an edge
  deleteEdge(id: ICanvasItemID): void {
    if (!this.graph.hasEdge(id)) {
      throw new Error(`Edge with id ${id} does not exist.`);
    }
    this.graph.dropEdge(id);
  }
}

