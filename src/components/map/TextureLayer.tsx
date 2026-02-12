import React, { useEffect } from 'react'
import { useMapStore } from '../../store/useMapStore';

const sw = [29.506073, 59.509628];
const ne = [31.188448, 60.203693];

const TextureLayer = () => {
  const map = useMapStore(state => state.map);
  useEffect(() => {
    if (!map) return;
    map.addSource('paper-overlay-source', {
        'type': 'image',
        'url': '../../assets/pep.jpg', // Ссылка на картинку
        'coordinates': [
            [sw[0], ne[1]], // top-left
            [ne[0], ne[1]], // top-right
            [ne[0], sw[1]], // bottom-right
            [sw[0], sw[1]]  // bottom-left
        ]
    });

    map.addLayer({
        'id': 'paper-overlay-layer',
        'type': 'raster',
        'source': 'paper-overlay-source',
        'paint': {
            'raster-opacity': 0.5, // Прозрачность
            'raster-fade-duration': 0 // Отключаем плавное появление
        }
    });
  }, [map]);
  return null;
}

export default TextureLayer