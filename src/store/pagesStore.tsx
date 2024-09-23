import { LOCALSTORAGE_KEYS } from '@/services/constants';
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface Page {
  id: string;
  pageName: string;
}

interface PageState {
  pages: Page[];
  currentPageId: string;
  editingId: string | null;
  editingValue: string;
  deletePageId: string | null;
  isSearchOpen: boolean;
  setPages: (pages: Page[]) => void;
  setCurrentPageId: (id: string) => void;
  setEditingId: (id: string | null) => void;
  setEditingValue: (value: string) => void;
  setDeletePageId: (id: string | null) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
  addPage: () => void;
  updatePage: (id: string, newName: string) => void;
  deletePage: (id: string) => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}

export const usePagesStore = create<PageState>()(
  persist(
    (set, get) => ({
      pages: [{ id: "1", pageName: "Page 1" }],
      currentPageId: "1",
      editingId: null,
      editingValue: "",
      deletePageId: null,
      isSearchOpen: false,

      setPages: (pages) => set({ pages }),
      setCurrentPageId: (id) => set({ currentPageId: id }),
      setEditingId: (id) => set({ editingId: id }),
      setEditingValue: (value) => set({ editingValue: value }),
      setDeletePageId: (id) => set({ deletePageId: id }),
      setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),

      addPage: () => {
        const { pages } = get();
        const newId = (Math.max(...pages.map(page => parseInt(page.id)), 0) + 1).toString();
        const newPage = { id: newId, pageName: `Page ${newId}` };
        set((state) => ({
          pages: [newPage, ...state.pages],
          currentPageId: newId,
        }));
      },

      updatePage: (id, newName) => {
        set((state) => ({
          pages: state.pages.map(page =>
            page.id === id ? { ...page, pageName: newName.trim() } : page
          ),
          editingId: null,
        }));
      },

      deletePage: (id) => {
        set((state) => {
          const newPages = state.pages.filter(page => page.id !== id);

          if (newPages.length === 0) {
            const defaultPage = { id: "1", pageName: "Page 1" };
            return { pages: [defaultPage], currentPageId: "1", deletePageId: null };
          }

          const currentIndex = state.pages.findIndex(page => page.id === id);
          let newCurrentPageId = state.currentPageId;

          if (id === state.currentPageId) {
            newCurrentPageId = currentIndex > 0 ? newPages[currentIndex - 1].id : newPages[0].id;
          }

          return { pages: newPages, currentPageId: newCurrentPageId, deletePageId: null };
        });
      },

      goToPreviousPage: () => {
        const { pages, currentPageId } = get();
        const currentIndex = pages.findIndex(page => page.id === currentPageId);
        if (currentIndex > 0) {
          set({ currentPageId: pages[currentIndex - 1].id });
        }
      },

      goToNextPage: () => {
        const { pages, currentPageId } = get();
        const currentIndex = pages.findIndex(page => page.id === currentPageId);
        if (currentIndex < pages.length - 1) {
          set({ currentPageId: pages[currentIndex + 1].id });
        }
      },
    }),
    {
      name: LOCALSTORAGE_KEYS.PAGES, // Unique name for the storage
      // getStorage: () => localStorage, // Use localStorage (default is sessionStorage)
    } as PersistOptions<PageState>
  )
);
