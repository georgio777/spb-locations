import { create } from "zustand";

interface UseFilterStore {
  isOpen: boolean;
  setIsOpen: ( isOpen: boolean ) => void;
}

export const useFilterStore = create<UseFilterStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen })
}));