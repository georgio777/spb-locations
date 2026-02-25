import { useEffect } from 'react'
import { useMap } from 'react-map-gl/maplibre';
import { useParams, useSearchParams } from 'react-router'
import { useFetchAllCharacters } from './useFetchCharacter';

export const useNavigateToLocation = () => {
  const { id } = useParams();
  const {myMap} = useMap();
  const {data: characters} = useFetchAllCharacters();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const shouldNavigate = searchParams.get('navigate') === 'true';
    if (id && characters && myMap && shouldNavigate) {
      const center = characters.find(character => character.id === Number(id))?.coords;
      myMap?.flyTo({center: [center?.lng as number, center?.lat as number], zoom: 18})
    }
  }, [id, myMap, characters, searchParams]);
}
