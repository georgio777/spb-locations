import { MapProvider } from 'react-map-gl/maplibre';
import { UI } from './UI';
import { MapState } from './map/MapState';
import { memo } from 'react';
import { Notification } from './Notification';

const AppContent = memo(() => {
  return (
    <MapProvider>
      <MapState />
      <UI />
      <Notification />
    </MapProvider>
  );
});

export default AppContent;