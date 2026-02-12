import { MapProvider } from 'react-map-gl/maplibre';
import { LiquidSVG } from './data-containers/LiquidBackground';
import MapComponent from './map/MapComponent';
import { UI } from './UI';

const AppContent = () => {
  return (
    <MapProvider>
      {/* LiquidSVG загружаем один раз. Нужен для LiquidContainer */}
      <LiquidSVG /> 
      <MapComponent/>
      <UI />
    </MapProvider>
  );
};

export default AppContent;