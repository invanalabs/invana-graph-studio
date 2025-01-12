
export type IColor = string | number;

export interface ICanvasNodeShapeDisplayBase {
  bgColor: IColor;
  bgOpacity: number;
  bgPadding: number;
  bgBorderColor: IColor;
  bgBorderWidth: number;
  bgBorderRadius: number;
}

export interface ICanvasTextDisplay {
  textColor: IColor;
  textSize: number;
  textFont: string;
  textOpacity: number;
}


export interface ICanvasLabelDisplay extends ICanvasNodeShapeDisplayBase, ICanvasTextDisplay {

}

export interface ICanvasNodeShapeDisplay extends ICanvasNodeShapeDisplayBase {
  iconFont: string
  iconCode: string;
  iconColor: IColor;
  iconSize: number;
  iconOpacity: number;
  iconRotate: number;
  animated: boolean;

}




export interface ICanvasNodeDisplay {
  shape: ICanvasNodeShapeDisplay;
  label: ICanvasLabelDisplay;
}


export interface ICanvasEdgeShapeDisplay {
  strokeColor: IColor;
  strokeWidth: number;
  strokeOpacity: number;
  strokeArrowheadSize: string;
  strokeArrowheadColor: IColor;
  strokeArrowheadOpacity: number;
  animated: boolean;
}

export interface ICanvasEdgeDisplay {
  shape: ICanvasEdgeShapeDisplay;
  label: ICanvasLabelDisplay;
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
}

