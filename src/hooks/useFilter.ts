import { useCallback } from 'react';
import { useFetchAllCharacters } from './useFetchCharacter';
import type { CharacterFilterFields } from '../types/locations.types';
import { useFilteredStore } from '../store/useFilteredStore';

export const useFilter = () => {
  const { data: characters } = useFetchAllCharacters();
  const setFilteredData = useFilteredStore(state => state.setFilteredData);

  const filterLocations = useCallback((key: CharacterFilterFields, value: string) => {
    const filtered = characters.filter((character) => character[key] === value);
    setFilteredData(filtered);
  }, [characters, setFilteredData]);

  return filterLocations;
};
