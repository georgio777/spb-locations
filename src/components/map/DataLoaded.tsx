import React, { useEffect, useMemo, useState } from 'react'
import { Marker, useMap } from 'react-map-gl/maplibre';
import { ClusterPin, Pin } from './Pin';
import useSupercluster from 'use-supercluster';
import type { Character, Characters } from '../../types/locations.types';
import { useParams } from 'react-router';

interface CharacterProperties {
  cluster: false;
  characterId: number;
  data: Character;
  category: string;
}

const pointStyle = {
  width: '10px',
  height: '10px',
  borderRadius: '10px',
  backgroundColor: 'white',
  border: '2px solid red'
};

const anchor = 'bottom-right';

const DataLoaded = ({allCharacters}: {allCharacters: Characters}) => {
  const { id } = useParams();
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

          // Если достигнут максимальный зум, а точки всё еще в кластере делаем спайдерфикацию
          if (zoom >= 17) {
            
            const leaves = supercluster?.getLeaves(cluster.id as number, Infinity) || [];
            return (
              <React.Fragment key={`marker-${cluster.id}`}>
                {/* между спайдерфицированными локациями добавляем точку */}
                <Marker anchor='center' longitude={longitude} latitude={latitude}><div style={pointStyle}></div></Marker>
                {/* непосредственно развернутые вокруг точки локации */}
                {leaves.map((leaf, index) => {
                  const angle = (index / leaves.length) * 2 * Math.PI;
                  const radius = 0.0001; // Небольшое смещение координат
                  const spiderLng = longitude + Math.cos(angle) * radius;
                  const spiderLat = latitude + Math.sin(angle) * radius;

                  return (
                    <Marker 
                      key={`spider-${leaf.properties.characterId}`} 
                      longitude={spiderLng} 
                      latitude={spiderLat}
                      anchor={anchor}
                    >
                      <Pin selected={Number(id) === leaf.properties.data.id} character={leaf.properties.data} leafCoords={[spiderLng, spiderLat]} />
                    </Marker>
                  );
                })}
              </React.Fragment>
            )
          }

          // собираем данные из кластера для отрисовки данных в попапе
          const leaves = supercluster?.getLeaves(cluster.id as number, Infinity) || [];
          const clusterChars = leaves.map(char => char.properties.data.title);
          return (

            <Marker 
            key={`cluster-${cluster.id}`} 
            longitude={longitude} 
            latitude={latitude}
            anchor={anchor}
            onClick={() => {
              const expansionZoom = Math.min(
                supercluster?.getClusterExpansionZoom(cluster.id as number) ?? 20,
                20
              );
              map?.easeTo({ center: [longitude, latitude], zoom: expansionZoom });
            }}
            >
              <ClusterPin chars={clusterChars} count={pointCount} coords={[longitude, latitude]}/>
            </Marker>
          );
        }

        // рендеринг одиночного маркера
        return (
          <Marker
          key={`char-${cluster.properties.characterId}`} 
          longitude={longitude} 
          latitude={latitude}          
          anchor={anchor}>
            <Pin selected={Number(id) === cluster.properties.data.id} character={cluster.properties.data} />
          </Marker>
        );
      })}
    </>
  )

}

export default React.memo(DataLoaded);