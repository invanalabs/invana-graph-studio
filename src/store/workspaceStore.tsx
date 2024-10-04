import { Workspace } from '@/models/workspace';
import { create } from 'zustand';
import { workspaceService } from '@/services/workspace';
import { persist } from 'zustand/middleware';
import { LOCALSTORAGE_KEYS } from '@/services/constants';


interface WorkspaceState {
    workspaces: Workspace[];
    setWorkspaces: (workspaces: Workspace[]) => void;

    activeWorkspace: Workspace | null;
    setActiveWorkspace: (workspace: Workspace) => void;

    // CRUD actions
    createWorkspace: (workspace: Omit<Workspace, 'id'>) => void;
    readWorkspace: (id: string) => Workspace | undefined;
    readWorkspaces: () => Workspace[];
    updateWorkspace: (id: string, updatedWorkspace: Partial<Workspace>) => void;
    deleteWorkspace: (id: string) => void;
}


export const useWorkspaceStore = create<WorkspaceState>()(
    persist(
        (set, get) => ({
            workspaces: [],
            activeWorkspace: null,

            setWorkspaces: (workspaces: Workspace[]) => set(() => ({ workspaces })),
            setActiveWorkspace: (workspace: Workspace) => set(() => ({ activeWorkspace: workspace })),

            // Create a new workspace
            createWorkspace: async (newWorkspace: Omit<Workspace, 'id'>): Promise<Workspace> => {
                const workspace = await workspaceService.createWorkspace({
                    name: newWorkspace.name,
                    connectionString: newWorkspace.connectionString,
                });
                set((state) => ({
                    workspaces: [...state.workspaces, workspace],
                }));
                return workspace;
            },

            // Read a workspace by id
            readWorkspace: (id: string): Workspace | undefined => {
                const state = get();
                return state.workspaces.find((workspace) => workspace.id === id);
            },

            readWorkspaces: (): Workspace[] => {
                const state = get();
                return state.workspaces;
            },

            // Update a workspace by id
            updateWorkspace: (id: string, updatedWorkspace: Partial<Workspace>): void =>
                set((state) => {
                    const updatedWorkspaces = state.workspaces.map((workspace) =>
                        workspace.id === id ? { ...workspace, ...updatedWorkspace } : workspace
                    );
                    return {
                        workspaces: updatedWorkspaces,
                    };
                }),

            // Delete a workspace by id
            deleteWorkspace: (id: string): void =>
                set((state) => {
                    const updatedWorkspaces = state.workspaces.filter(
                        (workspace) => workspace.id !== id
                    );
                    return {
                        workspaces: updatedWorkspaces,
                    };
                }),
        }),
        {
            name: "STORE-" + LOCALSTORAGE_KEYS.WOKRSPACE , // Key to store in local storage
            // getStorage: () => localStorage, // (optional) default is localStorage
        }
    )
);
