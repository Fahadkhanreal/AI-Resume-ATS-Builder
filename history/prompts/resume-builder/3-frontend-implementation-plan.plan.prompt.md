---
id: 3
title: Frontend Implementation Plan
stage: plan
date: 2026-05-18
surface: agent
model: kr/claude-haiku-4.5-agentic
feature: resume-builder
branch: 1-resume-builder
user: Fahadkhanreal
command: /sp.plan
labels: ["plan", "frontend", "resume-builder", "architecture", "sdd"]
links:
  spec: specs/1-resume-builder/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/1-resume-builder/plan.md
tests:
  - none
---

## Prompt

# Frontend Implementation Plan - AI Resume + ATS Builder

**Version:** 1.0  
**Date:** May 18, 2026  
**Spec Reference:** `specs/1-resume-builder/spec.md`

## Objective

Next.js 15 ke saath high-quality, scalable aur beautiful frontend build karna jo real-time resume builder experience de.

## Phase-wise Implementation Plan

### Phase 0: Project Setup (1 day)
- Next.js 15 App Router + TypeScript project create
- Tailwind CSS + shadcn/ui setup
- Dark mode configuration
- Folder structure creation (as per spec)
- ESLint + Prettier + Husky setup
- Environment variables (.env.example)
- Vercel deployment ready

### Phase 1: Authentication & Dashboard (2-3 days)
- Clerk integration (Sign up, Sign in, Forgot Password, Google)
- Protected routes using middleware
- Beautiful auth pages (sign-in, sign-up)
- Dashboard layout
- Dashboard page (My Resumes list + Create New button)
- Empty state design

### Phase 2: Core Resume Builder Layout (3-4 days)
- Main split layout (`/resume/[id]/edit`)
- Responsive design (Desktop split + Mobile bottom sheet)
- Left sidebar (Sections list + Add section)
- Right side Live Preview area
- Zustand store setup (`useResumeStore`)
- Resume data types creation (`types/resume.ts`)

### Phase 3: Drag & Drop + Section Management (4-5 days)
- dnd-kit integration
- Draggable sections (Experience, Education, Skills, etc.)
- Add / Delete / Duplicate / Reorder sections
- Collapsible sections
- Auto-save functionality (debounced)

### Phase 4: Forms & Editors (5-6 days)
- Personal Information Form
- Professional Summary Editor + AI Button
- Experience Editor (Multiple entries + Rich bullets)
- Education Editor
- Skills Editor (with suggestions)
- Projects & Certifications sections

### Phase 5: AI Integration Layer (4 days)
- AI service layer (`lib/ai.ts`)
- Reusable `AIImproveButton` component
- Loading states for AI calls
- Error handling & fallback
- Implement AI features (Summary, Experience, Skills, ATS Score, Job Match)

### Phase 6: Templates System (3-4 days)
- Template data structure
- Multiple templates (Modern, Minimal, Corporate, Tech, Creative)
- Template switcher (modal/bottom sheet)
- Live template switching with preview update
- Template-specific styling

### Phase 7: ATS Score & Job Match (3 days)
- ATS Score Card component
- Suggestions panel
- Job Match Analyzer panel (JD paste area)
- Beautiful result UI

### Phase 8: PDF Export (2-3 days)
- @react-pdf/renderer integration
- PDF Preview matching live preview
- Download functionality
- Multiple templates support in PDF

### Phase 9: Polish, Animation & Responsiveness (4-5 days)
- Framer Motion animations
- Loading skeletons
- Toast notifications (Sonner)
- Empty states
- Mobile responsiveness final touch
- Keyboard shortcuts (optional)
- Performance optimization

### Phase 10: Final Testing & Refinement (3 days)
- Cross browser testing
- Mobile testing
- Accessibility check
- Bug fixing
- UI/UX refinement

## Priority Order Summary (Must Follow)

1. Setup + Auth + Dashboard
2. Core Builder Layout + Live Preview
3. Drag & Drop + Sections
4. Forms & Data Flow
5. AI Integration
6. Templates
7. ATS + Job Match
8. PDF Export
9. Polish

## Tools & Libraries (Confirmed)

- Zustand
- dnd-kit
- React Hook Form + Zod
- Framer Motion
- Sonner (toast)
- Lucide React (icons)
- @react-pdf/renderer
- Clerk
- Tailwind + shadcn/ui

## Success Criteria (Frontend Done)

- Real-time preview working smoothly
- Drag & drop fully functional
- AI buttons working with good UX
- ATS Score visible
- PDF download working
- Mobile experience good
- Code clean, typed aur maintainable

**Approved By:** Fahd  
**Date:** May 18, 2026

## Response snapshot

Frontend implementation plan created for AI Resume + ATS Builder. Comprehensive 10-phase plan with:

- **Phase 0-10**: Detailed implementation phases (35-45 days total)
- **Technical Context**: Next.js 15, TypeScript, Zustand, dnd-kit, React Hook Form, Zod, Tailwind, shadcn/ui, Framer Motion, Sonner, Clerk, Neon PostgreSQL
- **Constitution Check**: PASS - All 8 principles aligned (User First, ATS Compatibility, AI Assistant, Privacy & Security, Performance, Mobile First, Quality Over Speed, Scalability)
- **Project Structure**: Clear folder organization (app/, components/, lib/, hooks/, types/, tests/)
- **10 Phases**: Setup → Auth → Builder Layout → Drag & Drop → Forms → AI → Templates → ATS/Job Match → PDF → Polish → Testing
- **Success Criteria**: Real-time preview, drag-and-drop, AI integration, ATS scoring, PDF export, mobile responsiveness, code quality

Plan is aligned with specification requirements and constitution principles. Ready for `/sp.tasks` phase.

## Outcome

- ✅ Impact: Complete implementation plan established; ready for `/sp.tasks` phase
- 🧪 Tests: Constitution Check PASS - all 8 principles aligned
- 📁 Files: specs/1-resume-builder/plan.md (complete with all 10 phases)
- 🔁 Next prompts: /sp.tasks (generate implementation tasks), /sp.implement (execute tasks)
- 🧠 Reflection: Plan is detailed, phased, and achievable. Clear success criteria for each phase. Aligned with constitution and specification.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS - Constitution Check complete, all principles verified
- Prompt variant (if applicable): none
- Next experiment: Generate tasks.md with dependency ordering and acceptance criteria
