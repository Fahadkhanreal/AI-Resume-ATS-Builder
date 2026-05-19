"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/lib/store/resume.store";
import { Download, Loader } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { PDFResume } from "@/lib/pdf";

export function PDFExportButton() {
  const { currentResume } = useResumeStore();
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!currentResume) return;

    setLoading(true);
    try {
      const doc = <PDFResume resume={currentResume} />;
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
      className="gap-2"
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
