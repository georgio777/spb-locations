import { useEffect } from 'react';
import { useIsMobileStore } from '../store/useIsMobileStore';

export const useIsMobile = () => {
  const setIsMobile = useIsMobileStore(state => state.setIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile]);
};