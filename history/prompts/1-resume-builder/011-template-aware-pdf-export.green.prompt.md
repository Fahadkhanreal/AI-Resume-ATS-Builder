---
id: 011
title: Full template-aware PDF export for all 35 templates
stage: green
date: 2026-08-11
surface: agent
model: oc/deepseek-v4-flash-free
feature: 1-resume-builder
branch: main
user: Fahadkhanreal
command: "complete fix krdo (all templates look same in exported PDF)"
labels: ["pdf-export", "templates", "styling", "feature"]
links:
  spec: specs/1-resume-builder/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - frontend/lib/pdf/template-styles.ts
 - frontend/lib/pdf.tsx
 - frontend/lib/pdf/templates.ts
 - frontend/lib/pdf/generator.ts
 - frontend/app/api/resumes/[resumeId]/pdf/route.ts
 - frontend/types/resume.ts
tests:
 - npx tsc --noEmit (passed, clean)
 - npx eslint lib/pdf.tsx lib/pdf/templates.ts lib/pdf/template-styles.ts lib/pdf/generator.ts app/api/resumes/[resumeId]/pdf/route.ts (0 errors, 1 pre-existing Image alt warning)
---

## Prompt

User reported that all 35 resume templates look identical when exporting to PDF, unlike the live preview where each template has distinct styling. Requested a complete fix.

## Response snapshot

Root cause: PDFResume (client) and renderResumeHtml (server) never read the template config from registry — PDFResume only special-cased 2 template ids for accent color; the server HTML was plain. Fix:

- Added `lib/pdf/template-styles.ts`: maps all 35 registry ids to PDF-friendly styles (accent, heading color, skill chip colors, soft bg, optional dark header bg, font family Helvetica/Times-Roman/Courier, layout standard/sidebar/compact).
- Rewrote `lib/pdf.tsx` PDFResume to consume the style map: theme-aware header (dark bg + white text for headerBg templates), accent/heading colors, skill chip colors, font family, and a real sidebar layout for sidebar templates.
- Rewrote `lib/pdf/templates.ts` renderResumeHtml to also consume the style map via CSS variables: accent h2 borders, dark header box, font stack, sidebar two-column layout with cards.
- Threaded `templateId` through the server path: generator.ts signature + pdf/route.ts passes resume.templateId.
- Added `title` to `PersonalInfo` type (templates.ts needed it for the professional title line).

Verified tsc clean and eslint 0 errors.

## Outcome

- ✅ Impact: Each of the 35 templates now produces a distinctly styled PDF (colors, fonts, header treatment, sidebar vs standard layout), matching the visual intent of the live preview, across both export paths.
- 🧪 Tests: npx tsc --noEmit clean; npx eslint 0 errors (1 pre-existing Image alt warning).
- 📁 Files: 6 files (new template-styles map + 5 updated).
- 🔁 Next prompts: deploy to Vercel; visually compare a few templates' PDFs to previews.
- 🧠 Reflection: The style map is the single source of truth for PDF theming; keep it aligned with registry.ts when adding templates. Fonts are limited to built-in PDF fonts (@react-pdf + Puppeteer) — custom webfonts would need embedding.

## Evaluation notes (flywheel)

- Failure modes observed: no `fontFamily` in template-styles for default; fixed via DEFAULT.
- Graders run and results (PASS/FAIL): tsc PASS; eslint PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none proposed.