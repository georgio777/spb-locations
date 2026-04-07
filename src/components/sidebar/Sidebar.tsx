import './Sidebar.css';
import { useIsMobileStore } from '../../store/useIsMobileStore';
import { useEffect, useRef } from 'react';
import { BlurryBackground } from '../data-containers/BlurryBackground';
import { motion } from 'framer-motion';
import { SideBarContent } from './SideBarContent';
import { useParams } from 'react-router';
import { useSideBarStore } from '../../store/useSideBarStore';
import { useFilteredStore } from '../../store/useFilteredStore';

const ToggleArrowVertical = ({isOpen}: { isOpen: boolean}) => {
  const midX = isOpen ? 10 : 1;
  const edgeX = isOpen ? 1 : 10;
  return (
    <svg 
      width="40" 
      height="64" 
      viewBox="0 0 20 64" 
      fill="none"
      style={{ cursor: 'pointer' }}
    >
      <motion.path
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

const ToggleButton = ({isMobile} : {isMobile: boolean}) => {
  const isOpen = useSideBarStore(state => state.isOpen);
  const setIsOpen = useSideBarStore(state => state.setIsOpen);

  const toggleOpen = () => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  return (
    <button 
      className='sidebar-toggle-button'
      aria-expanded={isMobile}
      aria-controls="main-sidebar"
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      onClick={toggleOpen}
      >
        <BlurryBackground 
        className='sidebar-toggle-blurry'
        elementTag={'div'}>
          <ToggleArrowVertical isOpen={isOpen} />
          {/* <ToggleArrowVertical isOpen={isOpen} /> */}
        </BlurryBackground>
    </button>
  )
};

const getStyle = (isMobile: boolean, isOpen: boolean) => {
  if (isMobile) {
    return {
      transform: isOpen ? 'translateY(-100%)' : 'translateY(0)'
    }
  } else {
    return {
      transform: isOpen ? 'translateX(-100%)' : 'translateX(0)'
    }
  }
};


export const Sidebar = () => {
  const isMobile = useIsMobileStore(state => state.isMobile);
  // const [ isOpen, setIsOpen ] = useState(false);
  const isOpen = useSideBarStore(state => state.isOpen);
  const setIsOpen = useSideBarStore(state => state.setIsOpen);
  const sideBarRef = useRef<HTMLElement | null>(null);
  const { id } = useParams<{ id: string | undefined }>();
  const filteredLocations = useFilteredStore(state => state.filteredData);

  // Закрываем на мобилках когда локации отфильтрованы
  useEffect(() => {
    if (filteredLocations && isMobile) setIsOpen(false);
  }, [filteredLocations, setIsOpen, isMobile]);

  useEffect(() => {
    if (id) {
      setIsOpen(true);
    }
  }, [id, setIsOpen]);

  useEffect(() => {
    const node = sideBarRef.current;
    if (!node) return;

    node.dataset.noTransition = "true";

    // Первый кадр: фиксируем состояние "без анимации"
    const frame1 = requestAnimationFrame(() => {
      // Второй кадр: включаем анимацию обратно
      requestAnimationFrame(() => {
        node.dataset.noTransition = "false";
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
    };
  }, [isMobile]);

  const style = getStyle(isMobile, isOpen);

  return (
    <>
      <aside
      ref={sideBarRef}
      id='main-sidebar'
      style={style} 
      role="complementary" 
      aria-label='Меню локаций' 
      aria-hidden={!isOpen}
      inert={!isOpen ? true : undefined}
      className='sidebar textured-bg'>
        <div className="sidebar-border">
        </div>
        <SideBarContent id={id}/>
      </aside>
      <ToggleButton isMobile={isMobile}/>
    </>
  );
};
