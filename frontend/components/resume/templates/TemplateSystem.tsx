"use client";

import { ReactNode } from "react";

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview?: string;
}

export const AVAILABLE_TEMPLATES: ResumeTemplate[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean, contemporary design with bold typography",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Minimalist approach with maximum clarity",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional, traditional business format",
  },
  {
    id: "tech",
    name: "Tech",
    description: "Developer-focused with code-friendly formatting",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Artistic layout for creative professionals",
  },
];

interface ModernTemplateProps {
  children: ReactNode;
}

export function ModernTemplate({ children }: ModernTemplateProps) {
  return (
    <div className="font-sans text-slate-900">
      <style>{`
        .modern-header { border-bottom: 3px solid #10b981; padding-bottom: 16px; margin-bottom: 24px; }
        .modern-section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #10b981; margin-top: 20px; margin-bottom: 12px; }
        .modern-entry { margin-bottom: 16px; }
        .modern-entry-title { font-weight: 600; font-size: 15px; }
        .modern-entry-subtitle { color: #6b7280; font-size: 13px; }
      `}</style>
      {children}
    </div>
  );
}

export function MinimalTemplate({ children }: ModernTemplateProps) {
  return (
    <div className="font-sans text-slate-900">
      <style>{`
        .minimal-header { margin-bottom: 24px; }
        .minimal-section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #374151; margin-top: 16px; margin-bottom: 8px; }
        .minimal-entry { margin-bottom: 12px; }
        .minimal-entry-title { font-weight: 600; font-size: 14px; }
        .minimal-entry-subtitle { color: #9ca3af; font-size: 12px; }
      `}</style>
      {children}
    </div>
  );
}

export function CorporateTemplate({ children }: ModernTemplateProps) {
  return (
    <div className="font-serif text-slate-900">
      <style>{`
        .corporate-header { border-top: 2px solid #1f2937; border-bottom: 2px solid #1f2937; padding: 16px 0; margin-bottom: 24px; }
        .corporate-section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #1f2937; margin-top: 20px; margin-bottom: 12px; }
        .corporate-entry { margin-bottom: 16px; }
        .corporate-entry-title { font-weight: 600; font-size: 15px; }
        .corporate-entry-subtitle { color: #6b7280; font-size: 13px; }
      `}</style>
      {children}
    </div>
  );
}

export function TechTemplate({ children }: ModernTemplateProps) {
  return (
    <div className="font-mono text-slate-900">
      <style>{`
        .tech-header { background: #f3f4f6; padding: 16px; margin-bottom: 24px; border-left: 4px solid #3b82f6; }
        .tech-section-title { font-size: 12px; font-weight: 700; color: #3b82f6; margin-top: 16px; margin-bottom: 8px; }
        .tech-entry { margin-bottom: 12px; padding-left: 12px; border-left: 1px solid #d1d5db; }
        .tech-entry-title { font-weight: 600; font-size: 13px; }
        .tech-entry-subtitle { color: #6b7280; font-size: 12px; }
      `}</style>
      {children}
    </div>
  );
}

export function CreativeTemplate({ children }: ModernTemplateProps) {
  return (
    <div className="font-sans text-slate-900">
      <style>{`
        .creative-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 24px; margin-bottom: 24px; border-radius: 8px; }
        .creative-section-title { font-size: 14px; font-weight: 700; color: #667eea; margin-top: 20px; margin-bottom: 12px; position: relative; padding-left: 12px; }
        .creative-section-title::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 4px; height: 4px; background: #667eea; border-radius: 50%; }
        .creative-entry { margin-bottom: 16px; }
        .creative-entry-title { font-weight: 600; font-size: 15px; }
        .creative-entry-subtitle { color: #6b7280; font-size: 13px; }
      `}</style>
      {children}
    </div>
  );
}
