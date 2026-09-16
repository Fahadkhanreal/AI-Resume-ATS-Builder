import { create } from "zustand";
import { Resume, Section, Entry } from "@/types";

function preferFilledArray(primary: any, fallback: any) {
  return Array.isArray(primary) && primary.length > 0 ? primary : fallback ?? [];
}

function getCompleteResumeData(resume: Resume, overrides: Record<string, any> = {}) {
  const existingData = (resume as any).data ?? {};

  const personalInfo =
    overrides.personalInfo !== undefined
      ? overrides.personalInfo
      : {
          ...(existingData.personalInfo ?? {}),
          ...(resume.personalInfo ?? {}),
        };

  return {
    ...existingData,
    personalInfo,
    experience:
      overrides.experience ??
      resume.experience ??
      existingData.experience ??
      [],
    education:
      overrides.education ??
      resume.education ??
      existingData.education ??
      [],
    skills:
      overrides.skills ??
      resume.skills ??
      existingData.skills ??
      [],
    projects:
      overrides.projects ??
      resume.projects ??
      existingData.projects ??
      [],
    certifications:
      overrides.certifications ??
      resume.certifications ??
      existingData.certifications ??
      [],
  };
}

function normalizeResume(resume: Resume): Resume {
  const data = (resume as any).data ?? {};
  const personalInfo = {
    ...(data.personalInfo ?? {}),
    ...(resume.personalInfo ?? {}),
  };

  const completeData = {
    ...data,
    personalInfo,
    experience: preferFilledArray(resume.experience, data.experience),
    education: preferFilledArray(resume.education, data.education),
    skills: preferFilledArray(resume.skills, data.skills),
    projects: preferFilledArray(resume.projects, data.projects),
    certifications: preferFilledArray(resume.certifications, data.certifications),
  };

  return {
    ...resume,
    personalInfo,
    summary: resume.summary ?? personalInfo.summary ?? data.personalInfo?.summary ?? "",
    experience: completeData.experience,
    education: completeData.education,
    skills: completeData.skills,
    projects: completeData.projects,
    certifications: completeData.certifications,
    data: completeData,
  } as Resume;
}

