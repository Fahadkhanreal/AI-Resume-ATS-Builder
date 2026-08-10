// PDF template styling — maps resume template ids to PDF-friendly colors.
// Mirrors the color accents used in components/resume/templates/registry.ts.
// Layouts: "standard" | "sidebar" | "compact"  (same semantics as the registry).

export type PdfLayout = "standard" | "sidebar" | "compact";

export interface PdfTemplateStyle {
  id: string;
  name: string;
  accent: string; // primary brand color
  headingColor: string; // section heading color
  skillBg: string; // skill chip background
  skillText: string; // skill chip text color
  softBg: string; // subtle section background
  headerBg?: string; // if set, header uses this background
  headerText?: string; // header text color when headerBg is set
  fontFamily?: "Helvetica" | "Times-Roman" | "Courier";
  layout: PdfLayout;
}

const DEFAULT: PdfTemplateStyle = {
  id: "modern",
  name: "Modern ATS",
  accent: "#059669",
  headingColor: "#0f766e",
  skillBg: "#a7f3d0",
  skillText: "#065f46",
  softBg: "#f8fafc",
  headerText: "#111827",
  layout: "standard",
};

const C = {
  emerald: "#059669",
  amber: "#b45309",
  indigo: "#4338ca",
  blue: "#1d4ed8",
  sky: "#0369a1",
  slate: "#334155",
  slateDark: "#0f172a",
  green: "#166534",
  zinc: "#18181b",
  cyan: "#0e7490",
  pink: "#db2777",
  purple: "#7e22ce",
  orange: "#ea580c",
  fuchsia: "#c026d3",
  violet: "#7c3aed",
  red: "#b91c1c",
  platinum: "#111827",
} as const;

