---
id: 008
title: Fix missing Experience description in PDF export
stage: green
date: 2026-08-11
surface: agent
model: oc/deepseek-v4-flash-free
feature: 1-resume-builder
branch: main
user: Fahadkhanreal
command: "ha fix krdo (Experience description missing in exported PDF)"
labels: ["pdf-export", "experience-section", "description", "bugfix"]
links:
  spec: specs/1-resume-builder/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - frontend/lib/pdf.tsx
 - frontend/lib/pdf/templates.ts
tests:
 - npx tsc --noEmit (passed, clean)
 - npx eslint lib/pdf.tsx lib/pdf/templates.ts (0 errors; 1 pre-existing Image alt warning)
---

## Prompt

Experience section data entered (jobTitle, description "Developed responsive...", endDate "Present") shows in preview but exported PDF only shows title and "- Present". User: "ha fix krdo".

## Response snapshot

Diagnosed: client PDF component (`frontend/lib/pdf.tsx` PDFResume) rendered Experience with only jobTitle, company, date range and bullets — it never rendered `exp.description` (and only read `jobTitle`, not `position`/`achievements`), and date formatting produced a leading " - Present" when startDate was empty. Server HTML renderer (`lib/pdf/templates.ts`) did render description but had the same date/spacing and missing bullets/position issues. Fixed both paths: added description rendering, fallback to `position` for job title, fallback `bullets`/`achievements`, and filtered empty date parts so the range renders cleanly ("Present" alone). Also cleaned up stray `</div>` tags in Projects/Certifications inserted earlier, added bullet <ul>/<li> CSS, and replaced all `as any` casts with typed helpers (FlexEntry, str, strArr) to satisfy eslint `@typescript-eslint/no-explicit-any`. Verified tsc + eslint clean.

## Outcome

- ✅ Impact: Exported PDFs now include Experience description + bullets with clean date formatting; Projects/Certifications HTML structure balanced.
- 🧪 Tests: npx tsc --noEmit clean; npx eslint 0 errors (1 pre-existing Image alt warning).
- 📁 Files: frontend/lib/pdf.tsx, frontend/lib/pdf/templates.ts.
- 🔁 Next prompts: deploy to Vercel and manually verify export; other sections parity check.
- 🧠 Reflection: Client PDF and server HTML renderers had drifted from SharedResumeTemplate (preview). Both fixed. Remaining `as any` in templates.ts intentionally replaced; keep typed helpers for future sections.

## Evaluation notes (flywheel)

- Failure modes observed: PDF renderer omitted `description`; date glue produced dangling separators; eslint rejects `any`.
- Graders run and results (PASS/FAIL): tsc PASS; eslint PASS (0 errors).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none proposed.