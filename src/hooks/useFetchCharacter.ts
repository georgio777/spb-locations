import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiUrlAllCharacters, apiUrlDescriptions } from "../api/api";
import type { CharacterDescriptions, Characters } from "../types/locations.types";

export const useFetchCharacterDetails = (id: number | null) => {
  return useSuspenseQuery({
    // Уникальный ключ: если id изменится, Query сделает новый запрос или возьмет из кэша
    queryKey: ['character', id], 
    queryFn: async () => {
      const { data } = await axios.get<CharacterDescriptions>(`${apiUrlDescriptions}${id}`);
      return data;
    },
  });
};

export const useFetchAllCharacters = () => {
  return useSuspenseQuery({
    queryKey: ['characters'], 
    queryFn: async () => {
      const { data } = await axios.get<Characters>(apiUrlAllCharacters);
      return data;
    },
    staleTime: 1000 * 60 * 30,
  });
};