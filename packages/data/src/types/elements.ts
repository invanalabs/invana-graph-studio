

export type IPropertiesData = string | number | boolean | object | IPropertiesData[];



export interface IProperties {
  [key: string]: IPropertiesData
}

export interface ICanvasElement {
  id: string;
  type: string;
  properties: IProperties[];
}

export interface INode extends ICanvasElement {
  x: number;
  y: number;
}

export interface IEdge extends ICanvasElement {
  source: string;
  target: string;
}

export interface IGraphData {
  nodes: INode[];
  edges: IEdge[];
}
