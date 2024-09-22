import { LOCALSTORAGE_KEYS } from '@/services/constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      theme: 'dark', // Default theme
      setTheme: (theme: 'light' | 'dark') => 
        set(() => ({ theme })),
    }),
    {
      name: "STORE-" + LOCALSTORAGE_KEYS.THEME, // Name of the localStorage key
      // getStorage: () => localStorage, // Specify localStorage
    }
  )
);
