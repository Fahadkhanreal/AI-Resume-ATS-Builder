import { create } from "zustand";

interface UIStore {
  sidebarOpen: boolean;
  previewZoom: number;
  activeSection: string | null;
  toggleSidebar: () => void;
  setPreviewZoom: (zoom: number) => void;
  setActiveSection: (sectionId: string | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  previewZoom: 1,
  activeSection: null,

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setPreviewZoom: (zoom: number) => {
    set({ previewZoom: Math.max(0.5, Math.min(2, zoom)) });
  },

  setActiveSection: (sectionId: string | null) => {
    set({ activeSection: sectionId });
  },
}));
