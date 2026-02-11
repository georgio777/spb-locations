import MapComponent from './map/MapComponent';
import { ThemeToggle } from './ThemeToggle';
import { UI } from './UI';

const AppContent = () => {
  return (
    <>
      <MapComponent/>
      <UI />
      <ThemeToggle />
    </>
  );
};

export default AppContent;