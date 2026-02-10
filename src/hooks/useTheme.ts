import { useEffect } from "react";
import { THEME_KEY } from "../config/config";
import { useThemeStore } from "../store/useThemeStore";

export const useTheme = () => {
  const { theme, setTheme } = useThemeStore();

  // Синхронизация атрибута HTML и LocalStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  }, [theme]);

  // Слушатель системных изменений (если пользователь сменил тему системно)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Меняем только если в LS ничего нет (пользователь не выбрал сам)
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme]);

  return { theme, setTheme };
};
