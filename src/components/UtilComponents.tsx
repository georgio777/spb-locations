import { SearchComponent } from './search/SearchComponent'
import { FilterComponent } from './filter/FilterComponent'
import { AnimatePresence } from 'framer-motion';
import { useUtilStore } from '../store/useUtilStore';

export const UtilComponents = () => {
  const activePanel = useUtilStore(state => state.activePanel);
  return (
  <AnimatePresence mode="wait"> 
    {activePanel === 'search' && <SearchComponent key="search" />}
    {activePanel === 'filter' && <FilterComponent key="filter" />}
  </AnimatePresence>
  );
};
