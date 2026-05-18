# Implementation Plan: AI Resume + ATS Builder Frontend

**Branch**: `1-resume-builder` | **Date**: 2026-05-18 | **Spec**: `specs/1-resume-builder/spec.md`  
**Input**: Modern, fast, beautiful frontend with split-screen editor and live preview

## Summary

Build a high-quality Next.js 15 frontend for AI Resume + ATS Builder with split-screen editor (left 40-45%, right 55-60% live preview). Core features: real-time sync (< 200ms), drag-and-drop sections, AI-powered improvements, ATS scoring, template switching, PDF export. Responsive design (desktop split, tablet stacked, mobile bottom sheet). Aligned with constitution principles: User First, ATS Compatibility, Performance, Quality Over Speed.

## Technical Context

**Language/Version**: TypeScript + Next.js 15 (App Router)  
**Primary Dependencies**: React 19, Zustand, dnd-kit, React Hook Form, Zod, Tailwind CSS, shadcn/ui, Framer Motion, Sonner, Lucide React, @react-pdf/renderer, Clerk  
**Storage**: Neon PostgreSQL (via Prisma ORM) - user resumes, sections, entries  
**Testing**: Jest + React Testing Library (unit), Playwright (E2E)  
**Target Platform**: Web (desktop, tablet, mobile)  
**Project Type**: Web application (frontend-focused, API integration)  
**Performance Goals**: Live preview < 200ms, page load < 1.2s (FCP), ATS score calculation < 2s  
**Constraints**: Real-time sync without lag, mobile-first responsive, WCAG 2.1 AA accessibility, dark mode first  
**Scale/Scope**: 10+ resume templates, 50+ UI components, 6 user stories, 12 functional requirements

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **User First**: Split-screen UX mirrors Canva/Notion (delightful, intuitive)  
✅ **ATS Compatibility**: ATS Score feature (FR-006) + suggestions built-in  
✅ **AI as Assistant**: AI buttons on Summary/Experience/Skills; no hallucination (structured JSON only)  
✅ **Privacy & Security**: User data persisted securely; Clerk auth; no sensitive data in logs  
✅ **Performance**: Live preview < 200ms (FR-002), page load < 1.2s (SC-003)  
✅ **Mobile First + Responsive**: Desktop split, tablet stacked, mobile bottom sheet (FR-011)  
✅ **Quality Over Speed**: TypeScript strict mode, proper error boundaries, loading states, accessibility  
✅ **Scalability**: Zustand for state, lazy loading, optimized re-renders, debounced auto-save

**Status**: PASS - All principles aligned. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/1-resume-builder/
├── spec.md                  # Feature specification (6 stories, 12 requirements)
├── plan.md                  # This file (implementation plan)
├── research.md              # Phase 0 output (technology decisions)
├── data-model.md            # Phase 1 output (entities, schemas)
├── quickstart.md            # Phase 1 output (setup guide)
├── contracts/               # Phase 1 output (API contracts)
│   ├── resume-api.md
│   ├── ai-service.md
│   └── types.md
├── checklists/
│   └── requirements.md       # Quality validation (PASS)
└── tasks.md                 # Phase 2 output (/sp.tasks command)
```

### Source Code (repository root)

```text
app/
├── (auth)/                  # Auth pages (sign-in, sign-up, forgot-password)
├── dashboard/               # Dashboard (My Resumes list)
├── resume/
│   ├── [resumeId]/
│   │   ├── edit/            # Main Resume Builder (split layout)
│   │   └── preview/         # Resume preview page
│   └── layout.tsx
├── api/                     # Route Handlers (API endpoints)
│   ├── resumes/
│   ├── ai/
│   └── ats/
├── layout.tsx               # Root layout
└── page.tsx                 # Landing page

