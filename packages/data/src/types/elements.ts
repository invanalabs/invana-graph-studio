import { ICanvasEdgeDisplay, ICanvasNodeDisplay } from "./display";

export type IPropertiesData = string | number | boolean | object | IPropertiesData[];


export interface IProperties {
  [key: string]: IPropertiesData
}

export type ICanvasItemID = string | number;

export interface ICanvasElement {
  id: ICanvasItemID;
  type: string;
  displayLabel: string;
  properties: IProperties;
}

export interface ICanvasNode extends ICanvasElement, ICanvasNodeDisplay {
  x: number;
  y: number;
}

export interface ICanvasEdge extends ICanvasElement, ICanvasEdgeDisplay {
  source: string;
  target: string;
}

export interface IGraphData {
  nodes: ICanvasNode[];
  edges: ICanvasEdge[];
}
