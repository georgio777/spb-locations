import './Sidebar.css';
import { useIsMobileStore } from '../../store/useIsMobileStore';
import { useEffect, useRef, useState } from 'react';
import { LiquidBackground } from './LiquidBackground';
import { motion } from 'framer-motion';

const ToggleArrowVertical = ({isOpen}: { isOpen: boolean}) => {
  const midX = isOpen ? 10 : 1;
  const edgeX = isOpen ? 1 : 10;
  return (
    <svg 
      width="40" 
      height="64" // Высота контейнера (с запасом под stroke)
      viewBox="0 0 20 64" 
      fill="none"
      style={{ cursor: 'pointer' }}
    >
      <motion.path
        // Анимируем строку пути (d)
        // M (начало сверху) -> L (центр) -> L (конец снизу)
        initial={false} 
        animate={{ 
          d: `M${edgeX} 2 L${midX} 32 L${edgeX} 62` 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 25 
        }}
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ToggleButton = ({isMobile, isOpen, toggleOpen} : {isMobile: boolean, isOpen: boolean, toggleOpen: () => void}) => {
  return (
    <button 
      className='sidebar-toggle-button'
      aria-expanded={isMobile}
      aria-controls="main-sidebar"
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      onClick={toggleOpen}
      >
        <LiquidBackground 
        className='sidebar-toggle-liquid'
        elementTag={'div'}>
          <ToggleArrowVertical isOpen={isOpen} />
          {/* <ToggleArrowVertical isOpen={isOpen} /> */}
        </LiquidBackground>
    </button>
  )
};

const desctopStyle = {
  width: '40vw',
  height: '100%',
  top: 0,
  right: 0,
  bottom: 0
}

const mobileStyle = {
  width: '100vw',
  height: '70dvh',
  top: 'auto',
  right: 0,
  bottom: 0
}

const getStyle = (isMobile: boolean, isOpen: boolean) => {
  if (isMobile) {
    return {
      ...mobileStyle,
      transform: isOpen ? 'translateY(0)' : 'translateY(100%)'
    }
  } else {
    return {
      ...desctopStyle,
      transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
    }
  }
};


export const Sidebar = () => {
  const isMobile = useIsMobileStore(state => state.isMobile);
  const [ isOpen, setIsOpen ] = useState(false);
  const sideBarRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = sideBarRef.current;
    if (!node) return;

    node.dataset.noTransition = "true";

    // Первый кадр: фиксируем состояние "без анимации"
    const frame1 = requestAnimationFrame(() => {
      // Второй кадр: включаем анимацию обратно
      // eslint-disable-next-line 
      const frame2 = requestAnimationFrame(() => {
        node.dataset.noTransition = "false";
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
    };
  }, [isMobile]);

  const toggleOpen = () => {
    setIsOpen(prev => !prev)
  }

  const style = getStyle(isMobile, isOpen);

  return (
    <>
      <aside
      ref={sideBarRef}
      id='main-sidebar'
      style={style} 
      role="complementary" aria-label='Меню локаций' 
      className='sidebar textured-bg'>
        <div className="sidebar-inner"></div>
      </aside>
      <ToggleButton isMobile={isMobile} isOpen={isOpen}  toggleOpen={toggleOpen}/>
    </>
  );
};
