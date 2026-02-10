import { useThemeStore } from '../store/useThemeStore';
import './ThemeToggle.css';

export const ThemeToggle = () => {
  const theme = useThemeStore(state => state.theme);
  const setTheme = useThemeStore(state => state.setTheme);
  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <div className='theme' onClick={changeTheme}>{theme}</div>
  );
};