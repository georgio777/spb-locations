import { create } from "zustand";
import type { Characters } from "../types/locations.types";

interface UseFilteredStore {
  filteredData: Characters | null;
  setFilteredData: (data: Characters) => void;
  clearFilteredData: () => void;
};

export const useFilteredStore = create<UseFilteredStore>((set) => ({
  filteredData: null,
  setFilteredData: (data) => {
    set({ filteredData: data });
  },
  clearFilteredData: () => set({ filteredData: null })
}));