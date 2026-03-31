import { create } from "zustand";

interface UseSearchStore {
  isOpen: boolean;
  setOpen: () => void;
  setClosed: () => void;
  toggleOpen: () => void;
}

export const useSearchStore = create<UseSearchStore>((set, get) => ({
  isOpen: false,
  setOpen: () => {    
    set({ isOpen: true});
  },
  setClosed: () => {
    set({ isOpen: false});
  },
  toggleOpen: () => set({ isOpen: !get().isOpen})
}))