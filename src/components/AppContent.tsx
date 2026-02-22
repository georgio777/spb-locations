import { MapProvider } from 'react-map-gl/maplibre';
import { UI } from './UI';
import { MapState } from './map/MapState';

const AppContent = () => {
  return (
    <MapProvider>
      <MapState />
      <UI />
    </MapProvider>
  );
};

export default AppContent;