import { memo } from 'react';
import { CharactersList } from './CharactersList';
import './NoCharacterSelected.css';

export const NoCharacterSelected = memo(() => {
  return (
    <main className='sidebar-content__no-character'>
      <CharactersList />
    </main>
  );
});
