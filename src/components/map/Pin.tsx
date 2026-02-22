import { useCurrentCharacterStore, type Character, type Time } from '../../store/useCharactersStore';
import pinSoviet from '../../assets/pin-green-shadowed.svg';
import pinEmpire from '../../assets/pin-red-shadowed.svg';
import pinModern from '../../assets/pin-blue-shadowed.svg';
import './Pin.css';

const getImg = (period: Time) => {
  switch (period) {
    case 'Дореволюционный':
      return pinEmpire;
    case 'Советский':
      return pinSoviet;
    case 'Современный':
      return pinModern
    default:
      return pinEmpire;
  }
}

const ImagePicker = ({ period = 'Дореволюционный', className }: {period?: Time, className: string}) => {
  return (
    <img 
    className={className} 
    src={getImg(period)} 
    aria-hidden="true" 
    />
  )
};

export const Pin = ({character}: {character: Character}) => {
  const setCurrentCharacter = useCurrentCharacterStore(state => state.setCurrentCharacter);
  const onClick = () => {
    setCurrentCharacter(character);
  };
  return (
    <button onClick={onClick} className='pin-wrapper' title={character.title} aria-label={character.title}>
      <ImagePicker className={'pin-img'} period={character.time} />
    </button>
  );
};

export const ClusterPin = ({count}: {count: number}) => {
  return (
    <div className='cluster-wrapper' title='Расширить' aria-label='расширить'>
      <ImagePicker className={'cluster-img'} />
      <span className="cluster-count">
        {count}
      </span>
    </div>
  );
};