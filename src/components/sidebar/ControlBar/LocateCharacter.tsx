import { memo } from 'react';
import { useSideBarStore } from '../../../store/useSideBarStore';
import { useIsMobileStore } from '../../../store/useIsMobileStore';
import { useParams } from 'react-router';
import { useFetchAllCharacters } from '../../../hooks/useFetchCharacter';
import { useMap } from 'react-map-gl/maplibre';

interface LocateCharacterProps {
  children: (props: { onLocate: () => void }) => React.ReactNode;
}

export const LocateCharacter = memo(({ children }: LocateCharacterProps) => {
  const { id: characterID } = useParams();
  const { data: characters } = useFetchAllCharacters();
  const { myMap } = useMap();
  
  

  const isOpen = useSideBarStore(state => state.isOpen);
  const setIsOpen = useSideBarStore(state => state.setIsOpen);
  const isMobile = useIsMobileStore(state => state.isMobile);
  
  const onLocate = () => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
    const coords = characters.find(char => char.id === Number(characterID))?.coords;
    myMap?.flyTo({center: [coords?.lng as number, coords?.lat as number], zoom: 18});
  };
  return <>{children({ onLocate: onLocate })}</>;
});
