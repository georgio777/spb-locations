import { create } from "zustand";

interface UseSideBarStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSideBarStore = create<UseSideBarStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));