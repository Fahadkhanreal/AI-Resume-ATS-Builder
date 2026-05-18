# Implementation Tasks: AI Resume + ATS Builder Frontend

**Feature Branch**: `1-resume-builder`  
**Spec**: `specs/1-resume-builder/spec.md`  
**Plan**: `specs/1-resume-builder/plan.md`  
**Created**: 2026-05-18  
**Status**: Ready to Execute

---

## Task Organization

Tasks are organized by user story (P1, P2, P3) to enable independent implementation and testing. Each user story is independently testable and can be deployed separately.

**User Stories**:
- **US1 (P1)**: Create and Edit Resume — Core MVP feature
- **US2 (P1)**: Drag & Drop Section Reordering — Core UX feature
- **US3 (P1)**: AI-Powered Content Improvement — Differentiator feature
- **US4 (P2)**: ATS Score Checker — High value-add
- **US5 (P2)**: Template Switching — Customization
- **US6 (P3)**: Job Match Analyzer — Nice-to-have

---

## Phase 1: Project Setup (Day 1)

**Goal**: Initialize Next.js 15 project with all tooling configured and ready for development.

**Independent Test**: `npm run dev` starts dev server, `npm run build` succeeds, folder structure matches plan.

### Setup Tasks

- [x] T001 Initialize Next.js 15 project with App Router and TypeScript strict mode
- [x] T002 Install and configure Tailwind CSS with custom theme (dark mode first)
- [x] T003 Install and setup shadcn/ui components library
- [x] T004 Configure next-themes for dark mode support
- [x] T005 Create folder structure per implementation plan (app/, components/, lib/, hooks/, types/, tests/)
- [x] T006 Setup ESLint with TypeScript support and strict rules
- [x] T007 Setup Prettier for code formatting
- [x] T008 Setup Husky pre-commit hooks for linting
- [x] T009 Create .env.example with required variables (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, NEXT_PUBLIC_GEMINI_API_KEY, DATABASE_URL)
- [x] T010 Setup Vercel deployment configuration (vercel.json)
- [x] T011 Create root layout (app/layout.tsx) with dark mode provider and global styles
- [x] T012 Create landing page (app/page.tsx) with basic design
- [x] T013 Initialize Git repository with initial commit
- [x] T014 Setup TypeScript types directory (types/index.ts) with base types

---

## Phase 2: Foundational Infrastructure (Days 2-3)

**Goal**: Build authentication, dashboard, and core state management that all user stories depend on.

**Independent Test**: User can sign up, sign in, see dashboard with empty resume list, create new resume.

### Authentication & Dashboard Tasks

- [ ] T015 [P] Install Clerk and setup authentication provider in root layout
- [ ] T016 [P] Create Clerk middleware for protected routes (app/middleware.ts)
- [ ] T017 [P] Create sign-in page (app/(auth)/sign-in/page.tsx) with Clerk SignIn component
- [ ] T018 [P] Create sign-up page (app/(auth)/sign-up/page.tsx) with Clerk SignUp component
- [ ] T019 [P] Create forgot-password page (app/(auth)/forgot-password/page.tsx)
- [ ] T020 [P] Create reset-password page (app/(auth)/reset-password/page.tsx)
- [ ] T021 [P] Create dashboard layout (components/layout/DashboardLayout.tsx) with header and sidebar
- [ ] T022 [P] Create dashboard page (app/dashboard/page.tsx) with My Resumes grid
- [ ] T023 [P] Create ResumeCard component (components/resume/ResumeCard.tsx) for displaying resume previews
- [ ] T024 [P] Create empty state component (components/common/EmptyState.tsx) for new users
- [ ] T025 [P] Install Sonner for toast notifications
- [ ] T026 [P] Create "Create New Resume" button with API call to POST /api/resumes
- [ ] T027 [P] Create API route for resume creation (app/api/resumes/route.ts)
- [ ] T028 [P] Setup Zustand store for resume state (lib/store/resume.store.ts)
- [ ] T029 [P] Setup Zustand store for UI state (lib/store/ui.store.ts)
- [ ] T030 [P] Create TypeScript types for Resume, Section, Entry (types/resume.ts)
- [ ] T031 [P] Create API route for fetching user's resumes (app/api/resumes/list/route.ts)

