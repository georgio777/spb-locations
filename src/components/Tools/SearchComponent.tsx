import { useRef, useState, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlurryBackground } from '../data-containers/BlurryBackground';
import { useSearchStore } from '../../store/useSearchStore';
import './SearchComponent.css';
import { useClickOutside } from '../../hooks/useClickOutside';

const containerVariants = {
  open: { 
    transform: 'scaleY(100%)',
    transition: {
      delay: 0,
      duration: 0.3
    }
  },
  closed: { 
    transform: 'scaleY(0%)',
    transition: {
      when: 'afterChildren'
    }
  }
};

const resultsVariants = {
  open: { 
    width: '100%',
    transition: {
      delay: 0.3
    }
  },
  closed: { 
    width: '0%'
  }
};

export const SearchComponent = () => {
  const isOpen = useSearchStore(state => state.isOpen);
  const setClosed = useSearchStore(state => state.setClosed);
  const [inputValue, setInputValue] = useState<string>('');
  const containerRef = useRef(null);

  useClickOutside(containerRef, setClosed);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          key="search-container-container"
          variants={containerVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="search-input-container"
        >
          <BlurryBackground className="search-input-wrapper">
            <input
              onChange={onInput}
              value={inputValue}
              className="search-input"
              autoFocus
              type="text"
              placeholder="Поиск..."
            />
          </BlurryBackground>

          {/* Наследует состояние от родителя автоматически */}
          <motion.div
            variants={resultsVariants}
            className="search-results-wrapper"
          >
            <BlurryBackground elementTag="ul" className="search-results-list">
              
              <h2 className="search-results-heading">Результаты поиска:</h2>
              
              {/* Тут будет твой .map() */}
            </BlurryBackground>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
