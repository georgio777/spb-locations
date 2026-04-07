import { create } from "zustand";

type ActivePanel = 'search' | 'filter' | null;

interface UtilStore {
  activePanel: ActivePanel;
  setActivePanel: (panel: ActivePanel) => void;
}

export const useUtilStore = create<UtilStore>((set) => ({
  activePanel: null,
  setActivePanel: (panel) => set({ activePanel: panel})
}));