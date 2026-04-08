import { filterIcon, findIcon } from '../../svgIcons';
import { ToolButton } from '../buttons/ToolButton';
import { BlurryBackground } from '../data-containers/BlurryBackground';
import { OpenFilter } from './OpenFilter';
import { OpenSearch } from './OpenSearch';
import { GeolocateControlCustom } from './GeolocateControlCustom';
import { MapRotation } from './MapRotation';
import { ThemeToggle } from './ThemeToggle';
import './ToolBar.css';
import { ZoomControl } from './ZoomControl';

export const ToolBar = () => {
  return (
    <menu type="toolbar" className='tool-bar'>
      <BlurryBackground className='tool-bar-container'>
        <ThemeToggle />
        <GeolocateControlCustom />
        <ZoomControl />
        <MapRotation />
      </BlurryBackground>
      <BlurryBackground className='tool-bar-container'>
        <OpenSearch>
          {({ open, activePanel }) => (
            <ToolButton 
            onClick={open} 
            disabled={activePanel} 
            title="Найти">
              { findIcon }
            </ToolButton>
          )}
        </OpenSearch>
        <OpenFilter>
          {({ open, activePanel }) => (
          <ToolButton onClick={open} disabled={activePanel} title="Отфильтровать">
            { filterIcon }
          </ToolButton>
          )}
        </OpenFilter>
      </BlurryBackground>
    </menu>
  );
};