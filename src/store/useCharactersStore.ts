import axios from "axios";
import { create } from "zustand";

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
   * @param info объект локации локации
   */
  setCurrentCharacter: (info: Character) => void;
  /**
   * получает и записывает всю информацию по локации по id
   * @param id id локации
   */
  fetchCompleteLocation: (id: number) => void;
}

const apiUrlDescriptions = import.meta.env.VITE_API_CURRENT_CHARACTERS_URL;
const apiUrlCharacterData = import.meta.env.VITE_API_CURRENT_CHARACTER_FULL_URL;

export const useCurrentCharacterStore = create<UseCurrentCharacterStore>((set) => ({
  currentCharacter: null,
  loading: false,
  error: null,

  setCurrentCharacter: async (info: Character) => {
    set({ loading: true, error: null });

    // запрашиваем подробные данные у сервера
    try {
      const response = await axios.get(`${apiUrlDescriptions}/${info.id}`);
      set({ currentCharacter: {...info, ...response.data} });
    } catch (err) {
      let errorMessage = 'Неизвестная ошибка';

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message || 'Ошибка сервера';
      }

      set({ error: errorMessage });
      // в случае неудачного запроса заполняем той информацией что уже имеется
      set({ currentCharacter: info })

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