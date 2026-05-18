"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import BuilderLayout from "@/components/resume/BuilderLayout";
import LivePreview from "@/components/resume/LivePreview";
import SectionList from "@/components/resume/SectionList";
import PersonalInfoForm from "@/components/resume/forms/PersonalInfoForm";
import SummaryEditor from "@/components/resume/forms/SummaryEditor";
import ExperienceEditor from "@/components/resume/forms/ExperienceEditor";
import EducationEditor from "@/components/resume/forms/EducationEditor";
import SkillsEditor from "@/components/resume/forms/SkillsEditor";
import ProjectsEditor from "@/components/resume/forms/ProjectsEditor";
import CertificationsEditor from "@/components/resume/forms/CertificationsEditor";
import { useResumeStore } from "@/lib/store/resume.store";
import { useUIStore } from "@/lib/store/ui.store";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function ResumeBuilderPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const params = useParams();
  const resumeId = params.resumeId as string;
  const { currentResume, setCurrentResume, saveResume } = useResumeStore();
  const { activeSection } = useUIStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.push("/sign-in");
      return;
    }

    fetchResume();
  }, [isLoaded, user, router, resumeId]);

  const fetchResume = async () => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}/get`);
      if (!response.ok) throw new Error("Failed to fetch resume");
      const data = await response.json();
      setCurrentResume(data);
    } catch (error) {
      console.error("Error fetching resume:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentResume) return;
    setSaving(true);
    try {
      await saveResume(resumeId);
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400">Loading resume...</p>
      </div>
    );
  }

  if (!currentResume) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400">Resume not found</p>
      </div>
    );
  }

  return (
    <BuilderLayout
      preview={<LivePreview />}
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex justify-between items-center sticky top-0 bg-slate-900 z-10 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-white">{currentResume.title}</h2>
            <p className="text-sm text-slate-400">Template: {currentResume.template}</p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            <Save size={16} />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>

        {/* Sections Sidebar */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <SectionList />
        </div>

        {/* Active Section Editor */}
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          {activeSection === "personalInfo" && <PersonalInfoForm />}
          {activeSection === "summary" && <SummaryEditor />}
          {activeSection === "experience" && <ExperienceEditor />}
          {activeSection === "education" && <EducationEditor />}
          {activeSection === "skills" && <SkillsEditor />}
          {activeSection === "projects" && <ProjectsEditor />}
          {activeSection === "certifications" && <CertificationsEditor />}
        </div>
      </div>
    </BuilderLayout>
  );
}
