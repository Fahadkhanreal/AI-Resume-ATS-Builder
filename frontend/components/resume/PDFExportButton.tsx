"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/lib/store/resume.store";
import { Download, Loader } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { PDFResume } from "@/lib/pdf";

export function PDFExportButton() {
  const { currentResume, saveResume } = useResumeStore();
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!currentResume) return;

    setLoading(true);
    try {
      // Trigger background auto-save without blocking instant PDF generation
      if (currentResume.id) {
        saveResume(currentResume.id).catch((saveError) => {
          console.warn("Background auto-save on PDF export:", saveError);
        });
      }

      const data = (currentResume as any).data ?? {};
      const personalInfo = currentResume.personalInfo ?? data.personalInfo ?? {};

      const resumeForPDF: Resume = {
        ...currentResume,
        personalInfo,
        summary: currentResume.summary || personalInfo.summary || data.personalInfo?.summary || "",
        projects: currentResume.projects || data.projects || [],
        experience: currentResume.experience || data.experience || [],
        education: currentResume.education || data.education || [],
        skills: currentResume.skills || data.skills || [],
        certifications: currentResume.certifications || data.certifications || [],
        templateId: (currentResume as any).templateId || currentResume.template || "modern",
      };

      const doc = <PDFResume resume={resumeForPDF} />;
      const blob = await pdf(doc).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${currentResume.title || "resume"}-${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={loading || !currentResume}
      className="w-full gap-2 xl:w-auto"
    >
      {loading ? (
        <>
          <Loader size={16} className="animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download size={16} />
          Export PDF
        </>
      )}
    </Button>
  );
}
