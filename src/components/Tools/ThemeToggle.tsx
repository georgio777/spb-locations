import { useThemeStore } from '../../store/useThemeStore';
import './ThemeToggle.css';
import sun from '../../assets/sun.png';
import moon from '../../assets/moon.png';
import { ToolButton } from '../buttons/ToolButton';


export const ThemeToggle = () => {
  const theme = useThemeStore(state => state.theme);
  const setTheme = useThemeStore(state => state.setTheme);
  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const isLight = theme === 'light';
  return (
    <ToolButton 
    role="switch" 
    title={`Сейчас включена ${isLight ? 'светлая' : 'тёмная'} тема`}
    aria-label={`Переключить на ${isLight ? 'тёмную' : 'светлую'} тему`}
    className='theme-toggle'
    onClick={changeTheme}>
      <div style={{ transform: `rotate(${ theme === 'light' ? 0 : 180}deg)`}} className='theme-toggle__inner'>
        <img src={sun} alt='Светлая тема' className='theme-toggle__item' />
        <img src={moon} alt='Темная тема' className='theme-toggle__item' />
      </div>
    </ToolButton>
  );
};