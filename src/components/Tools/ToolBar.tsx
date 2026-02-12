import { LiquidBackground } from '../data-containers/LiquidBackground';
import { GeolocateControlCustom } from './GeolocateControlCustom';
import { MapRotation } from './MapRotation';
import { ThemeToggle } from './ThemeToggle';
import './ToolBar.css';
import { ZoomControl } from './ZoomControl';

const toolbarCss = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  padding: '0.4rem',
  borderRadius: '100px',
} as const;

export const ToolBar = () => {
  return (
    <menu type="toolbar" className='tool-bar'>
      <LiquidBackground style={toolbarCss}>
        <ThemeToggle className={'toolbar-button'} />
        <GeolocateControlCustom className={'toolbar-button'} />
        <ZoomControl className={'toolbar-button'} />
        <MapRotation className={'toolbar-button'} />
      </LiquidBackground>
    </menu>
  );
};