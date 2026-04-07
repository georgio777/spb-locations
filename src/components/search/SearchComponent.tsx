import { memo, useRef, useState, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { BlurryBackground } from '../data-containers/BlurryBackground';
import './SearchComponent.css';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useFetchAllCharacters } from '../../hooks/useFetchCharacter';
import { Search } from './Search';
import { closeIcon2 } from '../../svgIcons';
import { ToolButton } from '../buttons/ToolButton';
import { useUtilStore } from '../../store/useUtilStore';

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

export const SearchComponent = memo(() => {
  const [inputValue, setInputValue] = useState<string>('');
  const containerRef = useRef(null);
  const { data: characters } = useFetchAllCharacters();
  const setActivePanel = useUtilStore(state => state.setActivePanel)

  useClickOutside(containerRef, 
    () => setActivePanel(null)
  );

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClick = () => {
    setInputValue('');
    setActivePanel(null);
  };

  return (
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
  );
});
