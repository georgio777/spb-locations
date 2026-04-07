import { useRef } from 'react';
import { useFilterStore } from '../../store/useFilterStore';
import './FilterComponent.css';
import { useClickOutside } from '../../hooks/useClickOutside';
import { FilterWrapper } from './FilterWrapper';
import { AnimatePresence } from 'framer-motion';

export const FilterComponent = () => {
  const isOpen = useFilterStore(state => state.isOpen);
  const setIsOpen = useFilterStore(state => state.setIsOpen);
  const filterRef = useRef(null);

  useClickOutside(filterRef, () => setIsOpen(false));
  return (
    <AnimatePresence>
      { isOpen && 
          <nav className='filter-wrapper'>
            <div ref={filterRef} className="filter-inner">
              <FilterWrapper />
            </div>
          </nav>
        }
    </AnimatePresence>
  );
};
