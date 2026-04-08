import React from 'react';
import { useUtilStore } from '../../store/useUtilStore';

interface OpenFilterProps {
  children: (props: { open: () => void; activePanel: boolean; }) => React.ReactNode;
}

export const OpenFilter = ({ children }: OpenFilterProps) => {
  const setActivePanel = useUtilStore(state => state.setActivePanel)
  const activePanel = useUtilStore(state => state.activePanel);

  const handleOpen = () => {
    setActivePanel('filter')
  };

  return <>{children({ open: handleOpen, activePanel: activePanel === 'filter' })}</>;
};
