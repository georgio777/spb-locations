import type { Characters, SearchKey } from '../../types/locations.types';
import Fuse from 'fuse.js';
import { SearchResultsComponent } from './SearchResults';
import { memo } from 'react';

export interface Result {
  key: SearchKey;
  value: string;
}

export type SearchResults = Result[];

export type NoResults = 'no-results';

interface SearchProps {
  characters: Characters;
  inputValue: string;
}

const search = (inputValue: string, characters: Characters) => {
  const input = inputValue.trim().toLowerCase();
  if (input.length === 0) return null;

  const fuse = new Fuse(characters, {
    threshold: 0.4,
    includeScore: true,
    keys: ['author', 'character', 'fiction']
  });

  const results = fuse.search(input);
  const finalResults: { key: SearchKey; value: string; score: number }[] = [];
  const seen = new Set<string>();

  results.forEach(({ item, score = 1 }) => {
    const fields: SearchKey[] = ['author', 'character', 'fiction'];

    fields.forEach(field => {
      const val = item[field];
      const valLower = val.toLowerCase();
      const uniqueKey = `${field}-${val}`;

      if (seen.has(uniqueKey)) return;

      // Рассчитываем индивидуальный score для каждого поля
      let fieldScore = score;

      // Если в самом поле НЕТ поискового запроса, даем ему штраф (отправляем в конец)
      if (!valLower.includes(input)) {
        fieldScore += 0.5; 
      } else {
        // Если поле начинается с запроса — даем огромный бонус (в топ)
        if (valLower.startsWith(input)) fieldScore -= 0.6;
        // Если точное совпадение — максимальный приоритет
        if (valLower === input) fieldScore -= 0.8;
      }

      finalResults.push({ key: field, value: val, score: fieldScore });
      seen.add(uniqueKey);
    });
  });

  // Сортируем: сначала те, у кого score МЕНЬШЕ
  const sorted = finalResults.sort((a, b) => a.score - b.score);
  
  return sorted.length > 0 ? sorted : 'no-results';
};

export const Search = memo(({ characters, inputValue}: SearchProps) => {
  const results: SearchResults | NoResults | null = search(inputValue, characters);
  if (results === 'no-results') return <p>Ничего не найдено</p>;
  if (results === null) return null;

  return <SearchResultsComponent searchResults={results} />;
});
