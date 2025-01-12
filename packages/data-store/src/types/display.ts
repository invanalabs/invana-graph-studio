
export type IColor = string | number;

export interface ICanvasNodeShapeDisplayBase {
  bgColor: IColor;
  bgOpacity: number;
  bgPadding: number;
  borderColor: IColor;
  BorderWidth: number;
  borderRadius: number;

  dottedBorder: boolean;
  dottedBorderSpacing: number;
}

export interface ICanvasTextDisplay {
  textColor: IColor;
  textSize: number;
  textFont: string;
  textOpacity: number;
}

export interface ICanvasLabelDisplay extends ICanvasNodeShapeDisplayBase, ICanvasTextDisplay { }

export interface ICanvasNodeShapeDisplay extends ICanvasNodeShapeDisplayBase {
  iconFont: string
  iconCode: string;
  iconColor: IColor;
  iconSize: number;
  iconOpacity: number;
  iconRotate: number;
  animated: boolean;
}

export interface ICanvasEdgeShapeDisplay {
  strokeColor: IColor;
  strokeWidth: number;
  strokeOpacity: number;
  strokeArrowheadSize: string;
  strokeArrowheadColor: IColor;
  strokeArrowheadOpacity: number;

  animated: boolean;

  dottedBorder: boolean;
  dottedBorderSpacing: number;
}

export interface ICanvasNodeDisplay {
  shape: ICanvasNodeShapeDisplay;
  label: ICanvasLabelDisplay;
  labelField: string
}

export interface ICanvasEdgeDisplay {
  shape: ICanvasEdgeShapeDisplay;
  label: ICanvasLabelDisplay;
  labelField: string
}

export interface ICanvasBg {
  bgColor?: IColor;
  pattern?: 'lines' | 'dots' | 'crosses';
  patternColor?: IColor;
}

export interface ICanvasDisplay {
  bg: ICanvasBg;
  nodes: ICanvasNodeDisplay[];
  edges: ICanvasEdgeDisplay[];
  theme: 'light' | 'dark' | 'system';
}

