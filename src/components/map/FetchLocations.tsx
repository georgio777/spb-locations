import DataLoaded from "./DataLoaded";
import { useFetchAllCharacters } from "../../hooks/useFetchCharacter";

export const FetchLocations = () => {
  const { data: characters } = useFetchAllCharacters();
  return <DataLoaded allCharacters={characters} />
};