import { useEffect } from "react";
import { useCharactersStore } from "../../store/useCharactersStore";
import DataLoaded from "./DataLoaded";

export const FetchLocations = () => {
  const fetchAllCharacters = useCharactersStore(state => state.fetchAllCharacters);
  const allCharacters = useCharactersStore(state => state.allCharacters);
  
  useEffect(() => {
    fetchAllCharacters();
  }, [fetchAllCharacters]);
  return allCharacters && <DataLoaded allCharacters={allCharacters} />
};