components/
├── ui/                      # shadcn/ui components (Button, Input, Card, etc.)
├── resume/
│   ├── BuilderLayout.tsx    # Main split layout container
│   ├── LivePreview.tsx      # Right panel preview renderer
│   ├── SectionList.tsx      # Left sidebar sections list
│   ├── DragDropEditor.tsx   # dnd-kit wrapper
│   ├── AIButtons.tsx        # Reusable AI improve button
│   ├── ATSScoreCard.tsx     # ATS score display
│   ├── TemplateSwitcher.tsx # Template selection modal
│   ├── JobMatchAnalyzer.tsx # JD paste + analysis
│   ├── forms/
│   │   ├── PersonalInfoForm.tsx
│   │   ├── SummaryEditor.tsx
│   │   ├── ExperienceEditor.tsx
│   │   ├── EducationEditor.tsx
│   │   └── SkillsEditor.tsx
│   ├── sections/
│   │   ├── DraggableSection.tsx
│   │   ├── SectionRenderer.tsx
│   │   └── templates/
│   │       ├── ModernTemplate.tsx
│   │       ├── MinimalTemplate.tsx
│   │       └── [more templates]
│   └── common/
│       ├── LoadingState.tsx
│       ├── ErrorBoundary.tsx
│       └── EmptyState.tsx
├── layout/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
└── common/
    ├── Toast.tsx
    └── Modal.tsx

lib/
├── store/
│   ├── resume.store.ts      # Zustand resume store
│   └── ui.store.ts          # Zustand UI store (sidebar, preview zoom)
├── ai.ts                    # AI service layer (Gemini integration)
├── ats.ts                   # ATS scoring logic
├── job-match.ts             # Job match analyzer
├── utils/
│   ├── resume-helpers.ts
│   ├── validation.ts
│   └── formatting.ts
└── constants.ts

hooks/
├── useResume.ts             # Resume store hook
├── useUI.ts                 # UI store hook
├── useAutoSave.ts           # Auto-save logic
└── useAI.ts                 # AI call wrapper

types/
├── resume.ts                # Resume, Section, Entry types
├── ai.ts                    # AI request/response types
└── index.ts

styles/
├── globals.css              # Global Tailwind styles
└── variables.css            # CSS variables (colors, spacing)

tests/
├── unit/
│   ├── store.test.ts
│   ├── utils.test.ts
│   └── hooks.test.ts
├── integration/
│   ├── builder.test.ts
│   └── ai-integration.test.ts
└── e2e/
    ├── create-resume.spec.ts
    ├── drag-drop.spec.ts
    └── ai-improve.spec.ts

public/
├── templates/               # Template preview images
└── icons/                   # Custom icons

