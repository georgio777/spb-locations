import React from 'react';
import { useFilterStore } from '../../../store/useFilterStore';

interface OpenFilterProps {
  children: (props: { open: () => void; isOpen: boolean }) => React.ReactNode;
}

export const OpenFilter = ({ children }: OpenFilterProps) => {
  const isOpen = useFilterStore(state => state.isOpen);
  const setIsOpen = useFilterStore(state => state.setIsOpen);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return <>{children({ open: handleOpen, isOpen })}</>;
};