export const PDF_TEMPLATE_STYLES: Record<string, PdfTemplateStyle> = {
  modern: { ...DEFAULT },

  executive: {
    id: "executive", name: "Executive Board", accent: C.amber, headingColor: "#92400e",
    skillBg: "#fde68a", skillText: "#78350f", softBg: "#fffbeb", fontFamily: "Times-Roman", layout: "standard",
  },
  consultant: {
    id: "consultant", name: "Consultant Pro", accent: C.indigo, headingColor: "#4338ca",
    skillBg: "#e0e7ff", skillText: "#3730a3", softBg: "#eef2ff", layout: "standard",
  },
  tech: {
    id: "tech", name: "Tech Lead", accent: C.blue, headingColor: "#1e40af",
    skillBg: "#dbeafe", skillText: "#1e3a8a", softBg: "#f1f5f9", fontFamily: "Courier", layout: "standard",
  },
  product: {
    id: "product", name: "Product Manager", accent: C.sky, headingColor: "#075985",
    skillBg: "#e0f2fe", skillText: "#0c4a6e", softBg: "#f0f9ff", headerBg: "#0369a1", headerText: "#e0f2fe", layout: "standard",
  },
  minimal: {
    id: "minimal", name: "Minimal One Page", accent: C.slate, headingColor: "#1e293b",
    skillBg: "#f1f5f9", skillText: "#334155", softBg: "#f8fafc", layout: "compact",
  },
  corporate: {
    id: "corporate", name: "Corporate Formal", accent: "#1e293b", headingColor: "#0f172a",
    skillBg: "#e2e8f0", skillText: "#1e293b", softBg: "#f8fafc", fontFamily: "Times-Roman", layout: "standard",
  },
  finance: {
    id: "finance", name: "Finance Analyst", accent: C.green, headingColor: "#14532d",
    skillBg: "#dcfce7", skillText: "#14532d", softBg: "#f8fafc", fontFamily: "Times-Roman", layout: "standard",
  },
  legal: {
    id: "legal", name: "Legal Counsel", accent: C.zinc, headingColor: "#18181b",
    skillBg: "#f4f4f5", skillText: "#18181b", softBg: "#fafafa", fontFamily: "Times-Roman", layout: "standard",
  },
  medical: {
    id: "medical", name: "Healthcare CV", accent: C.cyan, headingColor: "#155e75",
    skillBg: "#cffafe", skillText: "#164e63", softBg: "#f0f9ff", layout: "standard",
  },
  designer: {
    id: "designer", name: "UX Designer", accent: C.pink, headingColor: "#be185d",
    skillBg: "#fce7f3", skillText: "#9d174d", softBg: "#fdf2f8", layout: "sidebar",
  },
  creative: {
    id: "creative", name: "Creative Studio", accent: C.purple, headingColor: "#6b21a8",
    skillBg: "#f3e8ff", skillText: "#581c87", softBg: "#faf5ff", headerBg: "#7e22ce", headerText: "#f3e8ff", layout: "sidebar",
  },
  sales: {
    id: "sales", name: "Sales Growth", accent: C.orange, headingColor: "#c2410c",
    skillBg: "#ffedd5", skillText: "#9a3412", softBg: "#fff7ed", headerBg: "#ea580c", headerText: "#fff7ed", layout: "standard",
  },
  marketing: {
    id: "marketing", name: "Marketing Lead", accent: C.fuchsia, headingColor: "#a21caf",
    skillBg: "#fae8ff", skillText: "#86198f", softBg: "#fdf4ff", layout: "standard",
  },
  academic: {
    id: "academic", name: "Academic CV", accent: "#0f172a", headingColor: "#0f172a",
    skillBg: "#e2e8f0", skillText: "#0f172a", softBg: "#fafafa", fontFamily: "Times-Roman", layout: "standard",
  },
  graduate: {
    id: "graduate", name: "Graduate Starter", accent: C.violet, headingColor: "#6d28d9",
    skillBg: "#ede9fe", skillText: "#5b21b6", softBg: "#f5f3ff", layout: "compact",
  },
  compact: {
    id: "compact", name: "Compact Pro", accent: C.slate, headingColor: "#1e293b",
    skillBg: "#f1f5f9", skillText: "#334155", softBg: "#f8fafc", layout: "compact",
  },
  premium: {
    id: "premium", name: "Premium Card", accent: C.amber, headingColor: "#92400e",
    skillBg: "#fde68a", skillText: "#78350f", softBg: "#fffbeb", fontFamily: "Times-Roman", layout: "standard",
  },
  clean: {
    id: "clean", name: "Clean Recruiter", accent: "#1f2937", headingColor: "#111827",
    skillBg: "#f1f5f9", skillText: "#1f2937", softBg: "#f8fafc", layout: "standard",
  },
  international: {
    id: "international", name: "International CV", accent: C.red, headingColor: "#991b1b",
    skillBg: "#fee2e2", skillText: "#7f1d1d", softBg: "#fef2f2", layout: "standard",
  },
  platinum: {
    id: "platinum", name: "Platinum Elite", accent: C.platinum, headingColor: "#0f172a",
    skillBg: "#1f2937", skillText: "#f9fafb", softBg: "#f8fafc", headerBg: "#111827", headerText: "#e5e7eb", layout: "sidebar",
  },
  "neo-luxury": {
    id: "neo-luxury", name: "Neo Luxury", accent: "#047857", headingColor: "#065f46",
    skillBg: "#a7f3d0", skillText: "#064e3b", softBg: "#ecfdf5", layout: "standard",
  },
  magazine: {
    id: "magazine", name: "Magazine Pro", accent: "#0f172a", headingColor: "#0f172a",
    skillBg: "#18181b", skillText: "#fafafa", softBg: "#fafafa", fontFamily: "Times-Roman", layout: "standard",
  },
  founder: {
    id: "founder", name: "Founder Mode", accent: C.orange, headingColor: "#c2410c",
    skillBg: "#7c2d12", skillText: "#fff7ed", softBg: "#fff7ed", headerBg: "#ea580c", headerText: "#fff7ed", layout: "sidebar",
  },
  "global-exec": {
    id: "global-exec", name: "Global Executive", accent: "#991b1b", headingColor: "#7f1d1d",
    skillBg: "#fecaca", skillText: "#7f1d1d", softBg: "#fef2f2", fontFamily: "Times-Roman", layout: "standard",
  },
  "investment-banking": {
    id: "investment-banking", name: "Investment Banking", accent: "#0f172a", headingColor: "#0f172a",
    skillBg: "#1e293b", skillText: "#f8fafc", softBg: "#f8fafc", fontFamily: "Times-Roman", layout: "compact",
  },
  "ai-researcher": {
    id: "ai-researcher", name: "AI Researcher", accent: "#06b6d4", headingColor: "#0891b2",
    skillBg: "#155e75", skillText: "#ecfeff", softBg: "#f0fdfa", headerBg: "#111827", headerText: "#cffafe", fontFamily: "Courier", layout: "sidebar",
  },
  "portfolio-showcase": {
    id: "portfolio-showcase", name: "Portfolio Showcase", accent: C.violet, headingColor: "#6d28d9",
    skillBg: "#ede9fe", skillText: "#6d28d9", softBg: "#faf5ff", headerBg: "#7c3aed", headerText: "#f3e8ff", layout: "sidebar",
  },
  "enterprise-director": {
    id: "enterprise-director", name: "Enterprise Director", accent: "#1e3a8a", headingColor: "#1e40af",
    skillBg: "#dbeafe", skillText: "#1e3a8a", softBg: "#f8fafc", layout: "standard",
  },
  "strategy-leader": {
    id: "strategy-leader", name: "Strategy Leader", accent: "#1c1917", headingColor: "#292524",
    skillBg: "#e7e5e4", skillText: "#292524", softBg: "#f5f5f4", layout: "standard",
  },
  "corporate-boardroom": {
    id: "corporate-boardroom", name: "Corporate Boardroom", accent: "#0f172a", headingColor: "#0f172a",
    skillBg: "#0f172a", skillText: "#f8fafc", softBg: "#f8fafc", fontFamily: "Times-Roman", layout: "standard",
  },
  "modern-corporate": {
    id: "modern-corporate", name: "Modern Corporate", accent: "#111827", headingColor: "#111827",
    skillBg: "#1f2937", skillText: "#f9fafb", softBg: "#f8fafc", headerBg: "#111827", headerText: "#e5e7eb", layout: "sidebar",
  },
  "ceo-premium": {
    id: "ceo-premium", name: "CEO Premium", accent: C.amber, headingColor: "#92400e",
    skillBg: "#d97706", skillText: "#fffbeb", softBg: "#fffbeb", fontFamily: "Times-Roman", layout: "standard",
  },
  "enterprise-consultant": {
    id: "enterprise-consultant", name: "Enterprise Consultant", accent: "#312e81", headingColor: "#3730a3",
    skillBg: "#e0e7ff", skillText: "#312e81", softBg: "#eef2ff", fontFamily: "Times-Roman", layout: "compact",
  },
  "vp-operations": {
    id: "vp-operations", name: "VP Operations", accent: "#064e3b", headingColor: "#065f46",
    skillBg: "#a7f3d0", skillText: "#064e3b", softBg: "#f0fdfa", headerBg: "#064e3b", headerText: "#d1fae5", layout: "standard",
  },
};

export function getPdfTemplateStyle(templateId?: string): PdfTemplateStyle {
  return PDF_TEMPLATE_STYLES[templateId || "modern"] || DEFAULT;
}