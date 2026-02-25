import React from 'react';
import { useFetchCharacterDetails } from '../../hooks/useFetchCharacter';
import { Details } from './Details';

export const FetchDetails = React.memo(({id} : { id: string }) => {

  const { data: details } = useFetchCharacterDetails(Number(id));
  
  return (
    <Details details={details} />
  );
});