.env.example                 # Environment variables template
```

**Structure Decision**: Web application (frontend-focused) with Next.js App Router. Single monorepo structure with clear separation: components (UI), lib (business logic), hooks (state/side effects), types (TypeScript definitions). Tests organized by type (unit, integration, E2E).

## Complexity Tracking

No Constitution Check violations. All design decisions justified by spec requirements and constitution principles.

## Phase-wise Implementation Plan

### Phase 0: Project Setup (1 day)

**Tasks:**
- Initialize Next.js 15 project with App Router + TypeScript (strict mode)
- Install and configure Tailwind CSS + shadcn/ui
- Setup dark mode (next-themes)
- Create folder structure (as per spec)
- Configure ESLint + Prettier + Husky pre-commit hooks
- Create .env.example with required variables (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, etc.)
- Setup Vercel deployment configuration
- Initialize Git repository with initial commit

**Deliverable**: Clean, ready-to-code boilerplate with all tooling configured

**Success Criteria**: `npm run dev` starts dev server, `npm run build` succeeds, folder structure matches plan

---

### Phase 1: Authentication & Dashboard (2-3 days)

**Tasks:**
- Integrate Clerk (sign-up, sign-in, forgot-password, Google OAuth)
- Create protected routes using Next.js middleware
- Design and build auth pages (sign-in, sign-up, forgot-password, reset-password)
- Create dashboard layout with header, sidebar, main content area
- Build "My Resumes" list page with resume cards
- Implement "Create New Resume" button (creates resume, redirects to builder)
- Design empty state for new users
- Setup API route for resume creation (`POST /api/resumes`)

**Key Components**: AuthLayout, DashboardLayout, ResumeCard, EmptyState

**Deliverable**: Fully functional auth flow + dashboard with resume list

**Success Criteria**: User can sign up, sign in, see dashboard, create new resume

---

### Phase 2: Core Resume Builder Layout (3-4 days)

**Tasks:**
- Create main split layout (`/resume/[id]/edit`) with responsive design
- Implement left panel (40-45%): form area with collapsible sections
- Implement right panel (55-60%): live preview area
- Setup Zustand stores (useResumeStore, useUIStore)
- Create TypeScript types for Resume, Section, Entry entities
- Implement responsive design: desktop (split), tablet (stacked), mobile (bottom sheet)
- Create SectionList component with Add Section button
- Setup auto-save mechanism (debounced, every 3 seconds)

**Key Components**: ResumeBuilderLayout, LivePreview, SectionList, DraggableSection

**Deliverable**: Split-screen builder with responsive layout and basic state management

**Success Criteria**: Layout renders correctly on desktop/tablet/mobile, Zustand store works, auto-save triggers

---

### Phase 3: Drag & Drop + Section Management (4-5 days)

**Tasks:**
- Integrate dnd-kit library
- Implement draggable sections (Experience, Education, Skills, Summary, Projects, Certifications)
- Add visual feedback during drag (highlight, placeholder)
- Implement Add/Delete/Duplicate/Reorder section functionality
- Create collapsible section headers
- Update Zustand store to handle section reordering
- Ensure preview updates in real-time when sections reorder

**Key Components**: DraggableSection, SectionRenderer, DragDropEditor

**Deliverable**: Fully functional drag-and-drop with real-time preview updates

**Success Criteria**: Sections can be dragged, reordered, added, deleted; preview updates < 200ms

---

### Phase 4: Forms & Editors (5-6 days)

**Tasks:**
- Create PersonalInfoForm (name, title, email, phone, location, links)
- Create SummaryEditor (rich text, character count, AI button)
- Create ExperienceEditor (company, role, dates, description, bullet points, AI button)
- Create EducationEditor (school, degree, field, graduation date)
- Create SkillsEditor (skill name, proficiency level, suggestions)
- Create ProjectsEditor (project name, description, link, date)
- Create CertificationsEditor (certification name, issuer, date)
- Implement React Hook Form + Zod validation for all forms
- Add real-time validation feedback
- Ensure all form changes trigger preview updates

**Tech**: React Hook Form, Zod, shadcn/ui form components

**Deliverable**: All form editors with validation and real-time preview sync

**Success Criteria**: Forms validate correctly, preview updates instantly, no console errors


### Phase 5: AI Integration Layer (4 days)

**Tasks:**
- Create AI service layer (`lib/ai.ts`) with Gemini integration
- Implement AIImproveButton component (reusable across sections)
- Add loading states and error handling for AI calls
- Implement AI features:
  - Improve Summary (professional tone, keywords)
  - Improve Experience bullets (action verbs, metrics, impact)
  - Skills optimization (suggest related skills, proficiency levels)
  - ATS Score calculation (keyword matching, formatting analysis)
  - Job Match Analyzer (JD parsing, skill matching)
- Setup rate limiting for AI calls (prevent abuse)
- Add fallback UI when AI service unavailable

**Tech**: Google Gemini API, structured JSON responses

**Deliverable**: Fully functional AI integration with error handling

**Success Criteria**: AI buttons work, suggestions load < 3s, errors handled gracefully

---

### Phase 6: Templates System (3-4 days)

**Tasks:**
- Define template data structure (colors, fonts, spacing, layout)
- Create 5+ professional templates:
  - Modern (clean, contemporary)
  - Minimal (simple, elegant)
  - Corporate (traditional, formal)
  - Tech (developer-focused)
  - Creative (colorful, unique)
- Implement TemplateSwitcher component (modal/bottom sheet)
- Create template-specific styling (CSS modules or Tailwind variants)
- Implement live template switching with preview update
- Ensure all templates support all sections
- Add template preview images

**Deliverable**: Multiple templates with live switching

**Success Criteria**: Templates switch < 300ms, all sections render correctly in each template

---

### Phase 7: ATS Score & Job Match (3 days)

**Tasks:**
- Create ATSScoreCard component (0-100 score with color coding)
- Implement ATS scoring algorithm:
  - Keyword density analysis
  - Format validation (fonts, spacing)
  - Section completeness check
  - Action verb usage
- Create suggestions panel (specific improvement recommendations)
- Implement JobMatchAnalyzer component (JD paste area)
- Add job match calculation (keyword overlap, skill matching)
- Display match percentage and missing skills

**Deliverable**: ATS scoring and job match analysis

**Success Criteria**: Score calculates correctly, suggestions are actionable, match analysis accurate

---

### Phase 8: PDF Export (2-3 days)

**Tasks:**
- Integrate @react-pdf/renderer for PDF generation
- Create PDF preview component matching live preview
- Implement download functionality
- Support all templates in PDF format
- Add print-friendly styling
- Test PDF output across browsers
- Optimize PDF file size

**Deliverable**: High-quality PDF export

**Success Criteria**: PDF downloads successfully, matches preview, all templates supported

---

### Phase 9: Polish, Animation & Responsiveness (4-5 days)

**Tasks:**
- Add Framer Motion animations (smooth transitions, micro-interactions)
- Create loading skeletons for async operations
- Implement Sonner toast notifications (success, error, info)
- Design beautiful empty states (no resumes, no sections)
- Final mobile responsiveness polish
- Add keyboard shortcuts (Ctrl+S save, Ctrl+Z undo, etc.)
- Performance optimization (code splitting, lazy loading)
- Dark mode refinement

**Deliverable**: Polished, animated, responsive UI

**Success Criteria**: Smooth animations, no jank, mobile experience excellent

---

### Phase 10: Final Testing & Refinement (3 days)

**Tasks:**
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile device testing (iOS Safari, Android Chrome)
- Accessibility audit (WCAG 2.1 AA compliance)
- Performance profiling and optimization
- Bug fixing and refinement
- User testing feedback incorporation
- Final UI/UX polish

**Deliverable**: Production-ready frontend

**Success Criteria**: All browsers supported, mobile works perfectly, accessibility compliant, no critical bugs

---

## Priority Order Summary (Must Follow)

1. ✅ Phase 0: Setup + Tooling
2. ✅ Phase 1: Auth + Dashboard
3. ✅ Phase 2: Core Builder Layout + Live Preview
4. ✅ Phase 3: Drag & Drop + Sections
5. ✅ Phase 4: Forms & Data Flow
6. ✅ Phase 5: AI Integration
7. ✅ Phase 6: Templates
8. ✅ Phase 7: ATS + Job Match
9. ✅ Phase 8: PDF Export
10. ✅ Phase 9: Polish + Animation
11. ✅ Phase 10: Testing + Refinement

**Total Estimated Duration**: 35-45 days (5-6 weeks)

---

## Tools & Libraries (Confirmed from Constitution)

- **Framework**: Next.js 15 (App Router) + TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + shadcn/ui + Radix UI
- **State Management**: Zustand (primary) + React Context (limited)
- **Drag & Drop**: dnd-kit + @dnd-kit/sortable
- **Forms**: React Hook Form + Zod
- **UI Components**: shadcn/ui (customized)
- **PDF Preview**: @react-pdf/renderer
- **Animations**: Framer Motion (subtle & smooth)
- **Icons**: Lucide React
- **Typography**: Inter + Satoshi (or similar modern font)
- **Authentication**: Clerk (Email + Password + Google + Forgot Password)
- **Database**: Neon (PostgreSQL) + Prisma ORM
- **Notifications**: Sonner (toast)
- **Testing**: Jest + React Testing Library (unit), Playwright (E2E)
- **Deployment**: Vercel

---

## Success Criteria (Frontend Complete)

- ✅ Real-time preview working smoothly (< 200ms updates)
- ✅ Drag & drop fully functional with visual feedback
- ✅ AI buttons working with good UX (loading states, error handling)
- ✅ ATS Score visible with actionable suggestions
- ✅ PDF download working for all templates
- ✅ Mobile experience excellent (responsive, touch-friendly)
- ✅ Code clean, fully typed, maintainable
- ✅ Accessibility compliant (WCAG 2.1 AA)
- ✅ Performance optimized (page load < 1.2s, preview < 200ms)
- ✅ All 6 user stories implemented and tested

---

## Next Steps After This Plan

1. **Phase 0**: Start project setup (Next.js, Tailwind, shadcn/ui)
2. **Phase 1**: Complete authentication and dashboard
3. **Phase 2**: Build core builder layout with live preview
4. **Continue**: Follow priority order through Phase 10

---

**Approved By**: Fahd  
**Date**: May 18, 2026  
**Status**: Ready for `/sp.tasks` phase
