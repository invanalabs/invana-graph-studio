




export interface NodeData {
  id: number;
  type: string;
  label: string;
  properties: {
    [key: string]: any;
  };
}

export interface EdgeData {
  id: number;
  type: string;
  label: string;
  properties: {
    [key: string]: any;
  };
  source: string | number
  target: string | number
}

export type QueryReponseItem = string | number | null | object | EdgeData | NodeData
