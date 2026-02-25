import { Link } from 'react-router';
import { useFetchAllCharacters } from '../hooks/useFetchCharacter';
import { BlurryBackground } from './data-containers/BlurryBackground';
import './CharactersList.css';

export const CharactersList = () => {
  const { data: characters } = useFetchAllCharacters();

  return (
    <ul className="characters-list">
      <h2>Выберите персонажа, чтобы увидеть детали:</h2>
      
      { characters.map(character => (
        <li key={`list-item-${character.id}`} className="characters-list__item">
          <Link 
            to={`/${character.slug}/${character.id}?navigate=true`} 
            className="characters-list__link"
          >
            <BlurryBackground className='characters-list__bg'>
              {character.title}
            </BlurryBackground>
          </Link>
        </li>
      ))}
    </ul>
  );
};
