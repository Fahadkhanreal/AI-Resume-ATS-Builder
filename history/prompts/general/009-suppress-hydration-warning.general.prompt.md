---
id: 009
title: Suppress browser-extension hydration warning on body
stage: green
date: 2026-08-11
surface: agent
model: oc/deepseek-v4-flash-free
feature: 1-resume-builder
branch: main
user: Fahadkhanreal
command: "hydration mismatch console error on body cz-shortcut-listen"
labels: ["hydration", "layout", "browser-extension", "warning-suppression"]
links:
  spec: specs/1-resume-builder/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - frontend/app/layout.tsx
tests:
 - npx tsc --noEmit (passed, clean)
---

## Prompt

User pasted a React hydration-mismatch console error pointing at `app/layout.tsx` line 82: the client body had attribute `cz-shortcut-listen="true"` (injected by a browser extension) that the server-rendered HTML lacked.

## Response snapshot

Diagnosed as a false-positive hydration warning caused by a browser extension injecting `cz-shortcut-listen="true"` on the <body> after server render; not a code bug. Applied `suppressHydrationWarning` to the <body> element (html already had it). This silences the extension-attribute mismatch while keeping real hydration mismatches surfaced elsewhere. Verified with npx tsc --noEmit (clean).

## Outcome

- ✅ Impact: The false hydration mismatch console error on / is silenced; <html> and <body> now both tolerate extension-injected attributes.
- 🧪 Tests: npx tsc --noEmit clean.
- 📁 Files: frontend/app/layout.tsx.
- 🔁 Next prompts: deploy to Vercel; verify console clean in incognito (no extension) and normal browser.
- 🧠 Reflection: suppressHydrationWarning on both <html> and <body> is a common, safe pattern for Next.js apps affected by browser extensions; fix was minimal and non-destructive.

## Evaluation notes (flywheel)

- Failure modes observed: extension-driven false hydration mismatch.
- Graders run and results (PASS/FAIL): tsc PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none proposed.