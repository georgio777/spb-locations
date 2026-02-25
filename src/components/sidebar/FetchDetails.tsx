import React from 'react';
import { useFetchCharacterDetails } from '../../hooks/useFetchCharacter';
import { Divider } from './Divider';

export const FetchDetails = React.memo(({id} : { id: string }) => {

  const { data: details } = useFetchCharacterDetails(Number(id));
  console.log(details);
  
  return (
    <>
      <div>FetchDetails</div>
      <Divider/>
    </>
  );
});

