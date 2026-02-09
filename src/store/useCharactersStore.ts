import axios from "axios";
import { create } from "zustand";

export interface Coords {
  lat: number;
  lng: number;
}

type ImageUrl = string | null;

export type Time = 'Дореволюционный' | 'Советский' | 'Современный';

export interface Character {
  id: number;
  slug: string;
  character: string;
  address: string;
  author: string;
  fiction: string;
  coords: Coords;
  image: ImageUrl;
  time: Time;
  title: string;
};

interface UseCharactersStore {
  allCharacters: Character[] | null;
  loading: boolean;
  error: string | null;
  fetchAllCharacters: () => void;
};

const apiUrlAllCharacters = import.meta.env.VITE_API_All_CHARACTERS_URL;

export const useCharactersStore = create<UseCharactersStore>((set) => ({
  allCharacters: null,
  loading: false,
  error: null,
  fetchAllCharacters: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(apiUrlAllCharacters);
      set({ allCharacters: response.data });
      console.log(response.data);
      
    } catch (err) {
      let errorMessage = 'Неизвестная ошибка';

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message || 'Ошибка сервера';
      }

      set({ error: errorMessage });

    } finally {
      set({ loading: false });
    }
  }
}));

export interface CharacterDescription {
  heading: string;
  id: string;
  info: string;
}

interface UseCurrentCharacterStore {
  currentCharacter: Character | null;
  characterDescriptions: CharacterDescription[] | null;
  loading: boolean;
  error: string | null;
  setCurrentCharacter: (info: Character) => void;
  fetchCharacterDescriptions: (locationId: number) => void;
}

const apiUrlDescriptions = import.meta.env.VITE_API_CURRENT_CHARACTERS_URL;

export const useCurrentCharacterStore = create<UseCurrentCharacterStore>((set) => ({
  currentCharacter: null,
  characterDescriptions: null,
  loading: false,
  error: null,

  setCurrentCharacter: (info: Character) => set({ currentCharacter: info }),

  fetchCharacterDescriptions: async (locationId: number) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${apiUrlDescriptions}/${locationId}`);
      set({ characterDescriptions: response.data});
      console.log(response.data);

    } catch (err) {
      let errorMessage = 'Неизвестная ошибка';

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message || 'Ошибка сервера';
      }

      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  }
}));