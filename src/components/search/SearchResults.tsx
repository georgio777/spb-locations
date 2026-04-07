import type { SearchResults } from './Search';
import type { SearchKey } from '../../types/locations.types';
import { useFilter } from '../../hooks/useFilter';
import { useUtilStore } from '../../store/useUtilStore';


const ListItem = ({resultKey, resultValue}: {resultKey: SearchKey, resultValue: string}) => {
  const filterLocations = useFilter();
  const setActivePanel = useUtilStore(state => state.setActivePanel);

  const onClick = () => {
    filterLocations(resultKey, resultValue);
    setActivePanel(null);
  };

  const translate = (val: SearchKey) => {
    switch (val) {
      case 'character':
        return 'Персонаж'
      case 'fiction':
        return 'Произведение'
      case 'author':
        return 'Автор'
    }
  }

  return (
    <li 
    className='search-results-item'
    >
      <button onClick={onClick} className='search-results-button'>{resultValue}: <span>{translate(resultKey)}</span></button>
    </li>
  )
}

export const SearchResultsComponent = ({searchResults}: {searchResults: SearchResults}) => {
  return (
    <ul 
    className="search-results-list">
      { searchResults.map(result => (
        <ListItem key={`${result.key}-${result.value}`} resultKey={result.key} resultValue={result.value} />
      ))}
    </ul>
  )
}
