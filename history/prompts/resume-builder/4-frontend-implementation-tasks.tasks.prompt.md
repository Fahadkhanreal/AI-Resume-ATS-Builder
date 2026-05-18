---
id: 4
title: Frontend Implementation Tasks
stage: tasks
date: 2026-05-18
surface: agent
model: kr/claude-haiku-4.5-agentic
feature: resume-builder
branch: 1-resume-builder
user: Fahadkhanreal
command: /sp.tasks
labels: ["tasks", "frontend", "resume-builder", "implementation", "sdd"]
links:
  spec: specs/1-resume-builder/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/1-resume-builder/tasks.md
tests:
  - none
---

## Prompt

# Frontend Tasks - AI Resume + ATS Builder

**Project:** AI Resume + ATS Builder  
**Spec Reference:** `specs/1-resume-builder/spec.md`  
**Plan Reference:** `specs/1-resume-builder/plan.md`  
**Status:** Ready to Execute

## Phase 0: Project Setup (Day 1)

- [ ] Next.js 15 App Router + TypeScript project create
- [ ] Tailwind CSS + shadcn/ui setup
- [ ] Dark mode configuration (next-themes)
- [ ] Folder structure creation (as per spec)
- [ ] Clerk environment variables setup
- [ ] Zustand store setup
- [ ] ESLint + Prettier + TypeScript strict mode
- [ ] `.env.example` file create
- [ ] Basic layout + root layout design
- [ ] Vercel deployment (initial)

## Phase 1: Authentication & Dashboard (Days 2-3)

- [ ] Clerk integration (middleware + provider)
- [ ] Sign-in page design & implementation
- [ ] Sign-up page design & implementation
- [ ] Forgot Password + Reset Password flow
- [ ] Protected Route middleware
- [ ] Dashboard layout (sidebar + header)
- [ ] Dashboard page (My Resumes grid)
- [ ] "Create New Resume" button + empty state
- [ ] Beautiful toast notifications (Sonner)

## Phase 2: Core Resume Builder Layout (Days 4-5)

- [ ] Resume data types (`types/resume.ts`)
- [ ] Main Zustand store (`useResumeStore`)
- [ ] Resume Builder Layout (`/resume/[resumeId]/edit`)
- [ ] Split screen layout (Left Editor + Right Preview)
- [ ] Responsive toggle (mobile → stacked view)
- [ ] LivePreview component (basic version)
- [ ] Sidebar with Sections list

## Phase 3: Drag & Drop System (Days 6-7)

- [ ] dnd-kit installation & setup
- [ ] DraggableSection component
- [ ] Reordering sections functionality
- [ ] Add New Section button + modal
- [ ] Delete & Duplicate section options
- [ ] Auto-save functionality (debounced)
- [ ] Undo/Redo support (optional - nice to have)

## Phase 4: Forms & Section Editors (Days 8-11)

- [ ] Personal Information Form
- [ ] Professional Summary Editor + AI Button
- [ ] Experience Section Editor (Add/Edit/Delete entries + bullets)
- [ ] Education Section Editor
- [ ] Skills Section Editor (with tags)
- [ ] Projects Section Editor
- [ ] Certifications & Additional Sections
- [ ] React Hook Form + Zod validation

## Phase 5: AI Integration (Days 12-14)

- [ ] AI service file (`lib/ai/gemini.ts`)
- [ ] Reusable AI Button component
- [ ] Improve Summary feature
- [ ] Improve Experience bullets feature
- [ ] Skills optimization feature
- [ ] Loading states & error handling for AI
- [ ] Rate limit handling UI

## Phase 6: Templates System (Days 15-17)

- [ ] Template data structure & types
- [ ] 6+ Resume Templates creation
- [ ] Template Switcher modal / bottom sheet
- [ ] Live template switching
- [ ] Template-specific styling system

## Phase 7: ATS Score & Job Match (Days 18-20)

- [ ] ATS Score Card component
- [ ] ATS Analysis logic + UI
- [ ] Suggestions panel
- [ ] Job Match Analyzer panel
- [ ] Job Description input area
- [ ] Match percentage + missing keywords UI

## Phase 8: PDF Export (Days 21-22)

- [ ] @react-pdf/renderer setup
- [ ] PDF Resume templates
- [ ] Generate & Download PDF
- [ ] Loading state during PDF generation
- [ ] File naming logic

## Phase 9: Polish & Optimization (Days 23-26)

- [ ] Framer Motion animations
- [ ] Loading skeletons
- [ ] Empty states design
- [ ] Mobile responsiveness final fixes
- [ ] Performance optimization (memo, selectors)
- [ ] Accessibility improvements
- [ ] UI/UX refinement

## Phase 10: Testing & Handover (Days 27-28)

- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Bug fixing round
- [ ] Code review & cleanup
- [ ] Documentation (README + comments)

## Response snapshot

Frontend implementation tasks generated for AI Resume + ATS Builder. Comprehensive task list with:

- **133 total tasks** organized by user story (US1-US6)
- **11 phases**: Setup → Auth → Builder → Drag & Drop → Forms → AI → Templates → ATS/Job Match → PDF → Polish → Testing
- **Task format**: Strict checklist format with Task IDs (T001-T133), parallelization markers [P], story labels [US1-US6], and file paths
- **Dependency graph**: Critical path identified, parallelizable tasks marked (~40% can run in parallel)
- **Estimated duration**: 28 days (4 weeks) sequential, 18-20 days with parallel execution
- **Success criteria**: All 6 user stories implemented, real-time preview < 200ms, drag-and-drop functional, AI integration working, ATS scoring, PDF export, mobile responsive, WCAG 2.1 AA compliant

Tasks are organized by user story to enable independent implementation and testing. Each user story is independently testable and can be deployed separately.

## Outcome

- ✅ Impact: Complete implementation task list ready for execution; ready for `/sp.implement` phase
- 🧪 Tests: Task format validation PASS - all 133 tasks follow strict checklist format
- 📁 Files: specs/1-resume-builder/tasks.md (complete with all 11 phases)
- 🔁 Next prompts: /sp.implement (execute tasks), /sp.git.commit_pr (commit and create PR)
- 🧠 Reflection: Tasks are specific, actionable, and independently testable. Clear dependencies and parallelization opportunities identified. Aligned with specification and plan.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS - all 133 tasks follow strict checklist format with Task IDs, parallelization markers, story labels, and file paths
- Prompt variant (if applicable): none
- Next experiment: Execute Phase 1 (Setup) tasks to initialize Next.js 15 project
