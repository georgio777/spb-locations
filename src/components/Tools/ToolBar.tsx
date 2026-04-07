import { filterIcon, findIcon } from '../../svgIcons';
import { ToolButton } from '../buttons/ToolButton';
import { BlurryBackground } from '../data-containers/BlurryBackground';
import { OpenFilter } from '../sidebar/ControlBar/OpenFilter';
import { OpenSearch } from '../sidebar/ControlBar/OpenSearch';
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
          {({ open, isOpen }) => (
            <ToolButton disabled={isOpen} onClick={open} title="Найти">
              { findIcon }
            </ToolButton>
          )}
        </OpenSearch>
        <OpenFilter>
          {({ open, isOpen }) => (
          <ToolButton disabled={isOpen} onClick={open} title="Отфильтровать">
            { filterIcon }
          </ToolButton>
          )}
        </OpenFilter>
      </BlurryBackground>
    </menu>
  );
};