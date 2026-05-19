import { create } from "zustand";
import { Resume, Section, Entry } from "@/types";

interface ResumeStore {
  currentResume: Resume | null;
  resumes: Resume[];
  setCurrentResume: (resume: Resume) => void;
  updatePersonalInfo: (info: Partial<Resume["personalInfo"]>) => void;
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  addEntry: (sectionId: string, entry: Entry) => void;
  deleteEntry: (sectionId: string, entryId: string) => void;
  reorderSections: (sections: Section[]) => void;
  deleteSection: (sectionId: string) => void;
  duplicateSection: (sectionId: string) => void;
  setATSScore: (score: number) => void;
  saveResume: (resumeId: string) => Promise<void>;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  currentResume: null,
  resumes: [],

  setCurrentResume: (resume: Resume) => {
    set({ currentResume: resume });
  },

  updatePersonalInfo: (info: Partial<Resume["personalInfo"]>) => {
    set((state) => {
      if (!state.currentResume) return state;
      return {
        currentResume: {
          ...state.currentResume,
          personalInfo: {
            ...state.currentResume.personalInfo,
            ...info,
          },
          updatedAt: new Date(),
        },
      };
    });
  },

  updateSection: (sectionId: string, updates: Partial<Section>) => {
    set((state) => {
      if (!state.currentResume) return state;
      return {
        currentResume: {
          ...state.currentResume,
          sections: state.currentResume.sections.map((section) =>
            section.id === sectionId ? { ...section, ...updates } : section
          ),
          updatedAt: new Date(),
        },
      };
    });
  },

  addEntry: (sectionId: string, entry: Entry) => {
    set((state) => {
      if (!state.currentResume) return state;
      return {
        currentResume: {
          ...state.currentResume,
          sections: state.currentResume.sections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  entries: [...(section.entries || []), entry],
                }
              : section
          ),
          updatedAt: new Date(),
        },
      };
    });
  },

  deleteEntry: (sectionId: string, entryId: string) => {
    set((state) => {
      if (!state.currentResume) return state;
      return {
        currentResume: {
          ...state.currentResume,
          sections: state.currentResume.sections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  entries: section.entries?.filter((e) => e.id !== entryId) || [],
                }
              : section
          ),
          updatedAt: new Date(),
        },
      };
    });
  },

  reorderSections: (sections: Section[]) => {
    set((state) => {
      if (!state.currentResume) return state;
      return {
        currentResume: {
          ...state.currentResume,
          sections,
          updatedAt: new Date(),
        },
      };
    });
  },

  deleteSection: (sectionId: string) => {
    set((state) => {
      if (!state.currentResume) return state;
      return {
        currentResume: {
          ...state.currentResume,
          sections: state.currentResume.sections.filter((s) => s.id !== sectionId),
          updatedAt: new Date(),
        },
      };
    });
  },

  duplicateSection: (sectionId: string) => {
    set((state) => {
      if (!state.currentResume) return state;
      const sectionToDuplicate = state.currentResume.sections.find(
        (s) => s.id === sectionId
      );
      if (!sectionToDuplicate) return state;

      const newSection = {
        ...sectionToDuplicate,
        id: `${sectionToDuplicate.id}_copy_${Date.now()}`,
      };

      return {
        currentResume: {
          ...state.currentResume,
          sections: [...state.currentResume.sections, newSection],
          updatedAt: new Date(),
        },
      };
    });
  },

  setATSScore: (score: number) => {
    set((state) => {
      if (!state.currentResume) return state;
      return {
        currentResume: {
          ...state.currentResume,
          atsScore: score,
        },
      };
    });
  },

  saveResume: async (resumeId: string) => {
    const state = get();
    if (!state.currentResume) return;

    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state.currentResume),
      });

      if (!response.ok) throw new Error("Failed to save resume");
    } catch (error) {
      console.error("Error saving resume:", error);
      throw error;
    }
  },
}));
