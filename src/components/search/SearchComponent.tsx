import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlurryBackground } from '../data-containers/BlurryBackground';
import { useSearchStore } from '../../store/useSearchStore';
import './SearchComponent.css';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useFetchAllCharacters } from '../../hooks/useFetchCharacter';
import { Search } from './Search';
import { useFilteredStore } from '../../store/useFilteredStore';
import { closeIcon2 } from '../../svgIcons';
import { ToolButton } from '../buttons/ToolButton';

const containerVariants = {
  open: {
    scaleY: 1,
    transition: { when: "beforeChildren" }
  },
  closed: {
    scaleY: 0,
    transition: { when: "afterChildren" }
  }
} as const

const resultsVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { when: "beforeChildren" }
  },
  closed: {
    y: -10,
    opacity: 0,
    transition: { when: "afterChildren" }
  }
}

export const SearchComponent = () => {
  const isOpen = useSearchStore(state => state.isOpen);
  const setClosed = useSearchStore(state => state.setClosed);
  const [inputValue, setInputValue] = useState<string>('');
  const containerRef = useRef(null);
  const { data: characters } = useFetchAllCharacters();
  const filteredLocations = useFilteredStore(state => state.filteredData);

  useEffect(() => {
    if (filteredLocations) setClosed();
  }, [filteredLocations, setClosed]);

  useClickOutside(containerRef, setClosed);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClick = () => {
    setInputValue('');
    setClosed();
  };

  return (
    <AnimatePresence>
      {isOpen && (
      <div className="search-container">

        <motion.div
        variants={containerVariants}
        initial="closed"
        animate="open"
        exit="closed"
        ref={containerRef}
        key="search-input-container"
        className="search-input-container"
        >
          <BlurryBackground className="search-input-wrapper">
            <input
              id='search-input'
              onChange={onInput}
              value={inputValue}
              className="search-input"
              autoFocus
              type="text"
              placeholder="Поиск..."
            />
            <ToolButton onClick={onClick} className='search-input-clear-button'>
              { closeIcon2 }
            </ToolButton>
          </BlurryBackground>

          {/* Наследует состояние от родителя автоматически */}
          <motion.div
          variants={resultsVariants}
          className="search-results-wrapper"
          >
            <BlurryBackground className="search-results-list-wrapper">
              <h2 className="search-results-heading">Результаты поиска:</h2>
              <Search characters={characters} inputValue={inputValue} />
            </BlurryBackground>
            
          </motion.div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
