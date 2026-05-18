"use client";

import { ReactNode } from "react";
import { useResumeStore } from "@/lib/store/resume.store";
import { useUIStore } from "@/lib/store/ui.store";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BuilderLayoutProps {
  children: ReactNode;
  preview: ReactNode;
}

export default function BuilderLayout({ children, preview }: BuilderLayoutProps) {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col">
        {/* Mobile Header */}
        <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-white">Resume Builder</h1>
          <Button variant="ghost" size="sm" onClick={toggleSidebar}>
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>
        </div>

        {/* Mobile Content - Stacked */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">{children}</div>
        </div>

        {/* Mobile Preview Sheet */}
        <div className="border-t border-slate-700 bg-slate-800 p-4 max-h-[40vh] overflow-y-auto">
          <h2 className="text-sm font-semibold text-slate-300 mb-3">Preview</h2>
          {preview}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Desktop Split Layout */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Resume Builder</h1>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Editor (40-45%) */}
          <div className="w-[45%] border-r border-slate-700 overflow-y-auto bg-slate-900">
            <div className="p-6">{children}</div>
          </div>

          {/* Right Panel - Preview (55-60%) */}
          <div className="w-[55%] overflow-y-auto bg-slate-800/30 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 min-h-full">
              {preview}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
