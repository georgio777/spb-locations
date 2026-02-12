import { Layer, Map, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useCallback, useState } from 'react';
import type {MapEvent, MapLayerMouseEvent, MapRef, LngLatBoundsLike} from 'react-map-gl/maplibre';
import { useMapStore } from '../../store/useMapStore';
import PopUpComponent from './PopUpComponent';
import { useThemeStore } from '../../store/useThemeStore';


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

export interface PopupData {
  lat: number;
  lng: number;
};

const MapComponent = () => {
  const setMap = useMapStore(state => state.setMap);
  const [ popUpData, setPopupData ] = useState<PopupData | null>(null);
  const theme = useThemeStore(state => state.theme);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const onMapLoad = useCallback(async (evt: MapEvent) => {
    const map = evt.target as unknown as MapRef;
    
    setMap(map);

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

  }, [setMap]);

  const onContextMenu = useCallback((e: MapLayerMouseEvent) => {
    setPopupData({
      lat: e.lngLat.lat,
      lng: e.lngLat.lng
    });
  }, []);

  return (
    <>
      <Map
        initialViewState={{
          longitude: 30.307209,
          latitude: 59.937456,
          zoom: 14
        }}
        onLoad={onMapLoad}
        maxBounds={maxBounds}
        attributionControl={false}
        style={{width: '100vw', height: '100dvh'}}
        mapStyle={mapStyles[theme || 'light']}
        onContextMenu={onContextMenu}
      >
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
    </Source>)}
        { popUpData && <PopUpComponent popUpData={popUpData} onClose={() => setPopupData(null)}/>}
      </Map>
    </>
  );
};

export default MapComponent;