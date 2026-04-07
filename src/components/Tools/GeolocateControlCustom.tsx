import locate from '../../assets/locate.png';
import { GeolocateControl } from 'maplibre-gl';
import { useEffect, useMemo } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { ToolButton } from '../buttons/ToolButton';
import toast from 'react-hot-toast';

interface MapLibreGeolocateInternal extends GeolocateControl {
  _watchState: "OFF" | "ACTIVE_LOCK" | "WAITING_ACTIVE" | "ACTIVE_ERROR" | "BACKGROUND" | "BACKGROUND_ERROR";
  _geolocationWatchID: number;
}

export const GeolocateControlCustom = () => {  
  const {myMap} = useMap();

  const geolocate = useMemo(() => {
    return new GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
    });
  }, []);

  const onGeolocate = () => {    
    geolocate?.trigger();
  };

  useEffect(() => {
    if (myMap?.hasControl(geolocate)) return;
    myMap?.addControl(geolocate!);
    return () => {
      if (myMap?.hasControl(geolocate)) {
        myMap.removeControl(geolocate);
      }
    };
  }, [myMap, geolocate]);

  useEffect(() => {
    const boundsHandler = () => {
      toast('Вы находитесь за пределами карты', { id: 'outOfMaxBound', duration: 2000});
      const internal = geolocate as MapLibreGeolocateInternal;
  
      // 1. Сбрасываем визуальное состояние кнопки и внутренний флаг
      internal._watchState = 'OFF';
      
      // 2. Останавливаем реальное отслеживание в браузере
      if (internal._geolocationWatchID !== undefined) {
        navigator.geolocation.clearWatch(internal._geolocationWatchID);
        internal._geolocationWatchID = -1; // Сбрасываем ID
      }
    }
    geolocate.on('outofmaxbounds', boundsHandler);

    return () => {
      geolocate.off('outofmaxbounds', boundsHandler);
    }
  }, [geolocate]);

  return (
    <ToolButton onClick={onGeolocate} title='Показать где я'>
      <img style={{transform: 'scale(0.8)', transformOrigin: 'center'}} src={locate} alt="find me"/>
    </ToolButton>
  );
};