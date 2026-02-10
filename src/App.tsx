import './App.css'
import { useMapStore } from './store/useMapStore';
import MainLoader from './components/MainLoader';
import MainContent from './components/MainContent';
import { useTheme } from './hooks/useTheme';


function App() {
  useTheme();
  const isMapReady = useMapStore(state => state.isReady);
  return (
    <>
      <MainContent/>
      { !isMapReady && <MainLoader /> }
    </>
  );
};

export default App;
