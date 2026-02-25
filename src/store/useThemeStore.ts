import { create } from "zustand";
import { THEME_KEY } from "../config/config";
import { storage } from "../utils/storage";

type Theme = 'light' | 'dark';

// Функция-хелпер для определения начальной темы
const getInitialTheme = (): Theme => {
  // 1. Проверяем LS
  try {
    const saved = storage.getItem(THEME_KEY);
    if (saved) return saved as Theme;
  } catch (e) {
    console.error("Error reading theme from LS", e);
  }

  // 2. Проверяем системную тему
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  // 3. Дефолт
  return 'light';
};

interface UseThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<UseThemeStore>((set) => ({
  theme: getInitialTheme(), 
  setTheme: (theme: Theme) => set({ theme })
}));
