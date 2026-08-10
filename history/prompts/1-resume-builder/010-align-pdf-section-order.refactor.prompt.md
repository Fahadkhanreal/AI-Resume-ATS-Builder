---
id: 010
title: Align PDF section order with live preview
stage: refactor
date: 2026-08-11
surface: agent
model: oc/deepseek-v4-flash-free
feature: 1-resume-builder
branch: main
user: Fahadkhanreal
command: "projects section order wrong in exported PDF; fix section order and link formatting"
labels: ["pdf-export", "section-order", "projects", "layout"]
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
 - npx eslint lib/pdf.tsx lib/pdf/templates.ts (0 errors, 1 pre-existing Image alt warning)
---

## Prompt

User reported that in the exported PDF the Projects section appeared at the very end after Skills, and links rendered as raw bulky URLs ("bilkul betarteeb"). In the live preview, Skills appear last and Projects/Certifications come before it.

## Response snapshot

Analyzed SharedResumeTemplate.tsx order: Summary → Experience → Education → Projects → Certifications → Skills. Both PDF renderers had diverged:
- lib/pdf.tsx had Skills before Projects (Projects/Certifications at the end).
- lib/pdf/templates.ts had Skills after Education and Projects/Certifications at the very end.

Fixed order in both renderers to match preview (Projects + Certifications before Skills, Skills last). Kept clean link styling (meta/grey subtitle). Verified tsc + eslint clean. Note: raw URL display retained — PDF text link display, not clickable; acceptable to keep simple.

## Outcome

- ✅ Impact: Exported PDFs now render sections in the same order as the live preview: Summary, Experience, Education, Projects, Certifications, Skills.
- 🧪 Tests: npx tsc --noEmit clean; npx eslint 0 errors (1 pre-existing Image alt warning).
- 📁 Files: frontend/lib/pdf.tsx, frontend/lib/pdf/templates.ts.
- 🔁 Next prompts: deploy to Vercel and visually verify PDF order.
- 🧠 Reflection: All three render paths (SharedResumeTemplate preview, PDFResume client PDF, renderResumeHtml server PDF) need to agree on section order; keep them in lockstep going forward.

## Evaluation notes (flywheel)

- Failure modes observed: renderer drift in section ordering across preview vs PDF.
- Graders run and results (PASS/FAIL): tsc PASS; eslint PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none proposed.