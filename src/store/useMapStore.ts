import { create } from "zustand";
import type {MapRef} from 'react-map-gl/maplibre';

interface UseMapStore {
  map: MapRef | null;
  isReady: boolean;
  setMap: (map: MapRef) => void;
}

export const useMapStore = create<UseMapStore>((set) => ({
  map: null,
  isReady: false,
  setMap: (map: MapRef) => set({ map, isReady: true })
}))