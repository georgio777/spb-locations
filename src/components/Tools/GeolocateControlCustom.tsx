import locate from '../../assets/locate.png';
import { GeolocateControl } from 'maplibre-gl';
import { useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';

const geolocate = new GeolocateControl({
  positionOptions: {
      enableHighAccuracy: true
  },
  trackUserLocation: true
});

export const GeolocateControlCustom = ({className}: {className: string}) => {  
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
    <button className={`${className}`} onClick={onGeolocate} title='Показать где я'>
      <img style={{transform: 'scale(0.8)', transformOrigin: 'center'}} src={locate} alt="find me"/>
    </button>
  );
};