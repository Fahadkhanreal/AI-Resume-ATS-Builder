---
id: 006
title: Read the AI Resume Builder project end to end
stage: general
date: 2026-08-11
surface: agent
model: oc/deepseek-v4-flash-free
feature: none
branch: main
user: Fahadkhanreal
command: "mera pura project read kro ats resume builder"
labels: ["project-overview", "resume-builder", "architecture", "exploration"]
links:
  spec: specs/1-resume-builder/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - CLAUDE.md
 - frontend/package.json
 - frontend/prisma/schema.prisma
 - frontend/app/dashboard/page.tsx
 - frontend/app/resume/[resumeId]/edit/page.tsx
 - frontend/app/page.tsx
 - frontend/app/page-client.tsx
 - frontend/lib/store/resume.store.ts
 - frontend/lib/ai/gemini.ts
 - frontend/lib/ats/scorer.ts
 - frontend/lib/ats/keyword-analyzer.ts
 - frontend/lib/ats/readability.ts
 - frontend/lib/job-match/analyzer.ts
 - frontend/lib/pdf/generator.ts
 - frontend/lib/pdf/templates.ts
 - frontend/lib/auth.ts
 - frontend/lib/db.ts
 - frontend/lib/resume-utils.ts
 - frontend/lib/resume-validator.ts
 - frontend/lib/rate-limit.ts
 - frontend/lib/errors/handlers.ts
 - frontend/lib/schemas/resume.ts
 - frontend/lib/schemas/ai.ts
 - frontend/lib/templates/index.ts
 - frontend/types/index.ts
 - frontend/types/resume.ts
 - frontend/proxy.ts
 - frontend/components/resume/BuilderLayout.tsx
 - frontend/components/resume/LivePreview.tsx
 - frontend/components/resume/templates/index.ts
 - frontend/components/resume/templates/registry.ts
 - frontend/components/resume/templates/SharedResumeTemplate.tsx
 - frontend/app/api/resumes/route.ts
 - frontend/app/api/resumes/[resumeId]/route.ts
 - frontend/app/api/resumes/[resumeId]/ai/ats-score/route.ts
 - frontend/app/api/ai/improve/route.ts
 - frontend/app/api/auth/webhook/route.ts
tests:
 - none run (read-only exploration)
---

## Prompt

mera pura project read kro ats resume builder

## Response snapshot

Read-only full-project exploration. Identified a Next.js 16 (App Router) + TypeScript monorepo-style setup (`ai-resume` root delegates to `frontend/`), Tailwind 4 + shadcn/ui, Zustand state, dnd-kit DnD, Clerk auth, Neon Postgres + Prisma 7 (PrismaNeon serverless adapter), Gemini 2.5 Flash for AI features, Upstash Redis rate limiting, and Puppeteer-based PDF generation. Mapped: data model (User + Resume with JSON `data` column); store/state merge logic (resume.store.ts normalizes legacy split fields into a single `data` payload); 8 template-layout registry (46 templates in registry.ts rendered by SharedResumeTemplate); ATS scoring pipeline (keyword analyzer + structure + readability + completeness penalty); API route surface (resumes CRUD, per-resume AI routes, stats, templates, health, debug/gemini); Clerk webhook upsert for users; proxy.ts clerkMiddleware protecting dashboard/resume/api routes.

## Outcome

- ✅ Impact: Full architectural map of the AI Resume + ATS Builder delivered for follow-up tasks.
- 🧪 Tests: none run (read-only exploration requested).
- 📁 Files: no files modified; new PHR created at history/prompts/general/006-read-full-project.general.prompt.md.
- 🔁 Next prompts: implementation requests such as new features, bug fixes, or enhancement of ATS/AI/templates.
- 🧠 Reflection: Many helpers encode legacy dual data layouts (flat fields + `data` object). Any future edit must keep the normalization logic in resume.store.ts and LivePreview.ts in sync.

## Evaluation notes (flywheel)

- Failure modes observed: none required; exploration only.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none proposed.