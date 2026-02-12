import { useMapStore } from '../../store/useMapStore';

export const ZoomControl = ({className}: {className: string}) => {
  const map = useMapStore(state => state.map);

  const zoomIn = () => {
    map?.zoomIn();
  };

  const zoomOut = () => {
    map?.zoomOut();
  };
  return (
    <>
      <button 
      title='Увеличить масштаб'
      aria-label='Увеличить масштаб'
      className={`${className}`} 
      onClick={zoomIn}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
      </button>

      <button 
      title='Уменьшить масштаб'
      aria-label='Уменьшить масштаб'
      className={`${className}`} 
      onClick={zoomOut}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 640 640"><path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"/></svg>
      </button>
    </>
  );
};