---
name: frontend_plan
description: Frontend implementation plan - 10-phase plan (35-45 days), Next.js 15, Zustand, dnd-kit, AI integration, Constitution Check PASS
metadata:
  type: project
---

# Frontend Implementation Plan: AI Resume + ATS Builder

**Branch**: 1-resume-builder | **Created**: 2026-05-18 | **Status**: Ready for `/sp.tasks`

## Summary

Build high-quality Next.js 15 frontend with split-screen editor (left 40-45%, right 55-60% live preview). Core features: real-time sync (< 200ms), drag-and-drop sections, AI-powered improvements, ATS scoring, template switching, PDF export. Responsive design (desktop split, tablet stacked, mobile bottom sheet). Aligned with constitution principles.

## Technical Context

- **Language/Version**: TypeScript + Next.js 15 (App Router)
- **Primary Dependencies**: React 19, Zustand, dnd-kit, React Hook Form, Zod, Tailwind CSS, shadcn/ui, Framer Motion, Sonner, Lucide React, @react-pdf/renderer, Clerk
- **Storage**: Neon PostgreSQL (via Prisma ORM)
- **Testing**: Jest + React Testing Library (unit), Playwright (E2E)
- **Target Platform**: Web (desktop, tablet, mobile)
- **Performance Goals**: Live preview < 200ms, page load < 1.2s (FCP), ATS score < 2s
- **Constraints**: Real-time sync, mobile-first responsive, WCAG 2.1 AA, dark mode first
- **Scale/Scope**: 10+ templates, 50+ components, 6 user stories, 12 requirements

## Constitution Check: PASS

✅ **User First**: Split-screen UX mirrors Canva/Notion  
✅ **ATS Compatibility**: ATS Score feature + suggestions built-in  
✅ **AI as Assistant**: AI buttons; no hallucination (structured JSON)  
✅ **Privacy & Security**: Secure data, Clerk auth, no sensitive logs  
✅ **Performance**: Live preview < 200ms, page load < 1.2s  
✅ **Mobile First + Responsive**: Desktop split, tablet stacked, mobile bottom sheet  
✅ **Quality Over Speed**: TypeScript strict, error boundaries, loading states, accessibility  
✅ **Scalability**: Zustand, lazy loading, optimized re-renders, debounced auto-save

## 10-Phase Implementation Plan

**Phase 0**: Project Setup (1 day)
- Next.js 15 + TypeScript, Tailwind, shadcn/ui, dark mode, folder structure, ESLint/Prettier/Husky, .env.example, Vercel config

**Phase 1**: Authentication & Dashboard (2-3 days)
- Clerk integration, protected routes, auth pages, dashboard layout, My Resumes list, Create New button, empty states

**Phase 2**: Core Resume Builder Layout (3-4 days)
- Split layout, responsive design, left sidebar, right preview, Zustand stores, TypeScript types, auto-save

**Phase 3**: Drag & Drop + Section Management (4-5 days)
- dnd-kit integration, draggable sections, add/delete/duplicate/reorder, collapsible sections, auto-save

**Phase 4**: Forms & Editors (5-6 days)
- PersonalInfoForm, SummaryEditor, ExperienceEditor, EducationEditor, SkillsEditor, ProjectsEditor, CertificationsEditor
- React Hook Form + Zod validation, real-time validation, preview sync

**Phase 5**: AI Integration Layer (4 days)
- AI service layer (lib/ai.ts), AIImproveButton component, loading states, error handling
- Features: Improve Summary, Improve Experience, Skills optimization, ATS Score, Job Match

**Phase 6**: Templates System (3-4 days)
- Template data structure, 5+ templates (Modern, Minimal, Corporate, Tech, Creative)
- TemplateSwitcher component, live switching, template-specific styling

**Phase 7**: ATS Score & Job Match (3 days)
- ATSScoreCard component, ATS scoring algorithm, suggestions panel
- JobMatchAnalyzer component, match calculation, missing skills display

**Phase 8**: PDF Export (2-3 days)
- @react-pdf/renderer integration, PDF preview, download functionality
- All templates supported in PDF, print-friendly styling

**Phase 9**: Polish, Animation & Responsiveness (4-5 days)
- Framer Motion animations, loading skeletons, Sonner toasts, empty states
- Mobile polish, keyboard shortcuts, performance optimization, dark mode refinement

**Phase 10**: Final Testing & Refinement (3 days)
- Cross-browser testing, mobile testing, accessibility audit (WCAG 2.1 AA)
- Performance profiling, bug fixing, UI/UX refinement

**Total Duration**: 35-45 days (5-6 weeks)

## Project Structure

**Documentation**: spec.md, plan.md, research.md, data-model.md, quickstart.md, contracts/, checklists/, tasks.md

**Source Code**:
- app/ (auth, dashboard, resume builder, API routes)
- components/ (UI, resume-specific, forms, sections, templates, layout, common)
- lib/ (store, AI, ATS, job-match, utils, constants)
- hooks/ (useResume, useUI, useAutoSave, useAI)
- types/ (resume, AI, index)
- styles/ (globals, variables)
- tests/ (unit, integration, E2E)
- public/ (templates, icons)

## Success Criteria

- Real-time preview working smoothly (< 200ms)
- Drag & drop fully functional with visual feedback
- AI buttons working with good UX (loading, error handling)
- ATS Score visible with actionable suggestions
- PDF download working for all templates
- Mobile experience excellent (responsive, touch-friendly)
- Code clean, fully typed, maintainable
- WCAG 2.1 AA compliant
- Performance optimized (page load < 1.2s, preview < 200ms)
- All 6 user stories implemented and tested

## Next Steps

1. `/sp.tasks` — Generate implementation tasks with dependencies
2. `/sp.implement` — Execute tasks in priority order
3. Start Phase 0 (Project Setup)
