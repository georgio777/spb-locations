import pinSoviet from '../../assets/pin-green-shadowed.svg';
import pinEmpire from '../../assets/pin-red-shadowed.svg';
import pinModern from '../../assets/pin-blue-shadowed.svg';
import './Pin.css';
import PopUpComponent, { type PopupData } from './PopUpComponent';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router';
import type { Character, Time } from '../../types/locations.types';
import { useCurrentCharacterStore } from '../../store/useCharactersStore';
import { motion } from 'framer-motion';

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

interface PinProps {
  character: Character;
  leafCoords?: [number, number];
  selected?: boolean;
}

export const Pin = React.memo(({character, leafCoords, selected = false}: PinProps) => {
  const navigate = useNavigate();
  const [ popupData, setPopupData ] = useState<PopupData | null>(null);  
  const setID = useCurrentCharacterStore(state => state.setCharacterID);

  const coords = leafCoords ? leafCoords : [character.coords.lng, character.coords.lat];

  const onClick = () => {
    navigate(`/${character.slug}/${character.id}`);
    setID(character.id);
  };

  const onHover = () => {
    setPopupData({lng: coords[0], lat: coords[1]});
  };
  return (
    <>
      <motion.button 
      animate={{ 
        scale: selected ? 1.3 : 1 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 700, 
        damping: 14 
      }}
      onMouseEnter={onHover}
      onMouseLeave={() => setPopupData(null)}
      onClick={onClick} 
      className='pin-button'
      // title={character.title} 
      aria-label={character.title}>
        <ImagePicker className={'pin-img'} period={character.time} />
      </motion.button>
      {popupData && 
        <PopUpComponent popUpData={popupData} onClose={() => setPopupData(null)}>
          <p>{character.character}</p>
          <p>{character.fiction}</p>
          <p>{character.author}</p>
          <p>{character.address}</p>
        </PopUpComponent>
      }
    </>
  );
});

export const ClusterPin = React.memo(({count, chars, coords}: {count: number, chars?: string[], coords: number[]}) => {
  const [ popupData, setPopupData ] = useState<PopupData | null>(null);  
  const onHover = () => {
    setPopupData({lng: coords[0], lat: coords[1]});
  };
  return (
    <>
      <div 
      onMouseEnter={onHover}
      onMouseLeave={() => setPopupData(null)}
      className='cluster-wrapper' 
      aria-label='расширить'>
        <ImagePicker className={'cluster-img'} />
        <span className="cluster-count">
          {count}
        </span>
      </div>
      {popupData && 
        <PopUpComponent popUpData={popupData} onClose={() => setPopupData(null)}>
          { chars?.map(char =>
            <p key={char}>{char}</p>
          )}
        </PopUpComponent>
      }
    </>
  );
});