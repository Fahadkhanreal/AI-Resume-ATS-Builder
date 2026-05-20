"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Resume {
  id: string;
  title: string;
  displayTitle?: string;
  templateId?: string;
  atsScore?: number | null;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.push("/sign-in");
      return;
    }

    fetchResumes();
  }, [isLoaded, user?.id, router]);

  useEffect(() => {
    resumes.forEach((resume) => {
      router.prefetch(`/resume/${resume.id}/edit`);
    });
  }, [resumes, router]);

  const fetchResumes = async () => {
    try {
      const response = await fetch("/api/resumes");
      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json") ? await response.json() : null;
      if (!response.ok) {
        throw new Error(result?.error || `Failed to fetch resumes (${response.status})`);
      }
      const resumeList = (result?.data ?? []).map((resume: Resume, index: number) => ({
        ...resume,
        displayTitle:
          resume.title && !/^New Resume$|^Resume \d+$/i.test(resume.title)
            ? resume.title
            : `Resume ${index + 1}`,
      }));
      setResumes(resumeList);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const createNewResume = async () => {
    try {
      const nextResumeNumber = resumes.length + 1;
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: `Resume ${nextResumeNumber}` }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to create resume");
      router.push(`/resume/${result.data.id}/edit`);
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  const openResume = (resumeId: string) => {
    setOpeningId(resumeId);
    router.push(`/resume/${resumeId}/edit`);
  };

  const deleteResume = async (resumeId: string, title: string) => {
    const confirmed = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!confirmed) return;

    const previousResumes = resumes;
    setDeletingId(resumeId);
    setResumes((current) => current.filter((resume) => resume.id !== resumeId));

    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to delete resume");
    } catch (error) {
      setResumes(previousResumes);
      console.error("Error deleting resume:", error);
      alert(error instanceof Error ? error.message : "Failed to delete resume");
    } finally {
      setDeletingId(null);
    }
  };

  if (!isLoaded || loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-slate-400">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">My Resumes</h1>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Welcome back, {user?.firstName}! Create or edit your resumes.
            </p>
          </div>
          <Button onClick={createNewResume} size="lg" className="w-full sm:w-auto">
            + Create New Resume
          </Button>
        </div>

        {resumes.length === 0 ? (
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-6 text-center sm:p-12">
            <h2 className="mb-2 text-lg font-semibold text-white sm:text-xl">
              No resumes yet
            </h2>
            <p className="mb-6 text-sm text-slate-400 sm:text-base">
              Create your first resume to get started
            </p>
            <Button onClick={createNewResume} className="w-full sm:w-auto">
              Create First Resume
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {resumes.map((resume, index) => {
              const createdAt = new Date(resume.createdAt);
              const updatedAt = new Date(resume.updatedAt);
              const fallbackTitle = `Resume ${index + 1}`;
              const displayTitle = resume.displayTitle || resume.title?.trim() || fallbackTitle;
              const atsScore = resume.atsScore ?? null;

              return (
                <div
                  key={resume.id}
                  className={`cursor-pointer rounded-lg border p-4 transition sm:p-6 ${
                    openingId === resume.id
                      ? "border-emerald-500 bg-slate-800/80 opacity-80"
                      : "border-slate-700 bg-slate-800 hover:border-emerald-500"
                  }`}
                  onClick={() => openResume(resume.id)}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold text-white">
                        {displayTitle}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-wide text-emerald-400">
                        {resume.templateId || "modern"} template
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-300">
                        #{index + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={deletingId === resume.id}
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteResume(resume.id, displayTitle);
                        }}
                        className="h-8 w-8 p-0 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                        aria-label={`Delete ${displayTitle}`}
                      >
                        <Trash2 size={15} />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-slate-400">
                    <p>Created {createdAt.toLocaleDateString()} at {createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                    <p>Updated {updatedAt.toLocaleDateString()} at {updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                    <p>ATS Score: {atsScore ?? "Not checked"}{atsScore !== null ? "%" : ""}</p>
                    {openingId === resume.id && <p className="text-emerald-400">Opening editor...</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
