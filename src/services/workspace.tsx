import { Workspace } from "@/models/workspace";
import { LocalStorageServiceBase } from "./base";
import { LOCALSTORAGE_KEYS } from "./constants";
import { v4 as uuidv4 } from 'uuid';


// Workspace Service extending LocalStorageServiceBase
export class WorkspaceService extends LocalStorageServiceBase<Workspace> {

    constructor(storageKey: string) {    
        super(storageKey);
    }

    async getWorkspaces(): Promise<Workspace[]> {
        return this.readAll()
    }

    async createWorkspace({name, connectionString}: Omit<Workspace, 'id'>): Promise<Workspace> {        
        return this.create({
            id: uuidv4(),
            name: name,
            connectionString: connectionString
        });
    }
}


export const  workspaceService = new WorkspaceService( LOCALSTORAGE_KEYS.WOKRSPACE) 