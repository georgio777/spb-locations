import { useRef } from 'react';
import './FilterComponent.css';
import { useClickOutside } from '../../hooks/useClickOutside';
import { FilterWrapper } from './FilterWrapper';
import { useUtilStore } from '../../store/useUtilStore';

export const FilterComponent = () => {
  const filterRef = useRef(null);
  const setActivePanel = useUtilStore(state => state.setActivePanel)
  

  useClickOutside(filterRef, 
    () => setActivePanel(null)
  );
  return (
    <nav className='filter-wrapper'>
      <div ref={filterRef} className="filter-inner">
        <FilterWrapper />
      </div>
    </nav>
  );
};
