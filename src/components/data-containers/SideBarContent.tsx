import { useCurrentCharacterStore } from '../../store/useCharactersStore'

export const SideBarContent = () => {
  const currentCharacter = useCurrentCharacterStore(state => state.currentCharacter);
  return (
    <div>{ currentCharacter ? currentCharacter.descriptions[0].heading : 'пока пусто'}</div>
  );
};