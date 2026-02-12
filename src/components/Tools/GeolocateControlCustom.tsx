import { useMapStore } from '../../store/useMapStore';
import locate from '../../assets/locate.png';

export const GeolocateControlCustom = ({className}: {className: string}) => {

  const geolocate = useMapStore(state => state.geolocate);

  const onGeolocate = () => {    
    geolocate?.trigger()
  };

  return (
    <button className={`${className}`} onClick={onGeolocate}>
      <img style={{transform: 'scale(0.8)', transformOrigin: 'center'}} src={locate} alt="find me"/>
    </button>
  );
};