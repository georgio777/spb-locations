import { Layer, Map, NavigationControl, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Suspense, useCallback, useState } from 'react';
import type {MapEvent, MapLayerMouseEvent, MapRef, LngLatBoundsLike} from 'react-map-gl/maplibre';
import { useMapStore } from '../../store/useMapStore';
import PopUpComponent, { type PopupData } from './PopUpComponent';
import { useThemeStore } from '../../store/useThemeStore';
import { FetchLocations } from './FetchLocations';
import { ErrorBoundary } from 'react-error-boundary';
import { LocationsLoader } from '../loaders/Loaders';
import { useNavigateToLocation } from '../../hooks/NavigateToLocation';

const loaderStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100dvh'
};

const mapStyles: Record<'light' | 'dark', string> = {
  light: import.meta.env.VITE_MAPTILER_API_KEY_LIGHT,
  dark: import.meta.env.VITE_MAPTILER_API_KEY_DARK
};



const sw = {lng: 29.506073, lat: 59.509628};
const ne = {lng: 31.188448, lat: 60.203693};

const spbPolygon: GeoJSON.Feature = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [sw.lng, sw.lat],
      [ne.lng, sw.lat],
      [ne.lng, ne.lat],
      [sw.lng, ne.lat],
      [sw.lng, sw.lat]
    ]]
  },
  properties: {}
};

const maxBounds: LngLatBoundsLike = [sw.lng, sw.lat, ne.lng, ne.lat];

interface MapComponentProps {
  initialCoords: [number, number];
  initialZoom: number;
}

const MapComponent = ({initialCoords, initialZoom}: MapComponentProps) => {
  const [ popUpData, setPopupData ] = useState<PopupData | null>(null);
  const theme = useThemeStore(state => state.theme);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const setMapReady = useMapStore(state => state.setMapReady);
  useNavigateToLocation();
  const onMapLoad = useCallback(async (evt: MapEvent) => {
    setMapReady();

    const map = evt.target as unknown as MapRef;    

    // Обработка текстурного слоя
    try {
      // 1. Ждем загрузки через await
      const response = await map.loadImage('/paper17.png');
      
      // 2. Добавляем картинку (данные лежат в response.data)
      if (response && response.data && !map.hasImage('paper-texture')) {
        map.addImage('paper-texture', response.data);
        
        // 3. Теперь разрешаем рендер слоя
        setIsImageLoaded(true);
      }
    } catch (error) {
      console.error('Ошибка при загрузке текстуры:', error);
    }
    
  }, [setMapReady]);

  const onContextMenu = useCallback((e: MapLayerMouseEvent) => {
    setPopupData({
      lat: e.lngLat.lat,
      lng: e.lngLat.lng
    });
  }, []);

  return (
    <>
      <Map
        id="myMap"
        initialViewState={{
          longitude: initialCoords[0],
          latitude: initialCoords[1],
          zoom: initialZoom
        }}
        onLoad={onMapLoad}
        maxBounds={maxBounds}
        attributionControl={false}
        style={{width: '100vw', height: '100dvh'}}
        mapStyle={mapStyles[theme || 'light']}
        onContextMenu={onContextMenu}
      >
        {/* Текстурный слой на карте */}
        {isImageLoaded && (
          <Source id="spb-paper-source" type="geojson" data={spbPolygon}>
            <Layer
              id="paper-layer"
              type="fill"
              paint={{
                'fill-pattern': 'paper-texture',
                'fill-opacity': theme === 'light' ? 0.9 : 0.2
              }}
            />
          </Source>)
        } 
        <NavigationControl style={{ display: 'none'}} />
        { popUpData && 
          <PopUpComponent anchor='bottom' popUpData={popUpData} onClose={() => setPopupData(null)}>
            <p>Широта: {popUpData.lat}</p>
            <p>Долгота: {popUpData.lng}</p>
          </PopUpComponent>
        }
        <ErrorBoundary fallback={<div>Упс! Не удалось загрузить персонажей. Попробуйте позже.</div>}>
          <Suspense fallback={<LocationsLoader styles={loaderStyle}><span>Загрузка локаций ...</span></LocationsLoader>}>
            <FetchLocations />
          </Suspense>  
        </ErrorBoundary>
      </Map>
    </>
  );
};

export default MapComponent;