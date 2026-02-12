import { LiquidSVG } from './data-containers/LiquidBackground';
import MapComponent from './map/MapComponent';
import { UI } from './UI';

const AppContent = () => {
  return (
    <>
      {/* LiquidSVG загружаем один раз. Нужен для LiquidContainer */}
      <LiquidSVG /> 
      <MapComponent/>
      <UI />
    </>
  );
};

export default AppContent;