---

## Phase 3: User Story 1 - Create and Edit Resume (Days 4-7)

**Goal**: Users can create a complete resume with all sections and see real-time preview updates.

**Independent Test**: User can fill in personal info, experience, education, skills and see preview update instantly (< 200ms).

**Acceptance Criteria**:
1. User clicks "Create New Resume" → taken to builder with empty form and blank preview
2. User fills personal info → preview updates instantly (< 200ms)
3. User adds experience entry → appears in preview immediately
4. User drags section to reorder → preview reflects new order instantly

### US1 Tasks

- [ ] T032 [US1] Create Resume Builder Layout component (components/resume/BuilderLayout.tsx) with split-screen design
- [ ] T033 [US1] Create LivePreview component (components/resume/LivePreview.tsx) for rendering resume preview
- [ ] T034 [US1] Create SectionList component (components/resume/SectionList.tsx) for left sidebar sections
- [ ] T035 [US1] Create resume builder page (app/resume/[resumeId]/edit/page.tsx)
- [ ] T036 [US1] Implement responsive design: desktop (split), tablet (stacked), mobile (bottom sheet)
- [ ] T037 [US1] Create PersonalInfoForm component (components/resume/forms/PersonalInfoForm.tsx) with React Hook Form + Zod
- [ ] T038 [US1] Create SummaryEditor component (components/resume/forms/SummaryEditor.tsx) with character count
- [ ] T039 [US1] Create ExperienceEditor component (components/resume/forms/ExperienceEditor.tsx) with add/edit/delete entries
- [ ] T040 [US1] Create EducationEditor component (components/resume/forms/EducationEditor.tsx)
- [ ] T041 [US1] Create SkillsEditor component (components/resume/forms/SkillsEditor.tsx) with tag input
- [ ] T042 [US1] Create ProjectsEditor component (components/resume/forms/ProjectsEditor.tsx)
- [ ] T043 [US1] Create CertificationsEditor component (components/resume/forms/CertificationsEditor.tsx)
- [ ] T044 [US1] Implement form validation using React Hook Form + Zod (lib/utils/validation.ts)
- [ ] T045 [US1] Implement real-time preview updates when form changes (< 200ms debounce)
- [ ] T046 [US1] Implement auto-save functionality (debounced every 3 seconds) (lib/hooks/useAutoSave.ts)
- [ ] T047 [US1] Create API route for saving resume (app/api/resumes/[resumeId]/route.ts)
- [ ] T048 [US1] Create API route for fetching resume (app/api/resumes/[resumeId]/get/route.ts)
- [ ] T049 [US1] Implement error boundaries for form sections (components/common/ErrorBoundary.tsx)
- [ ] T050 [US1] Create loading skeletons for form sections (components/common/LoadingState.tsx)

---

## Phase 4: User Story 2 - Drag & Drop Section Reordering (Days 8-9)

**Goal**: Users can drag resume sections to reorder them with real-time preview updates.

**Independent Test**: User can drag sections, see visual feedback, and preview updates instantly.

**Acceptance Criteria**:
1. User drags "Education" above "Experience" → preview shows new order immediately
2. User hovers over drop zones → visual feedback (highlight) appears
3. User releases mouse → section moves and preview updates

### US2 Tasks

