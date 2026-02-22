import React, { useEffect, useMemo } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import MapComponent from './MapComponent';
import { CENTER_COORDS_KEY, ZOOM_KEY } from '../../config/config';
import { storage } from '../../utils/storage';

export const MapState = React.memo(() => {
  const { myMap } = useMap();

  // Читаем один раз при инициализации компонента
  const initialData = useMemo(() => ({
    coords: storage.getItem<[number, number]>(CENTER_COORDS_KEY) ?? [30.307209, 59.937456],
    zoom: storage.getItem<number>(ZOOM_KEY) ?? 14
  }), []);

  useEffect(() => {
    if (!myMap) return;

    const updateMapDetails = () => {
      const zoom = myMap.getZoom(); 
      const center = myMap.getCenter();
      storage.setItem(ZOOM_KEY, zoom);
      storage.setItem(CENTER_COORDS_KEY, [center.lng, center.lat]);
    };

    myMap.on('moveend', updateMapDetails);

    return () => {
      myMap.off('moveend', updateMapDetails);
    };
  }, [myMap]);

  return (
    <MapComponent 
      initialCoords={initialData.coords} 
      initialZoom={initialData.zoom} 
    />
  );
});
