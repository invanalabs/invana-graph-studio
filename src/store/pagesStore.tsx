import { create } from 'zustand';

interface PagesState {
  pages: string[];
  currentPageIndex: number;
  addPage: () => void;
  setCurrentPageIndex: (index: number) => void;
}

export const usePagesStore = create<PagesState>((set) => ({
  pages: ['default'],
  currentPageIndex: 0,

  addPage: () =>
    set((state) => {
      const newPage = `Page ${state.pages.length + 1}`;
      return {
        pages: [...state.pages, newPage],
        currentPageIndex: state.pages.length,
      };
    }),

  setCurrentPageIndex: (index: number) =>
    set(() => ({ currentPageIndex: index })),
}));
