import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { GraphDBConnection } from '../models';


interface GraphDBConnectionState {
  connections: GraphDBConnection[];
  getConnections: () => Promise<GraphDBConnection[]>;
  createConnection: (connection: Omit<GraphDBConnection, 'id'>) => Promise<GraphDBConnection>;
}


export const useConnectionStore = (storeName: string) =>
  create(
    persist<GraphDBConnectionState>(
      (set, get) => ({
        connections: [],
        getConnections: async () => {
          return get().connections;
        },
        createConnection: async (connection) => {
          const newGraphDBConnection: GraphDBConnection = {
            id: uuidv4(),
            ...connection
          };
          set((state) => ({
            connections: [...state.connections, newGraphDBConnection],
          }));
          return newGraphDBConnection;
        },
      }),
      {
        name: storeName, // Name of the localStorage key
        // getStorage: () => localStorage, // Specify localStorage
      }
    )
  ).getState()
