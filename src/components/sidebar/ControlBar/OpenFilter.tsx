import React from 'react';
import { useUtilStore } from '../../../store/useUtilStore';

interface OpenFilterProps {
  children: (props: { open: () => void; }) => React.ReactNode;
}

export const OpenFilter = ({ children }: OpenFilterProps) => {
  const setActivePanel = useUtilStore(state => state.setActivePanel)
  

  const handleOpen = () => {
    setActivePanel('filter')
  };

  return <>{children({ open: handleOpen })}</>;
};
