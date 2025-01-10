import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { GraphDBConnection } from '../models';
import { LOCALSTORAGE_KEYS } from '@/constants';


export interface GraphDBConnectionState {
  connections: GraphDBConnection[];
  getConnections: () => Promise<GraphDBConnection[]>;
  createConnection: (connection: Omit<GraphDBConnection, 'id'>) => Promise<GraphDBConnection>;
  isConnectionNameExists: (name: string) => boolean;

  getActiveConnection: () => GraphDBConnection | undefined;
  activeConnectionId: string | undefined;
  setActiveConnectionId: (id: string | undefined) => void;

}

const storeName = LOCALSTORAGE_KEYS.CONNECTION

export const useConnectionStore = create(
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
      activeConnectionId: undefined,
      setActiveConnectionId: (id) => {
        console.log("setting active connection", id);
        set(() => ({
          activeConnectionId: id
        }))
      },
      getActiveConnection: () => {
        return get().connections.find((connection) => connection.id === get().activeConnectionId);
      }
    }),
    {
      name: storeName, // Name of the localStorage key
      // getStorage: () => localStorage, // Specify localStorage
    }
  )
)
