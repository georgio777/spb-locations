import { create } from "zustand";
import type {MapRef} from 'react-map-gl/maplibre';
import type maplibregl from 'maplibre-gl';

interface UseMapStore {
  map: MapRef | null;
  isReady: boolean;
  geolocate: maplibregl.GeolocateControl | null;
  setMap: (map: MapRef) => void;
  setGeolocate: (control: maplibregl.GeolocateControl | null) => void;
}

export const useMapStore = create<UseMapStore>((set) => ({
  map: null,
  isReady: false,
  geolocate: null,
  setMap: (map: MapRef) => set({ map, isReady: true }),
  setGeolocate: (geolocate) => set({ geolocate }),
}))