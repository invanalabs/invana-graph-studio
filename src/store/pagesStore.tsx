import { LOCALSTORAGE_KEYS } from '@/services/constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PagesState {
  pages: string[];
  currentPageIndex: number;
  addPage: () => void;
  setCurrentPageIndex: (index: number) => void;
}

export const usePagesStore = create<PagesState>()(
  persist(
    (set) => ({
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
    }),
    {
        name: "STORE-" + LOCALSTORAGE_KEYS.PAGES, // Name of the localStorage key
      // Optionally, you can specify the storage type (default is localStorage)
      // storage: createJSONStorage(() => sessionStorage), 
    }
  )
);
