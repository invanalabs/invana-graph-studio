import { LOCALSTORAGE_KEYS } from '@/services/constants';
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface Canvas {
  id: string;
  name: string;
}

interface GraphBookState {
  canvases: Canvas[];

  // activeCanvas: string;
  editingId: string | null;
  editingValue: string;
  deleteCanvasId: string | null;
  isSearchOpen: boolean;
  activeCanvas: Canvas;
  setActiveCanvas: (canvas: Canvas) => void;

  setCanvases: (canvases: Canvas[]) => void;
  // setActiveCanvas: (id: string) => void;
  setEditingId: (id: string | null) => void;
  setEditingValue: (value: string) => void;
  setDeleteCanvasId: (id: string | null) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
  addCanvas: () => void;
  updateCanvas: (id: string, newName: string) => void;
  deleteCanvas: (id: string) => void;
  goToPreviousCanvas: () => void;
  goToNextCanvas: () => void;
}

const defaultCanvas: Canvas = { id: 1, name: "default" }

export const useGraphBookStore = create<GraphBookState>()(
  persist(
    (set, get) => ({
      canvases: [defaultCanvas,],
      activeCanvas: defaultCanvas,
      editingId: null,
      editingValue: "",
      deleteCanvasId: null,
      isSearchOpen: false,

      setCanvases: (canvases) => set({ canvases }),
      setActiveCanvas: (canvas) => set({ activeCanvas: canvas }),
      setEditingId: (id) => set({ editingId: id }),
      setEditingValue: (value) => set({ editingValue: value }),
      setDeleteCanvasId: (id) => set({ deleteCanvasId: id }),
      setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),

      addCanvas: () => {
        const { canvases } = get();
        const newId = (Math.max(...canvases.map(canvas => parseInt(canvas.id)), 0) + 1).toString();
        const newCanvas = { id: newId, name: `Canvas ${newId}` };
        set((state) => ({
          canvases: [newCanvas, ...state.canvases],
          activeCanvas: newCanvas,
        }));
      },

      updateCanvas: (id, newName) => {
        set((state) => ({
          canvases: state.canvases.map(canvas =>
            canvas.id === id ? { ...canvas, name: newName.trim() } : canvas
          ),
          editingId: null,
        }));
      },

      deleteCanvas: (id) => {
        set((state) => {
          const newCanvass = state.canvases.filter(canvas => canvas.id !== id);

          if (newCanvass.length === 0) {
            return { canvases: [defaultCanvas], activeCanvas: defaultCanvas, deleteCanvasId: null };
          }

          const currentIndex = state.canvases.findIndex(canvas => canvas.id === id);
          let newCurrentCanvasId = state.activeCanvas;

          if (id === state.activeCanvas.id) {
            newCurrentCanvasId = currentIndex > 0 ? newCanvass[currentIndex - 1].id : newCanvass[0].id;
          }

          return { canvases: newCanvass, activeCanvas: newCurrentCanvasId, deleteCanvasId: null };
        });
      },

      goToPreviousCanvas: () => {
        const { canvases, activeCanvas } = get();
        const currentIndex = canvases.findIndex(canvas => canvas.id === activeCanvas.id);
        if (currentIndex > 0) {
          set({ activeCanvas: canvases[currentIndex - 1] });
        }
      },

      goToNextCanvas: () => {
        const { canvases, activeCanvas } = get();
        const currentIndex = canvases.findIndex(canvas => canvas.id === activeCanvas.id);
        if (currentIndex < canvases.length - 1) {
          set({ activeCanvas: canvases[currentIndex + 1] });
        }
      },
    }),
    {
      name: LOCALSTORAGE_KEYS.GRAPHBOOK, // Unique name for the storage
      // getStorage: () => localStorage, // Use localStorage (default is sessionStorage)
    } as PersistOptions<GraphBookState>
  )
);
