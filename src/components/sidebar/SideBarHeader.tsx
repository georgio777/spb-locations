import { useFetchAllCharacters } from '../../hooks/useFetchCharacter';
import type { Character } from '../../types/locations.types';
import { HeaderImg } from './HeaderImg';
import './SideBarHeader.css';
import { useParams } from 'react-router';

export const SideBarHeader = () => {
  const { id } = useParams()
  const { data: characters } = useFetchAllCharacters();

  const currentCharacter: Character | undefined = characters.find(character => character.id === Number(id));
  
  const showName = currentCharacter?.character !== currentCharacter?.title;
  
  return (
    <header className='sidebar-header'>
      <div className='sidebar-header__left'>
        <HeaderImg />
      </div>
        <div className="sidebar-header__info">
          { !currentCharacter
            ? <>
                <h1 className='sidebar-header__heading'>Литературные локации</h1>
              </>
            : (
            <>
              <h1 className='sidebar-header__heading'>{ currentCharacter.title }</h1>
              {showName && <p>{currentCharacter.character}</p>}
              <p className="sidebar-header__item">
                <span className='sidebar-header__item-colored'>Автор:</span> {currentCharacter.author}
              </p>
              <p className="sidebar-header__item">
                <span className='sidebar-header__item-colored'>Произведение:</span> {currentCharacter.fiction}
              </p>
              <p className="sidebar-header__item">
                <span className='sidebar-header__item-colored'>Адрес:</span> {currentCharacter.address}
              </p>
            </>
          )}
        </div>
    </header>
  );
};
