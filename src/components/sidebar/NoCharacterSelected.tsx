import { CharactersList } from './CharactersList';
import './NoCharacterSelected.css';

export const NoCharacterSelected = () => {
  return (
    <main className='sidebar-content__no-character'>
      <CharactersList />
    </main>
  );
};
