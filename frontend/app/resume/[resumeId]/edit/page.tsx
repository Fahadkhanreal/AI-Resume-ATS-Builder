"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { FormSectionSkeleton, PreviewSkeleton } from "@/components/common/LoadingState";
import { PDFExportButton } from "@/components/resume/PDFExportButton";
import { ATSScoreCard } from "@/components/resume/ATSScoreCard";
import { ALL_RESUME_TEMPLATES } from "@/components/resume/templates";
import { useResumeStore } from "@/lib/store/resume.store";
import { useUIStore } from "@/lib/store/ui.store";
import { usePreviewUpdate } from "@/lib/hooks/usePreviewUpdate";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export default function ResumeBuilderPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const params = useParams();
  const resumeId = params.resumeId as string;
  const { currentResume, setCurrentResume, saveResume, updateTemplate } = useResumeStore();
  const { activeSection } = useUIStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const loadedResumeIdRef = useRef<string | null>(null);

  usePreviewUpdate(200);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.push("/sign-in");
      return;
    }

    if (loadedResumeIdRef.current === resumeId) return;
    loadedResumeIdRef.current = resumeId;
    fetchResume();
  }, [isLoaded, user?.id, router, resumeId]);

  const fetchResume = async () => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}/get`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to fetch resume");
      setCurrentResume(result.data);
    } catch (error) {
      loadedResumeIdRef.current = null;
      console.error("Error fetching resume:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentResume) return;
    setSaving(true);
    setSaveStatus(null);
    setSaveMessage("");
    try {
      await saveResume(resumeId);
      setSaveStatus("success");
      setSaveMessage("Resume saved successfully.");
    } catch (error) {
      setSaveStatus("error");
      setSaveMessage(
        error instanceof Error ? error.message : "Failed to save resume."
      );
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <BuilderLayout preview={<PreviewSkeleton />}>
        <FormSectionSkeleton />
      </BuilderLayout>
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
    <BuilderLayout preview={<LivePreview />}>
      <div className="space-y-4 sm:space-y-6">
        {/* Top Action Bar */}
        <div className="sticky top-0 z-20 -mx-3 flex flex-col gap-3 border-b border-slate-800 bg-slate-900/95 px-3 pb-3 pt-2 sm:-mx-4 sm:px-4 lg:-mx-6 lg:px-6 xl:flex-row xl:items-center xl:justify-between xl:pb-4">
          <div className="min-w-0 space-y-3">
            <nav className="inline-flex max-w-full items-center overflow-x-auto rounded-full border border-slate-700 bg-slate-800/80 p-1 text-xs shadow-lg shadow-black/10 sm:text-sm">
              <Link href="/" className="rounded-full px-3 py-1.5 text-slate-300 transition hover:bg-slate-700 hover:text-emerald-400 sm:px-4">
                Home
              </Link>
              <Link href="/dashboard" className="rounded-full bg-emerald-600 px-3 py-1.5 font-medium text-white shadow-sm shadow-emerald-500/20 transition hover:bg-emerald-500 sm:px-4">
                Dashboard
              </Link>
            </nav>
            <div>
              <h2 className="truncate text-lg font-semibold text-white sm:text-xl">{currentResume.title}</h2>
              <p className="text-xs text-slate-400 sm:text-sm">Template: {currentResume.template}</p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 xl:w-auto xl:items-end">
            <div className="w-full xl:w-56">
              <Label htmlFor="template" className="text-xs text-slate-300">
                Template
              </Label>
              <select
                id="template"
                value={(currentResume as any).templateId || currentResume.template || "modern"}
                onChange={(event) => updateTemplate(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-500"
              >
                {ALL_RESUME_TEMPLATES.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 xl:flex xl:justify-end">
              <Button onClick={handleSave} disabled={saving} className="w-full gap-2 xl:w-auto">
                <Save size={16} />
                {saving ? "Saving..." : "Save"}
              </Button>
              <PDFExportButton />
            </div>
            {saveMessage && (
              <p
                className={`text-xs ${
                  saveStatus === "success" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {saveMessage}
              </p>
            )}
          </div>
        </div>

        <ErrorBoundary>
          <ATSScoreCard />
        </ErrorBoundary>

        {/* Sections Sidebar */}
        <ErrorBoundary>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 sm:p-4">
            <SectionList />
          </div>
        </ErrorBoundary>

        {/* Active Section Editor */}
        <ErrorBoundary>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 sm:p-6">
            {activeSection === "personalInfo" && <PersonalInfoForm />}
            {activeSection === "summary" && <SummaryEditor />}
            {activeSection === "experience" && <ExperienceEditor />}
            {activeSection === "education" && <EducationEditor />}
            {activeSection === "skills" && <SkillsEditor />}
            {activeSection === "projects" && <ProjectsEditor />}
            {activeSection === "certifications" && <CertificationsEditor />}
          </div>
        </ErrorBoundary>
      </div>
    </BuilderLayout>
  );
}
