import React, { useEffect, useMemo, useState } from 'react'
import type { Character } from '../../store/useCharactersStore'
import { Marker, useMap } from 'react-map-gl/maplibre';
import { ClusterPin, Pin } from './Pin';
import useSupercluster from 'use-supercluster';

interface CharacterProperties {
  cluster: false;
  characterId: number;
  data: Character;
  category: string;
}

const DataLoaded = ({allCharacters}: {allCharacters: Character[]}) => {
  const { current: map } = useMap();

  // 1. Превращаем данные в формат GeoJSON Feature
  const points = useMemo(() => allCharacters.map(char => ({
    type: 'Feature' as const,
    properties: { 
      cluster: false as const, 
      characterId: char.id, 
      data: char, 
      category: 'characters-locations' },
    geometry: {
      type: 'Point' as const,
      coordinates: [char.coords.lng, char.coords.lat]
    }
  })), [allCharacters]);

  // 2. Получаем текущее состояние карты для расчета кластеров
  const [zoom, setZoom] = useState(12);
  const [bounds, setBounds] = useState<[number, number, number, number] | null>(null);

  // Слушаем изменение карты
  useEffect(() => {
    if (!map) return;
    
    const update = () => {
      const b = map.getBounds();
      setBounds([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]);
      setZoom(Math.floor(map.getZoom()));
    };

    map.on('move', update);
    update(); 
    return () => { map.off('move', update); };
  }, [map]);

  // 3. Кластеризация
  const { clusters, supercluster } = useSupercluster<CharacterProperties>({
    points,
    bounds: bounds || undefined,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  return (
    <>
      {clusters.map(cluster => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster } = cluster.properties;

        // Рендерим КЛАСТЕР
        if (isCluster) {
          const { point_count: pointCount } = cluster.properties;
          return (
            <Marker 
            key={`cluster-${cluster.id}`} 
            longitude={longitude} 
            latitude={latitude}
            onClick={() => {
              const expansionZoom = Math.min(
                supercluster?.getClusterExpansionZoom(cluster.id as number) ?? 20,
                20
              );
              map?.easeTo({ center: [longitude, latitude], zoom: expansionZoom });
            }}
            >
              <ClusterPin count={pointCount} />
            </Marker>
          );
        }

        return (
          <Marker 
          key={`char-${cluster.properties.characterId}`} 
          longitude={longitude} 
          latitude={latitude}          
          anchor="bottom-right">
            <Pin character={cluster.properties.data} />
          </Marker>
        );
      })}
    </>
  )

}

export default React.memo(DataLoaded);