---
id: 012
title: Keep Skills on-page and prevent PDF overflow
stage: refactor
date: 2026-08-11
surface: agent
model: oc/deepseek-v4-flash-free
feature: 1-resume-builder
branch: main
user: Fahadkhanreal
command: "skills section overflowing to second page in exported CV; fix layout to fit one page"
labels: ["pdf-export", "page-overflow", "skills-section", "layout"]
links:
  spec: specs/1-resume-builder/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - frontend/lib/pdf.tsx
tests:
 - npx tsc --noEmit (passed, clean)
 - npx eslint lib/pdf.tsx (0 errors, 1 pre-existing Image alt warning)
---

## Prompt

User reported that in exported PDFs the Skills section (and other content) overflows onto a second page, making the CV look bad.

## Response snapshot

Diagnosed as A4 height overflow in @react-pdf. Fixed by compacting the layout and making sections unbreakable:

- Page padding reduced (40 -> 36h/30v), base font size 10.5, header margins/photo smaller.
- Section margins, section-title size, entry spacing, bullets, and skill chips all compacted.
- Each top-level section `View` gets `wrap={false}` + `minPresenceAhead={30}` so a section either fits fully on the current page or moves entirely to the next — never splits mid-section.
- Sidebar layout cards also get `wrap={false}` + `alignItems: flex-start` so the two columns don't force the page to grow.

Verified tsc clean and eslint 0 errors.

## Outcome

- ✅ Impact: Content is more compact and sections no longer split across pages — Skills and other sections stay together on one page when they fit.
- 🧪 Tests: npx tsc --noEmit clean; npx eslint 0 errors (1 pre-existing Image alt warning).
- 📁 Files: frontend/lib/pdf.tsx.
- 🔁 Next prompts: deploy to Vercel and visually verify one-page fit.
- 🧠 Reflection: @react-pdf flow layout auto-splits; `wrap={false}` + `minPresenceAhead` gives clean section-level pagination. Still inherently bounded by A4 height — very long content will use more pages, but without mid-section splits.

## Evaluation notes (flywheel)

- Failure modes observed: content overflow due to generous spacing + auto page splitting.
- Graders run and results (PASS/FAIL): tsc PASS; eslint PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none proposed.