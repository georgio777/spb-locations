import locate from '../../assets/locate.png';
import { GeolocateControl } from 'maplibre-gl';
import { useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { ToolButton } from '../buttons/ToolButton';

const geolocate = new GeolocateControl({
  positionOptions: {
      enableHighAccuracy: true
  },
  trackUserLocation: true
});

export const GeolocateControlCustom = () => {  
  const {myMap} = useMap();

  const onGeolocate = () => {    
    geolocate?.trigger();
  };

  useEffect(() => {
    if (myMap?.hasControl(geolocate)) return;
    myMap?.addControl(geolocate!)
  }, [myMap]);

  useEffect(() => {
    const boundsHandler = () => {
      console.log('An outofmaxbounds event has occurred.')
    }
    geolocate.on('outofmaxbounds', boundsHandler);

    return () => {
      geolocate.off('outofmaxbounds', boundsHandler);
    }
  }, []);

  return (
    <ToolButton onClick={onGeolocate} title='Показать где я'>
      <img style={{transform: 'scale(0.8)', transformOrigin: 'center'}} src={locate} alt="find me"/>
    </ToolButton>
  );
};