import { Link } from 'react-router';
import { useFetchAllCharacters } from '../../hooks/useFetchCharacter';
import { BlurryBackground } from '../data-containers/BlurryBackground';
import './CharactersList.css';
import { useFilteredStore } from '../../store/useFilteredStore';
import { memo } from 'react';

export const CharactersList = memo(() => {
  const { data: characters } = useFetchAllCharacters();
  const filteredData = useFilteredStore(state => state.filteredData);

  const dataToShow = filteredData ?? characters;
  return (
    <ul className="characters-list">
      <h2>Выберите персонажа, чтобы увидеть детали:</h2>
      
      { dataToShow.map(character => (
        <li key={`list-item-${character.id}`} className="characters-list__item">
          <Link 
            to={`/${character.slug}/${character.id}?navigate=true`} 
            className="characters-list__link"
          >
            <BlurryBackground className='characters-list__bg'>
              {character.title}, {character.address}
            </BlurryBackground>
          </Link>
        </li>
      ))}
    </ul>
  );
});