- [ ] T051 [P] [US2] Install dnd-kit library and dependencies
- [ ] T052 [US2] Create DraggableSection component (components/resume/DraggableSection.tsx) with dnd-kit
- [ ] T053 [US2] Create DragDropEditor wrapper (components/resume/DragDropEditor.tsx) for managing drag state
- [ ] T054 [US2] Implement section reordering logic in Zustand store
- [ ] T055 [US2] Implement visual feedback during drag (highlight, placeholder)
- [ ] T056 [US2] Create "Add New Section" button and modal (components/resume/AddSectionModal.tsx)
- [ ] T057 [US2] Implement delete section functionality with confirmation
- [ ] T058 [US2] Implement duplicate section functionality
- [ ] T059 [US2] Create collapsible section headers (components/resume/SectionHeader.tsx)
- [ ] T060 [US2] Ensure preview updates instantly when sections reorder (< 200ms)

---

## Phase 5: User Story 3 - AI-Powered Content Improvement (Days 10-12)

**Goal**: Users can click "Improve with AI" on any section to get professional suggestions.

**Independent Test**: User can trigger AI improvement and see suggestions load within 3 seconds.

**Acceptance Criteria**:
1. User clicks "Improve with AI" → loading state appears, suggestions load within 3 seconds
2. User clicks "Accept" → text is replaced and preview updates
3. User clicks "Reject" → suggestions disappear and original text remains

### US3 Tasks

- [ ] T061 [P] Create AI service layer (lib/ai.ts) with Gemini integration
- [ ] T062 [US3] Create AIImproveButton component (components/resume/AIImproveButton.tsx) - reusable across sections
- [ ] T063 [US3] Implement "Improve Summary" feature with AI suggestions
- [ ] T064 [US3] Implement "Improve Experience bullets" feature with action verbs and metrics
- [ ] T065 [US3] Implement "Skills optimization" feature with related skills suggestions
- [ ] T066 [US3] Add loading states for AI calls (spinner, skeleton)
- [ ] T067 [US3] Add error handling and fallback UI when AI service unavailable
- [ ] T068 [US3] Implement rate limiting for AI calls (prevent abuse)
- [ ] T069 [US3] Create API route for AI improvements (app/api/ai/improve/route.ts)
- [ ] T070 [US3] Add acceptance/rejection logic for AI suggestions
- [ ] T071 [US3] Implement retry logic for failed AI calls

---

## Phase 6: User Story 4 - ATS Score Checker (Days 13-14)

**Goal**: Users can view ATS compatibility score with specific improvement suggestions.

**Independent Test**: User can view ATS score and suggestions, click on suggestions to highlight relevant sections.

**Acceptance Criteria**:
1. User views ATS Score card → score displayed with color coding (red < 60, yellow 60-80, green > 80)
2. User clicks on suggestion → relevant section highlighted in editor
3. User makes changes → score updates within 2 seconds

### US4 Tasks

- [ ] T072 [P] Create ATS scoring logic (lib/ats.ts) with keyword analysis and format validation
- [ ] T073 [US4] Create ATSScoreCard component (components/resume/ATSScoreCard.tsx) with score display
- [ ] T074 [US4] Implement ATS score calculation algorithm (keyword density, format, completeness)
- [ ] T075 [US4] Create suggestions panel (components/resume/ATSSuggestionsPanel.tsx)
- [ ] T076 [US4] Implement suggestion click → highlight relevant section in editor
- [ ] T077 [US4] Create API route for ATS scoring (app/api/ats/score/route.ts)
- [ ] T078 [US4] Implement score refresh on resume changes (debounced)
- [ ] T079 [US4] Add color coding for score ranges (red/yellow/green)

---

## Phase 7: User Story 5 - Template Switching (Days 15-16)

**Goal**: Users can switch between professional templates and see live preview updates.

**Independent Test**: User can switch templates and see preview update instantly (< 300ms).

**Acceptance Criteria**:
1. User opens template switcher → 5+ templates displayed with thumbnails
2. User clicks template → preview updates to show content in new template (< 300ms)
3. User switches templates → all content is preserved

### US5 Tasks

