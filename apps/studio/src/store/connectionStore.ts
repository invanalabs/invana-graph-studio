import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { GraphDBConnection } from '../models';


interface GraphDBConnectionState {
  connections: GraphDBConnection[];
  getConnections: () => Promise<GraphDBConnection[]>;
  createConnection: (connection: Omit<GraphDBConnection, 'id'>) => Promise<GraphDBConnection>;
  isConnectionNameExists: (name: string) => boolean;
  activeConnection: string | undefined;
  setActiveConnection: (id: string) => void;

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
        isConnectionNameExists: (name: string) => {
          return get().connections.some((connection) => connection.name === name);
        },
        activeConnection: undefined,
        setActiveConnection: (id: string) => {
          console.log("setting active connection", id);
          set(() => ({
            activeConnection: id
          }))
        }
      }),
      {
        name: storeName, // Name of the localStorage key
        // getStorage: () => localStorage, // Specify localStorage
      }
    )
  ).getState()
