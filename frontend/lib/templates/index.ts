export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: "modern" | "classic" | "minimal" | "corporate" | "tech";
  isAtsFriendly: boolean;
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean layout with strong visual hierarchy.",
    category: "modern",
    isAtsFriendly: true,
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional resume format for formal industries.",
    category: "classic",
    isAtsFriendly: true,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple text-first layout for maximum readability.",
    category: "minimal",
    isAtsFriendly: true,
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional layout for business roles.",
    category: "corporate",
    isAtsFriendly: true,
  },
  {
    id: "tech",
    name: "Tech",
    description: "Optimized for engineers and technical roles.",
    category: "tech",
    isAtsFriendly: true,
  },
];

export function getTemplateById(templateId: string) {
  return resumeTemplates.find((template) => template.id === templateId);
}
