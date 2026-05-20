import { Resume } from "@/types";

export interface ResumeTemplateConfig {
  id: string;
  name: string;
  description: string;
  wrapperClass: string;
  headerClass: string;
  nameClass: string;
  titleClass: string;
  contactClass: string;
  headingClass: string;
  skillClass: string;
  photoClass: string;
  layout?: "standard" | "sidebar" | "compact";
}

export interface ResumeTemplateProps {
  resume: Resume;
  config: ResumeTemplateConfig;
}
