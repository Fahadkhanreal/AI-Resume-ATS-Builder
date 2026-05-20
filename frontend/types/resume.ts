export interface PersonalInfo {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photoUrl?: string;
}

export interface Experience {
  id?: string;
  company: string;
  position: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking?: boolean;
  description?: string;
  achievements?: string[];
}

export interface Education {
  id?: string;
  school: string;
  degree: string;
  field: string;
  graduationDate?: string;
  gpa?: string;
}

export interface Certification {
  id?: string;
  name: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ResumeData {
  personalInfo?: PersonalInfo;
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
  certifications?: Certification[];
  languages?: string[];
  projects?: Array<{
    name: string;
    description?: string;
    url?: string;
  }>;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  data: ResumeData;
  templateId: string;
  atsScore?: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}
