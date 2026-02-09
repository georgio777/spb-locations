import { useEffect } from 'react';
import './App.css'
import { useCharactersStore, useCurrentCharacterStore } from './store/useCharactersStore'

function App() {
  const fetch1 = useCharactersStore(state => state.fetchAllCharacters);
  const fetch2 = useCurrentCharacterStore(state => state.fetchCompleteLocation)

  useEffect(() => {
    fetch1()
    fetch2(36)
  }, []);

  return (
    <>
    </>
  )
}

export default App
