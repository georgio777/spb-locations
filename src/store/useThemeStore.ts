import { create } from "zustand";
import { THEME_KEY } from "../config/config";

type Theme = 'light' | 'dark';

// Функция-хелпер для определения начальной темы
const getInitialTheme = (): Theme => {
  // 1. Проверяем LS (нужно обернуть в try-catch для безопасности)
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return JSON.parse(saved) as Theme;
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
