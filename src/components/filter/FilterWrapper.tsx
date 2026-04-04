import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CharacterFilterFields, Time } from '../../types/locations.types'
import { useFetchAllCharacters } from '../../hooks/useFetchCharacter';
import { useFilter } from '../../hooks/useFilter';
import { Filter } from './Filter';

interface FilterItem {
  mode: CharacterFilterFields;
  data: string[];
}

interface FilterTime {
  mode: CharacterFilterFields;
  data: Time[];
}

export interface FilterValues {
  charactersNames: FilterItem;
  authors: FilterItem;
  fictions: FilterItem;
  periods: FilterTime;
}

export const FilterWrapper = () => {
  const [ mode, setMode ] = useState<CharacterFilterFields | null>(null);
  const [ value, setValue ] = useState<string | null>(null);
  const { data: characters } = useFetchAllCharacters();
  const filter = useFilter();

  const filterValues: FilterValues = useMemo(() => {
    const charactersNames: string[] = [];
    const authors: string[] = [];
    const fictions: string[] = [];
    const periods: Time[] = [];

    characters.forEach(character => {
      charactersNames.push(character.character);
      authors.push(character.author);
      fictions.push(character.fiction);
      periods.push(character.time);
    });

    return {
      charactersNames: {
        mode: 'character',
        data: [...new Set(charactersNames)]
      },
      authors: {
        mode: 'author',
        data: [...new Set(authors)]
      },
      fictions: {
        mode: 'fiction',
        data: [...new Set(fictions)]
      },
      periods: {
        mode: 'time',
        data: [...new Set(periods)]
      }
    }
  }, [characters]);

  useEffect(() => {
    if (mode && value) {
      filter(mode, value);
    };
  }, [mode, value, filter]);

  const setModeAndValue = useCallback((mode: CharacterFilterFields, value: string) => {
    setMode(mode);
    setValue(value);
  }, []);

  return (
    <Filter filterValues={filterValues} setModeAndValue={setModeAndValue}/>
  )
}
