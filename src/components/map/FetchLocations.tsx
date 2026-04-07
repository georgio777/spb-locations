import DataLoaded from "./DataLoaded";
import { useFetchAllCharacters } from "../../hooks/useFetchCharacter";
import { useFilteredStore } from "../../store/useFilteredStore";
import { memo } from "react";

export const FetchLocations = memo(() => {
  const { data: characters } = useFetchAllCharacters();
  const filteredLocations = useFilteredStore(state => state.filteredData);

  const dataToDisplay = filteredLocations ?? characters

  return <DataLoaded allCharacters={dataToDisplay} />
});