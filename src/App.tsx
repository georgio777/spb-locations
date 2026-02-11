import './App.css'
import { useMapStore } from './store/useMapStore';
import MainLoader from './components/MainLoader';
import { useTheme } from './hooks/useTheme';
import { lazy } from 'react';

const AppContent = lazy(() => import('./components/AppContent'));

function App() {
  useTheme();
  const isMapReady = useMapStore(state => state.isReady);
  return (
    <>
      <AppContent/>
      { !isMapReady && <MainLoader /> }
    </>
  );
};

export default App;
