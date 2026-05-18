---
id: 2
title: Frontend Specification
stage: spec
date: 2026-05-18
surface: agent
model: kr/claude-haiku-4.5-agentic
feature: resume-builder
branch: 1-resume-builder
user: Fahadkhanreal
command: /sp.specify
labels: ["spec", "frontend", "resume-builder", "sdd"]
links:
  spec: specs/1-resume-builder/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/1-resume-builder/spec.md
  - specs/1-resume-builder/checklists/requirements.md
tests:
  - none
---

## Prompt

# Frontend Specification - AI Resume + ATS Builder

**Version:** 1.0  
**Date:** May 18, 2026  
**Status:** Approved  
**Methodology:** Spec-Driven Development

## 1. Frontend Vision

Ek **modern, fast, beautiful aur professional** frontend jo users ko Canva + Notion jaisa experience de. Left side mein powerful editor aur right side mein real-time resume preview — bilkul seamless aur delightful.

## 2. Tech Stack (Frontend)

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

## 3. Design Principles (VIP Standards)

- **Modern Minimal Aesthetic** with premium feel
- **Dark Mode First** (with Light mode support)
- **Generous whitespace** and elegant typography
- **Consistent spacing** (using Tailwind spacing scale)
- **Micro-interactions** and smooth transitions
- **Professional color palette** (deep blues, grays, accents of emerald/green)
- **Mobile-first + Fully Responsive**
- **Accessibility** (WCAG 2.1 AA compliant)

## 4. Folder Structure

```bash
/app
├── (auth)/                  # Auth pages
├── dashboard/
├── resume/
│   ├── [resumeId]/
│   │   ├── edit/            # Main Resume Builder
│   │   └── preview/
├── api/                     # Route Handlers
├── components/
│   ├── ui/                  # shadcn components
│   ├── resume/
│   │   ├── BuilderLayout.tsx
│   │   ├── LivePreview.tsx
│   │   ├── SectionRenderer.tsx
│   │   ├── DragDropEditor.tsx
│   │   ├── AIButtons.tsx
│   │   └── templates/
│   ├── common/
│   └── layout/
├── lib/
│   ├── store/               # Zustand stores
│   ├── utils/
│   └── ai.ts
├── hooks/
└── types/
```

## 5. Main Pages & Layouts

**Public Pages:**
- Landing Page (/)
- Pricing Page
- Features Page

**Auth Pages:**
- /sign-in
- /sign-up
- /forgot-password
- /reset-password

**Protected Pages:**
- /dashboard → Resumes list, create new, etc.
- /resume/[resumeId]/edit → Main Builder (Split Layout)
- /resume/[resumeId]/preview

## 6. Core Layout - Resume Builder

**Split Screen Layout (Desktop):**
- Left Panel (40-45%): Drag & Drop Editor + Forms
- Right Panel (55-60%): Live Resume Preview (Real-time)

**Features in Builder:**
- Collapsible sidebar for sections list
- Add new section button (+ icon)
- Drag to reorder sections
- One-click AI improve buttons on each section
- Real-time sync between form and preview
- Auto-save (every 3 seconds + manual save)

## 7. Key Components (High Priority)

| Component | Description | Priority |
|-----------|-------------|----------|
| ResumeBuilderLayout | Main split layout | ★★★★★ |
| LivePreview | Real-time resume renderer | ★★★★★ |
| DraggableSection | dnd-kit enabled sections | ★★★★★ |
| PersonalInfoForm | Name, title, contact, links | ★★★★★ |
| ExperienceEditor | Rich bullet points with AI improve | ★★★★★ |
| AISuggestionButton | Floating AI buttons | ★★★★★ |
| ATSScoreCard | Score + suggestions | ★★★★★ |
| TemplateSwitcher | Bottom sheet / modal with live preview | ★★★★ |
| JobMatchAnalyzer | JD paste + analysis panel | ★★★★★ |

## 8. State Management Strategy

**Main Store: useResumeStore (Zustand)**
- Current resume data (full JSON)
- Selected template
- ATS Score
- Loading states for AI calls

**UI Store: useUIStore**
- Sidebar collapse state
- Preview zoom level
- Active section

## 9. Performance Requirements

- Live preview update < 200ms
- First contentful paint < 1.2s
- Lazy load heavy components
- Optimize re-renders using Zustand selectors
- Debounced auto-save

## 10. Responsiveness

- Desktop → Split view
- Tablet → Stacked with toggle
- Mobile → Bottom preview sheet + editor focused

## 11. Non-Functional Requirements

- Fully typed (TypeScript)
- Proper error boundaries
- Loading skeletons & states
- Toast notifications (Sonner)
- Keyboard shortcuts support (future)
- Beautiful empty states

## Response snapshot

Frontend specification created for AI Resume + ATS Builder. Comprehensive SDD-compliant spec with:

- 6 prioritized user stories (P1-P3) covering core features
- 12 functional requirements with clear acceptance criteria
- 5 key entities (Resume, Section, ExperienceEntry, EducationEntry, SkillEntry)
- 10 measurable success criteria (time-based, quality-based, accessibility)
- 5 edge cases identified and addressed
- Assumptions documented for clarity
- Out-of-scope items clearly listed for post-MVP phases

Specification is technology-agnostic, focused on user value, and ready for planning phase.

## Outcome

- ✅ Impact: Complete frontend specification established; ready for `/sp.plan` phase
- 🧪 Tests: Specification quality checklist PASS - all items complete
- 📁 Files: specs/1-resume-builder/spec.md, specs/1-resume-builder/checklists/requirements.md
- 🔁 Next prompts: /sp.plan (architecture), /sp.tasks (implementation tasks)
- 🧠 Reflection: Spec is clear, testable, and aligned with constitution principles (User First, ATS Compatibility, Performance, Quality Over Speed)

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS - all checklist items complete
- Prompt variant (if applicable): none
- Next experiment: Validate plan-template.md alignment with specification requirements
