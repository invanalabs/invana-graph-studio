import { LOCALSTORAGE_KEYS } from '@/services/constants';
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface Page {
  id: string;
  pageName: string;
}

interface PageState {
  pages: Page[];

  // activePage: string;
  editingId: string | null;
  editingValue: string;
  deletePageId: string | null;
  isSearchOpen: boolean;
  activePage: Page;
  setActivePage: (page: Page) => void;

  setPages: (pages: Page[]) => void;
  // setActivePage: (id: string) => void;
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

const defaultPage: Page = {id: 1, pageName: "default"}

export const usePagesStore = create<PageState>()(
  persist(
    (set, get) => ({
      pages: [defaultPage, ],
      activePage: defaultPage,
      editingId: null,
      editingValue: "",
      deletePageId: null,
      isSearchOpen: false,

      setPages: (pages) => set({ pages }),
      setActivePage: (page) => set({ activePage: page }),
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
          activePage: newPage,
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
            return { pages: [defaultPage], activePage: defaultPage, deletePageId: null };
          }

          const currentIndex = state.pages.findIndex(page => page.id === id);
          let newCurrentPageId = state.activePage;

          if (id === state.activePage.id) {
            newCurrentPageId = currentIndex > 0 ? newPages[currentIndex - 1].id : newPages[0].id;
          }

          return { pages: newPages, activePage: newCurrentPageId, deletePageId: null };
        });
      },

      goToPreviousPage: () => {
        const { pages, activePage } = get();
        const currentIndex = pages.findIndex(page => page.id === activePage.id);
        if (currentIndex > 0) {
          set({ activePage: pages[currentIndex - 1] });
        }
      },

      goToNextPage: () => {
        const { pages, activePage } = get();
        const currentIndex = pages.findIndex(page => page.id === activePage.id);
        if (currentIndex < pages.length - 1) {
          set({ activePage: pages[currentIndex + 1] });
        }
      },
    }),
    {
      name: LOCALSTORAGE_KEYS.PAGES, // Unique name for the storage
      // getStorage: () => localStorage, // Use localStorage (default is sessionStorage)
    } as PersistOptions<PageState>
  )
);