- [ ] T080 [P] Create template data structure and types (types/templates.ts)
- [ ] T081 [US5] Create Modern template (components/resume/templates/ModernTemplate.tsx)
- [ ] T082 [US5] Create Minimal template (components/resume/templates/MinimalTemplate.tsx)
- [ ] T083 [US5] Create Corporate template (components/resume/templates/CorporateTemplate.tsx)
- [ ] T084 [US5] Create Tech template (components/resume/templates/TechTemplate.tsx)
- [ ] T085 [US5] Create Creative template (components/resume/templates/CreativeTemplate.tsx)
- [ ] T086 [US5] Create TemplateSwitcher component (components/resume/TemplateSwitcher.tsx) - modal/bottom sheet
- [ ] T087 [US5] Implement live template switching with preview update (< 300ms)
- [ ] T088 [US5] Add template preview images (public/templates/)
- [ ] T089 [US5] Ensure all templates support all sections
- [ ] T090 [US5] Create template-specific styling system (CSS modules or Tailwind variants)


---

## Phase 8: User Story 6 - Job Match Analyzer (Days 17-18)

**Goal**: Users can paste a job description and see how well their resume matches it.

**Independent Test**: User can paste JD and see match analysis with percentage and missing skills.

**Acceptance Criteria**:
1. User opens Job Match Analyzer → paste area displayed
2. User pastes job description → system analyzes and displays match percentage
3. User views results → matching keywords highlighted, missing skills listed

### US6 Tasks

- [ ] T091 [P] Create job match analyzer logic (lib/job-match.ts) with keyword matching
- [ ] T092 [US6] Create JobMatchAnalyzer component (components/resume/JobMatchAnalyzer.tsx)
- [ ] T093 [US6] Implement job description parsing and analysis
- [ ] T094 [US6] Implement keyword matching algorithm (resume vs JD)
- [ ] T095 [US6] Create match results display (percentage, matching keywords, missing skills)
- [ ] T096 [US6] Create API route for job match analysis (app/api/job-match/analyze/route.ts)
- [ ] T097 [US6] Add visual indicators for match strength (color coding)
- [ ] T098 [US6] Implement skill gap analysis and suggestions

---

## Phase 9: PDF Export & Additional Features (Days 19-21)

**Goal**: Users can export their resume as high-quality PDF for all templates.

**Independent Test**: User can download PDF that matches preview for all templates.

### PDF Export Tasks

- [ ] T099 [P] Install @react-pdf/renderer library
- [ ] T100 Create PDF service layer (lib/pdf.ts) for PDF generation
- [ ] T101 Create PDF templates for each resume template
- [ ] T102 Create PDF export button (components/resume/PDFExportButton.tsx)
- [ ] T103 Implement PDF generation logic with all sections
- [ ] T104 Implement PDF download functionality
- [ ] T105 Create API route for PDF generation (app/api/pdf/generate/route.ts)
- [ ] T106 Add loading state during PDF generation
- [ ] T107 Implement file naming logic (resume-name-date.pdf)
- [ ] T108 Test PDF output across browsers
- [ ] T109 Optimize PDF file size

---

## Phase 10: Polish, Animation & Responsiveness (Days 22-25)

**Goal**: Add animations, loading states, and final responsiveness polish.

### Polish Tasks

- [ ] T110 [P] Install Framer Motion for animations
- [ ] T111 Add smooth transitions to form inputs (Framer Motion)
- [ ] T112 Add section collapse/expand animations
- [ ] T113 Add template switch animation
- [ ] T114 Create loading skeletons for all sections (components/common/Skeleton.tsx)
- [ ] T115 Create beautiful empty states for all sections
- [ ] T116 Implement mobile responsiveness final polish
- [ ] T117 Add keyboard shortcuts (Ctrl+S save, Ctrl+Z undo, etc.)
- [ ] T118 Performance optimization: code splitting and lazy loading
- [ ] T119 Performance optimization: Zustand selector optimization
- [ ] T120 Dark mode refinement and testing
- [ ] T121 Add accessibility improvements (ARIA labels, keyboard navigation)
- [ ] T122 Create comprehensive error messages and user guidance

---

## Phase 11: Testing & Refinement (Days 26-28)

