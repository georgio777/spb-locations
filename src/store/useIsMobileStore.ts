import { create } from "zustand";

interface UseIsMobileStore {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

export const useIsMobileStore = create<UseIsMobileStore>((set) => ({
  isMobile: typeof window !== 'undefined' ? window.innerWidth < 1024 : false,
  setIsMobile: (isMobile) => set({ isMobile })
}));