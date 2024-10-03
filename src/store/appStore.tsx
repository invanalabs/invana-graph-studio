import { create } from 'zustand';

interface Workspace {
  id: number;
  name: string;
  connectionString: string;
}

interface AppState {
  theme: 'light' | 'dark';
  workspaces: Workspace[];
  activeWorkspace: string;
  activePage: number;
  pages: string[];

  leftSidebar: string | null;
  setLeftSidebar: (s: string | null) => void;

  rightSidebar: string | null;
  setRightSidebar: (s: string | null) => void;
  
  toggleTheme: () => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setActiveWorkspace: (workspaceName: string) => void;
  setActivePage: (index: number) => void;
  addPage: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark', // Initial theme
  workspaces: [
    { id: 1, name: "Personal", connectionString: "mongodb://localhost:27017/personal" }
  ], // Initial workspaces
  activeWorkspace: 'Personal',
  activePage: 0,
  pages: ['default'], // Initial pages

  leftSidebar: "null",
  setLeftSidebar: (leftSidebar: string | null) => 
    set(()=> ({leftSidebar})),

  rightSidebar: null,
  setRightSidebar: (rightSidebar: string | null) => 
    set(() => ({ rightSidebar })),


  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    })),

  setWorkspaces: (workspaces: Workspace[]) =>
    set(() => ({ workspaces })),

  setActiveWorkspace: (workspaceName: string) =>
    set(() => ({ activeWorkspace: workspaceName })),

  setActivePage: (index: number) =>
    set(() => ({ activePage: index })),

  addPage: () =>
    set((state) => {
      const newPage = `Page ${state.pages.length + 1}`;
      return {
        pages: [...state.pages, newPage],
        activePage: state.pages.length,
      };
    }),
}));
