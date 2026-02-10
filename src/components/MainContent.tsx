import { lazy } from 'react';
import { ThemeToggle } from './ThemeToggle';

const MapComponent = lazy(() => import('./map/MapComponent'));


const MainContent = () => {
  return (
    <>
      <MapComponent/>
      <ThemeToggle />
    </>
  )
}

export default MainContent