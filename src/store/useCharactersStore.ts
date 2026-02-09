import axios from "axios";
import { create } from "zustand";
import { apiUrlAllCharacters, apiUrlCharacterData, apiUrlDescriptions } from "../api/api";

export interface Coords {
  lat: number;
  lng: number;
}

type ImageUrl = string | null;

export type Time = 'Дореволюционный' | 'Советский' | 'Современный';

/**
 * Ответ api с данными о персонаже/локации
 */
export interface Character {
  /** Уникальный ID (присваивается сервером) */
  id: number;
  /** URL-идентификатор для роутинга */
  slug: string;
  /** Имя персонажа/локации */
  character: string;
  /** Адрес локации */
  address: string;
  /** Автор произведения */
  author: string;
  /** Название произведения */
  fiction: string;
  /** Географические координаты */
  coords: Coords;
  /** URL изображения (может отсутствовать) */
  image: ImageUrl;
  /** Временной период создания */
  time: Time;
  /** Заголовок локации */
  title: string;
}

interface UseCharactersStore {
  allCharacters: Character[] | null;
  loading: boolean;
  error: string | null;
  fetchAllCharacters: () => void;
};


export const useCharactersStore = create<UseCharactersStore>((set) => ({
  allCharacters: null,
  loading: false,
  error: null,
  fetchAllCharacters: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(apiUrlAllCharacters);
      set({ allCharacters: response.data });

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


/**
 * Подробные данные о персонаже/локации
 */
export interface CharacterDescription {
  /** заголовок */
  heading: string;
  id: string;
  /** развернутое описание относящееся к загловку */
  info: string;
}

interface CurrentCharacter extends Character {
  descriptions?: CharacterDescription[];
}

interface UseCurrentCharacterStore {
  /** уже имеющаяся информация + ответ api с подробными описаниями */
  currentCharacter: CurrentCharacter | null;
  loading: boolean;
  error: string | null;
  /**
   * устанавливает интересуемую в данный момент локацию принимая сокращенный объект локации
   * @param character объект локации
   */
  setCurrentCharacter: (character: Character) => void;
  /**
   * получает и записывает всю информацию по локации по id
   * @param id id локации
   */
  fetchCompleteLocation: (id: number) => void;
}

export const useCurrentCharacterStore = create<UseCurrentCharacterStore>((set) => ({
  currentCharacter: null,
  loading: false,
  error: null,

  setCurrentCharacter: async (character: Character) => {
    set({ loading: true, error: null });

    // запрашиваем подробные данные у сервера
    try {
      const response = await axios.get(`${apiUrlDescriptions}${character.id}`);
      set({ currentCharacter: {...character, ...response.data} });
    } catch (err) {
      let errorMessage = 'Неизвестная ошибка';

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message || 'Ошибка сервера';
      }

      set({ error: errorMessage });
      // в случае неудачного запроса заполняем той информацией что уже имеется
      set({ currentCharacter: character })

    } finally {
      set({ loading: false });
    }

  },
  fetchCompleteLocation: async (id: number) => {
    set({ loading: true, error: null });

    // запрашиваем подробные данные у сервера
    try {
      const response = await axios.get(`${apiUrlCharacterData}${id}`);
      set({ currentCharacter: response.data });
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