import { useThemeStore } from "../store";


const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const initTheme = useThemeStore((state) => state.initTheme);

  return { theme, toggleTheme, initTheme };
};

export default useTheme;