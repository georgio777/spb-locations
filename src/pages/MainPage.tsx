import { lazy } from 'react'
import { useMapStore } from '../store/useMapStore';
import MainLoader from '../components/loaders/MainLoader';

const AppContent = lazy(() => import('../components/AppContent'));

export const MainPage = () => {
  const isMapReady = useMapStore(state => state.isReady);

  return (
    <>
      <AppContent/>
      { !isMapReady && <MainLoader /> }
    </>
  );
};