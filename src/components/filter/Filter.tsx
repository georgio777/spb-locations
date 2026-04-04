import { motion } from 'framer-motion'
import { useState } from 'react';
import './Filter.css';
import type { FilterValues } from './FilterWrapper';
import type { CharacterFilterFields, Time } from '../../types/locations.types';
import { ImagePicker } from '../map/Pin';

const headervariants = {
  open: {
    scaleY: 1, y: 0, opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.06 }
  },
  closed: {
    y: -10, scaleY: 0, opacity: 0,
    transition: { 
      when: "afterChildren", 
      delayChildren: 0.2,
      staggerChildren: 0.06, 
      staggerDirection: -1 
    }
  }
}


const mainVariants = {
  open: {
    scaleY: 1,
    y: 0,
    opacity: 1,
    transition: { 
      delay: 0.6,
    }
  },
  closed: {
    y: -10,
    scaleY: 0,
    opacity: 0,
    transition: { 
    }
  }
}


const itemVariants = {
  open: {
    x: 0,
    opacity: 1
  },
  closed: {
    x: -10,
    opacity: 0
  }
}

interface ItemProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const Item = ({ children, isActive, onClick }: ItemProps) => {
  return (
    <motion.li 
      variants={itemVariants} 
      className="filter-item"
      onClick={onClick}
    >
      {/* Если этот таб активен, рисуем фон с layoutId */}
      {isActive && (
        <motion.div 
          layoutId="active-pill"
          className="underline"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <button style={{cursor: 'pointer' }}>
        {children}
      </button>
      
    </motion.li>
  )
}

interface Tab {
  name: string;
  value: keyof FilterValues;
  mode: CharacterFilterFields;
}

const tabs: Tab[] = [{
    name: 'Персонажи',
    value: 'charactersNames',
    mode: 'character'
  },
  {
    name: 'Авторы',
    value: 'authors',
    mode: 'author'
  },
  {
    name: 'Произведения',
    value: 'fictions',
    mode: 'fiction'
  },
  {
    name: 'Периоды',
    value: 'periods',
    mode: 'time'
  }
];

interface FilterProps {
  filterValues: FilterValues;
  setModeAndValue: (mode: CharacterFilterFields, value: string) => void;
}


export const Filter = ({filterValues, setModeAndValue} : FilterProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const mode = filterValues[activeTab].mode;

  const onClickFilter = (value: string) => {
    setModeAndValue(mode, value);
  };

  
  return (
    <>
      <motion.header 
        key="filter-header"
        variants={headervariants}
        initial="closed"
        animate="open"
        exit="closed"
        className='filter-header'
      >
        <motion.ul className='filter-header__list'>
          {tabs.map(tab => (
            <Item 
              key={tab.value} 
              isActive={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.name}
            </Item>
          ))}
        </motion.ul>
      </motion.header>

      <motion.main 
      key="filter-body"
      variants={mainVariants}
      initial="closed"
      animate="open"
      exit="closed"
      className="filter-body">
        <motion.ul className='filter-body-list'>
          { filterValues[activeTab].data.map(value => 
            <li className='filter-body-list-item' key={value}>
              <motion.button 
              onClick={() => onClickFilter(value)}
              key={`${value}-button`} 
              whileHover={{scale: 1.06}} 
              className='filter-body-list-button'>
                {mode === 'time' && (
                  <ImagePicker className='filter-period-img' period={value as Time} />
                )}
                {value}
              </motion.button>
            </li>
          )}
        </motion.ul>
      </motion.main>
    </>
  )
}
