import { ICanvasEdgeDisplay, ICanvasNodeDisplay } from "./display";

export type IPropertiesData = string | number | boolean | object | IPropertiesData[];


export interface IProperties {
  [key: string]: IPropertiesData
}

export type ICanvasItemID = string;

export interface ICanvasElement {
  id: ICanvasItemID;
  type: string;
  properties: IProperties;
  displayLabel?: string;
}

export interface ICanvasNode extends ICanvasElement, ICanvasNodeDisplay {
  x?: number;
  y?: number;
}

export interface ICanvasEdge extends ICanvasElement, ICanvasEdgeDisplay {
  source: string;
  target: string;
}

export interface ICanvasData {
  nodes: ICanvasNode[];
  edges: ICanvasEdge[];
}
