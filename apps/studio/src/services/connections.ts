
import { v4 as uuidv4 } from 'uuid';
import { GraphDBConnection } from '../models/connection';
import { LocalStorageServiceBase } from '@invana/ui';
import { LOCALSTORAGE_KEYS } from '../constants';


// GraphDBConnection Service extending LocalStorageServiceBase
export class ConnectionService extends LocalStorageServiceBase<GraphDBConnection> {

  constructor(storageKey: string) {
    super(storageKey);
  }

  async getConnections(): Promise<GraphDBConnection[]> {
    return this.readAll()
  }

  async createConnection({ name, connectionString }: Omit<GraphDBConnection, 'id'>): Promise<GraphDBConnection> {
    return this.create({
      id: uuidv4(),
      name: name,
      connectionString: connectionString
    });
  }
}


export const connectionService = new ConnectionService(LOCALSTORAGE_KEYS.CONNECTION) 