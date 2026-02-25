import pinSoviet from '../../assets/pin-green-shadowed.svg';
import pinEmpire from '../../assets/pin-red-shadowed.svg';
import pinModern from '../../assets/pin-blue-shadowed.svg';
import './Pin.css';
import PopUpComponent, { type PopupData } from './PopUpComponent';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router';
import type { Character, Time } from '../../types/locations.types';

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

export const Pin = React.memo(({character}: {character: Character}) => {
  const navigate = useNavigate();
  const [ popupData, setPopupData ] = useState<PopupData | null>(null);  

  const onClick = () => {
    navigate(`/${character.slug}/${character.id}`);
  };

  const onHover = () => {
    setPopupData({lng: character.coords.lng, lat: character.coords.lat});
  };
  return (
    <>
      <button 
      onMouseEnter={onHover}
      onMouseLeave={() => setPopupData(null)}
      onClick={onClick} 
      className='pin-wrapper' 
      // title={character.title} 
      aria-label={character.title}>
        <ImagePicker className={'pin-img'} period={character.time} />
      </button>
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