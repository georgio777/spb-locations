import { useCurrentCharacterStore, type Character } from '../../store/useCharactersStore';
import pin from '../../assets/pin.svg';
import './Pin.css'

export const Pin = ({character}: {character: Character}) => {
  const setCurrentCharacter = useCurrentCharacterStore(state => state.setCurrentCharacter);
  const onClick = () => {
    setCurrentCharacter(character);
  }
  return (
    <button onClick={onClick} className='pin-wrapper' title={character.title} aria-label={character.title}>
      <img className='pin-img' src={pin} aria-hidden="true" alt={character.title} />
    </button>
  );
};

export const ClusterPin = ({count}: {count: number}) => {
  return (
    <div className='cluster-wrapper' title='Расширить' aria-label='расширить'>
      <img className='cluster-img' src={pin} alt={`Локаций: ${count}`} />
      <span className="cluster-count">
        {count}
      </span>
    </div>
  );
};