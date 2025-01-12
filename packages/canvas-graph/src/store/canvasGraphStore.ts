import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NodeData, EdgeData, ComboData, NodeOptions, EdgeOptions } from '@antv/g6';


export type ThemeOptions = 'dark' | 'light' | 'system';

export interface ICanvasGraphStore {
  theme: ThemeOptions;
  setTheme: (theme: ThemeOptions) => void;

  nodes: NodeData[];
  edges: EdgeData[];
  combos: ComboData[];

  addNode: (node: NodeData) => void;
  addEdge: (edge: EdgeData) => void;
  addCombo: (combo: ComboData) => void;

  clear: () => void;

  nodeSettings: NodeOptions[],
  setNodeSettings: (settings: NodeOptions[]) => void;

  edgeSettings: EdgeOptions[],
  setEgdeSettings: (settings: EdgeOptions[]) => void,
}

const storeName = 'canvas-graph-store';

export const useCanvasGraphStore = create(
  persist<ICanvasGraphStore>(
    (set) => ({
      theme: 'dark',
      setTheme: (theme: ThemeOptions) => {
        set({ theme })
      },

      nodes: [],
      addNode: (node: NodeData) => {
        set((state) => ({ nodes: [...state.nodes, node] }))
      },

      edges: [],
      addEdge: (edge: EdgeData) => {
        set((state) => ({ edges: [...state.edges, edge] }))
      },

      combos: [],
      addCombo: (combo: ComboData) => {
        set((state) => ({ combos: [...state.combos, combo] }))
      },

      clear: () => set({ nodes: [], edges: [], combos: [] }),

      nodeSettings: [],
      setNodeSettings: (settings: NodeOptions[]) => {
        set({ nodeSettings: settings })
      },

      edgeSettings: [],
      setEgdeSettings: (settings: EdgeOptions[]) => {
        set({ edgeSettings: settings })
      }

    }),
    {
      name: storeName
    }
  )
);