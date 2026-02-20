import { MapProvider } from 'react-map-gl/maplibre';
import MapComponent from './map/MapComponent';
import { UI } from './UI';

const AppContent = () => {
  return (
    <MapProvider>
      <MapComponent/>
      <UI />
    </MapProvider>
  );
};

export default AppContent;