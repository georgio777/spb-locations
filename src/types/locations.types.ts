export interface Coords {
  lat: number;
  lng: number;
};

type ImageUrl = string | null;

export type Time = 'Дореволюционный' | 'Советский' | 'Современный';

export type SearchKey = 'author' | 'fiction' | 'character';

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
};

export type CharacterFilterFields = Extract<keyof Character, 'character' | 'fiction' | 'author' | 'time'>;

/**
 * Ответ api с данными о персонаже/локации
 */
export type Characters = Character[];



export interface CharacterDescription {
  /** заголовок */
  heading: string;
  id: string;
  /** развернутое описание относящееся к загловку */
  info: string;
}
/**
 * Подробные данные о персонаже/локации
 */
export type CharacterDescriptions = CharacterDescription[];