import { MapProvider } from 'react-map-gl/maplibre';
import { UI } from './UI';
import { MapState } from './map/MapState';
import { memo } from 'react';

const AppContent = memo(() => {
  return (
    <MapProvider>
      <MapState />
      <UI />
    </MapProvider>
  );
});

export default AppContent;