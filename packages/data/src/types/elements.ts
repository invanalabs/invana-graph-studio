

export type IPropertiesData = string | number | boolean | object | IPropertiesData[];


export interface IProperties {
  [key: string]: IPropertiesData
}

export interface ICanvasElement {
  id: string;
  type: string;
  displayLabel: string;
  properties: IProperties[];
}

export interface ICanvasNode extends ICanvasElement {
  x: number;
  y: number;
}

export interface ICanvasEdge extends ICanvasElement {
  source: string;
  target: string;
}

export interface IGraphData {
  nodes: ICanvasNode[];
  edges: ICanvasEdge[];
}
