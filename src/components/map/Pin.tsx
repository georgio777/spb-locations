import type { Character } from '../../store/useCharactersStore';
import pin from '../../assets/pin.svg';
import './Pin.css'

export const Pin = ({character}: {character: Character}) => {
  return (
    <div className='pin-wrapper'>
      <img className='pin-img' src={pin} alt={character.title} title={character.title} />
    </div>
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