**Goal**: Cross-browser testing, accessibility audit, bug fixing, and final refinement.

### Testing Tasks

- [ ] T123 [P] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] T124 Mobile device testing (iOS Safari, Android Chrome)
- [ ] T125 Accessibility audit (WCAG 2.1 AA compliance)
- [ ] T126 Performance profiling and optimization
- [ ] T127 Bug fixing round 1 (critical issues)
- [ ] T128 Bug fixing round 2 (minor issues)
- [ ] T129 UI/UX refinement based on testing
- [ ] T130 Code review and cleanup
- [ ] T131 Create comprehensive README documentation
- [ ] T132 Add inline code comments for complex logic
- [ ] T133 Final deployment to Vercel

---

## Task Dependencies & Execution Order

### Critical Path (Must Complete in Order)

1. **Phase 1** (Setup) → All other phases depend on this
2. **Phase 2** (Auth + Dashboard) → Required before any user story work
3. **Phase 3** (US1: Create/Edit) → Foundation for all other features
4. **Phase 4** (US2: Drag & Drop) → Depends on US1
5. **Phase 5** (US3: AI) → Can run parallel with US2
6. **Phase 6** (US4: ATS) → Can run parallel with US3
7. **Phase 7** (US5: Templates) → Can run parallel with US4
8. **Phase 8** (US6: Job Match) → Can run parallel with US5
9. **Phase 9** (PDF Export) → Depends on all user stories
10. **Phase 10** (Polish) → Depends on all features
11. **Phase 11** (Testing) → Final phase

### Parallelizable Tasks

**After Phase 2 (Auth + Dashboard) completes:**
- US1 (Create/Edit) and US2 (Drag & Drop) can run in parallel
- US3 (AI), US4 (ATS), US5 (Templates), US6 (Job Match) can run in parallel after US1

**Parallel Execution Example:**
```
Day 1: Phase 1 (Setup)
Day 2-3: Phase 2 (Auth + Dashboard)
Day 4-7: Phase 3 (US1) + Phase 4 (US2) in parallel
Day 8-12: Phase 5 (US3) + Phase 6 (US4) + Phase 7 (US5) in parallel
Day 13-18: Phase 8 (US6) + Phase 9 (PDF) in parallel
Day 19-25: Phase 10 (Polish)
Day 26-28: Phase 11 (Testing)
```

---

## Success Criteria (All Tasks Complete)

- ✅ Real-time preview working smoothly (< 200ms updates)
- ✅ Drag & drop fully functional with visual feedback
- ✅ AI buttons working with good UX (loading states, error handling)
- ✅ ATS Score visible with actionable suggestions
- ✅ PDF download working for all templates
- ✅ Mobile experience excellent (responsive, touch-friendly)
- ✅ Code clean, fully typed, maintainable
- ✅ WCAG 2.1 AA compliant
- ✅ Performance optimized (page load < 1.2s, preview < 200ms)
- ✅ All 6 user stories implemented and tested
- ✅ Cross-browser compatibility verified
- ✅ Zero critical bugs

---

## Task Summary

**Total Tasks**: 133  
**Phase 1 (Setup)**: 14 tasks  
**Phase 2 (Auth + Dashboard)**: 17 tasks  
**Phase 3 (US1)**: 19 tasks  
**Phase 4 (US2)**: 10 tasks  
**Phase 5 (US3)**: 11 tasks  
**Phase 6 (US4)**: 8 tasks  
**Phase 7 (US5)**: 11 tasks  
**Phase 8 (US6)**: 8 tasks  
**Phase 9 (PDF)**: 11 tasks  
**Phase 10 (Polish)**: 13 tasks  
**Phase 11 (Testing)**: 11 tasks  

**Estimated Duration**: 28 days (4 weeks)  
**Parallelizable Tasks**: ~40% of total (can reduce duration to 18-20 days with parallel execution)

---

**Status**: Ready for `/sp.implement` phase  
**Next Step**: Execute tasks in priority order, starting with Phase 1 (Setup)

