---
id: 007
title: Fix missing Projects sections in PDF export
stage: green
date: 2026-08-11
surface: agent
model: oc/deepseek-v4-flash-free
feature: 1-resume-builder
branch: main
user: Fahadkhanreal
command: "ha fix kardo"
labels: ["pdf-export", "projects-section", "certifications", "bugfix"]
links:
  spec: specs/1-resume-builder/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - frontend/lib/pdf.tsx
 - frontend/lib/pdf/templates.ts
tests:
 - npx tsc --noEmit (passed, no output = clean)
---

## Prompt

ha fix kardo (fix the missing Projects section in PDF export)

## Response snapshot

Diagnosed that `PDFResume` in `frontend/lib/pdf.tsx` (used by the client-side Export button via `@react-pdf/renderer`) did not render Projects or Certifications sections at all, even though the SharedResumeTemplate preview did. The server-side HTML PDF path `frontend/lib/pdf/templates.ts` (renderResumeHtml used by /api/resumes/[resumeId]/pdf) had the same omission. Fixed both by adding Projects (name, url/link, description, technologies) and Certifications (name, issuer) sections. Verified with `npx tsc --noEmit` passing.

## Outcome

- ✅ Impact: Projects and Certifications now appear in exported PDFs (both the client-side @react-pdf path and the server-side Puppeteer/HTML path).
- 🧪 Tests: `npx tsc --noEmit` passed (clean).
- 📁 Files: frontend/lib/pdf.tsx, frontend/lib/pdf/templates.ts (no user data touched).
- 🔁 Next prompts: manual export PDF check on Vercel; possibly other sections not present in PDF.
- 🧠 Reflection: Client PDF component and server HTML template had drifted apart from the live-preview template component. Keeping all three in sync (SharedResumeTemplate.tsx, pdf.tsx, pdf/templates.ts) is required for parity.

## Evaluation notes (flywheel)

- Failure modes observed: template drift between preview and PDF renderers.
- Graders run and results (PASS/FAIL): tsc --noEmit PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none proposed.