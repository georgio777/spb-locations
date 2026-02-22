import { create } from "zustand";

interface UseMapStore {
  isReady: boolean;
  setMapReady: () => void;
}

export const useMapStore = create<UseMapStore>((set) => ({
  isReady: false,
  setMapReady: () => set({ isReady: true }),
}))