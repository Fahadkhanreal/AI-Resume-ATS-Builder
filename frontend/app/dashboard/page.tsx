"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";

interface Resume {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.push("/sign-in");
      return;
    }

    fetchResumes();
  }, [isLoaded, user, router]);

  const fetchResumes = async () => {
    try {
      const response = await fetch("/api/resumes/list");
      if (!response.ok) throw new Error("Failed to fetch resumes");
      const data = await response.json();
      setResumes(data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const createNewResume = async () => {
    try {
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Resume" }),
      });
      if (!response.ok) throw new Error("Failed to create resume");
      const newResume = await response.json();
      router.push(`/resume/${newResume.id}/edit`);
    } catch (error) {
      console.error("Error creating resume:", error);
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
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">My Resumes</h1>
            <p className="text-slate-400 mt-2">
              Welcome back, {user?.firstName}! Create or edit your resumes.
            </p>
          </div>
          <Button onClick={createNewResume} size="lg">
            + Create New Resume
          </Button>
        </div>

        {resumes.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">
              No resumes yet
            </h2>
            <p className="text-slate-400 mb-6">
              Create your first resume to get started
            </p>
            <Button onClick={createNewResume}>Create First Resume</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition cursor-pointer"
                onClick={() => router.push(`/resume/${resume.id}/edit`)}
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {resume.title}
                </h3>
                <p className="text-sm text-slate-400">
                  Updated {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