interface ResumeStore {
  currentResume: Resume | null;
  resumes: Resume[];
  setCurrentResume: (resume: Resume) => void;
  updatePersonalInfo: (info: Partial<Resume["personalInfo"]>) => void;
  updateSummary: (summary: string) => void;
  updateEducation: (education: Resume["education"]) => void;
  updateExperience: (experience: Resume["experience"]) => void;
  updateSkills: (skills: Resume["skills"]) => void;
  updateProjects: (projects: Resume["projects"]) => void;
  updateCertifications: (certifications: Resume["certifications"]) => void;
  updateTemplate: (template: string) => void;
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
    set({ currentResume: normalizeResume(resume) });
  },

  updatePersonalInfo: (info: Partial<Resume["personalInfo"]>) => {
    set((state) => {
      if (!state.currentResume) return state;
      const safeInfo = Object.fromEntries(
        Object.entries(info ?? {}).filter(([, value]) => value !== undefined)
      ) as Partial<Resume["personalInfo"]>;
      const personalInfo = {
        ...((state.currentResume as any).data?.personalInfo ?? {}),
        ...(state.currentResume.personalInfo ?? {}),
        ...safeInfo,
      } as Resume["personalInfo"];

      return {
        currentResume: {
          ...state.currentResume,
          personalInfo,
          data: getCompleteResumeData(state.currentResume, { personalInfo }),
          updatedAt: new Date(),
        } as Resume,
      };
    });
  },

  updateSummary: (summary: string) => {
    set((state) => {
      if (!state.currentResume) return state;
      const personalInfo = {
        ...(state.currentResume as any).data?.personalInfo,
        ...state.currentResume.personalInfo,
        summary,
      } as Resume["personalInfo"];

      return {
        currentResume: {
          ...state.currentResume,
          summary,
          personalInfo,
          data: getCompleteResumeData(state.currentResume, { personalInfo }),
          updatedAt: new Date(),
        } as Resume,
      };
    });
  },

  updateEducation: (education: Resume["education"]) => {
    set((state) => {
      if (!state.currentResume) return state;
      return {
        currentResume: {
          ...state.currentResume,
          education,
          data: getCompleteResumeData(state.currentResume, { education }),
          updatedAt: new Date(),
        } as Resume,
      };
    });
  },

  updateExperience: (experience: Resume["experience"]) => {
    set((state) => {
      if (!state.currentResume) return state;
      return {
        currentResume: {
          ...state.currentResume,
          experience,
          data: getCompleteResumeData(state.currentResume, { experience }),
          updatedAt: new Date(),
        } as Resume,
      };
    });
  },

  updateSkills: (skills: Resume["skills"]) => {
    set((state) => {
      if (!state.currentResume) return state;
      const normalizedSkills = (Array.isArray(skills) ? skills : [])
        .map((skill: any) =>
          typeof skill === "string" ? skill : skill?.name || skill?.label || ""
        )
        .filter(Boolean);

      return {
        currentResume: {
          ...state.currentResume,
          skills: normalizedSkills,
          data: getCompleteResumeData(state.currentResume, { skills: normalizedSkills }),
          updatedAt: new Date(),
        } as Resume,
      };
    });
  },

  updateProjects: (projects: Resume["projects"]) => {
    set((state) => {
      if (!state.currentResume) return state;
      return {
        currentResume: {
          ...state.currentResume,
          projects,
          data: getCompleteResumeData(state.currentResume, { projects }),
          updatedAt: new Date(),
        } as Resume,
      };
    });
  },

  updateCertifications: (certifications: Resume["certifications"]) => {
    set((state) => {
      if (!state.currentResume) return state;
      return {
        currentResume: {
          ...state.currentResume,
          certifications,
          data: getCompleteResumeData(state.currentResume, { certifications }),
          updatedAt: new Date(),
        } as Resume,
      };
    });
  },

  updateTemplate: (template: string) => {
    set((state) => {
      if (!state.currentResume) return state;
      return {
        currentResume: {
          ...state.currentResume,
          template,
          templateId: template,
          updatedAt: new Date(),
        } as Resume,
      };
    });
  },

  updateSection: (sectionId: string, updates: Partial<Section>) => {
    set((state) => {
      if (!state.currentResume) return state;
      const sections = state.currentResume.sections ?? [];
      return {
        currentResume: {
          ...state.currentResume,
          sections: sections.map((section) =>
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
      const sections = state.currentResume.sections ?? [];
      return {
        currentResume: {
          ...state.currentResume,
          sections: sections.map((section) =>
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
      const sections = state.currentResume.sections ?? [];
      return {
        currentResume: {
          ...state.currentResume,
          sections: sections.map((section) =>
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
      const sections = state.currentResume.sections ?? [];
      const nextSections = sections.some((section) => section.id === sectionId)
        ? sections.map((section) =>
            section.id === sectionId ? { ...section, isVisible: false } : section
          )
        : [
            ...sections,
            {
              id: sectionId,
              type: sectionId as Section["type"],
              title: sectionId,
              content: "",
              order: sections.length,
              isVisible: false,
            },
          ];

      return {
        currentResume: {
          ...state.currentResume,
          sections: nextSections,
          updatedAt: new Date(),
        },
      };
    });
  },

  duplicateSection: (sectionId: string) => {
    set((state) => {
      if (!state.currentResume) return state;
      const sections = state.currentResume.sections ?? [];
      const sectionToDuplicate = sections.find((s) => s.id === sectionId);
      if (!sectionToDuplicate) return state;

      const newSection = {
        ...sectionToDuplicate,
        id: `${sectionToDuplicate.id}_copy_${Date.now()}`,
      };

      return {
        currentResume: {
          ...state.currentResume,
          sections: [...sections, newSection],
          updatedAt: new Date(),
        },
      };
    });
  },

  setATSScore: (score: number) => {
    set((state) => {
      if (!state.currentResume) return state;
      const normalizedResume = normalizeResume(state.currentResume);

      return {
        currentResume: {
          ...normalizedResume,
          atsScore: score,
          data: getCompleteResumeData(normalizedResume),
        },
      };
    });
  },

  saveResume: async (resumeId: string) => {
    const state = get();
    if (!state.currentResume) return;

    try {
      const completeData = getCompleteResumeData(state.currentResume);
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: state.currentResume.title,
          templateId: (state.currentResume as any).templateId || state.currentResume.template || "modern",
          data: completeData,
          atsScore: state.currentResume.atsScore,
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json") ? await response.json() : null;
      if (!response.ok) throw new Error(result?.error || `Failed to save resume (${response.status})`);
    } catch (error) {
      console.error("Error saving resume:", error);
      throw error;
    }
  },
}));
