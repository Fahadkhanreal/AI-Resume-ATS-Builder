---
name: ai-resume-constitution
description: AI Resume + ATS Builder project governance, 8 core principles, locked tech stack, MVP features
metadata:
  type: project
---

# AI Resume + ATS Builder Constitution

**Version:** 1.0.0 | **Ratified:** 2026-05-18 | **Last Amended:** 2026-05-18

## Project Vision

Ek powerful, beautiful aur intelligent AI-powered Resume Builder SaaS jo job seekers ko ATS-friendly, professional aur high-conversion resumes banane mein madad kare. Yeh tool users ko sirf resume nahi, balki **interview chances badhane wala competitive advantage** dega.

## 8 Immutable Core Principles

1. **User First** — Experience Canva jaisa smooth aur delightful hona chahiye
2. **ATS Compatibility** — Har resume default mein ATS-friendly (standard fonts, proper structure, no complex graphics)
3. **AI as Assistant (No Hallucination)** — AI helpful, professional, honest; structured JSON only
4. **Privacy & Security** — User data highly secure; end-to-end encryption where possible
5. **Performance** — Live preview < 300ms; page load < 1.5s
6. **Mobile First + Responsive** — Desktop aur mobile dono pe zabardast experience
7. **Quality Over Speed** — Beautiful UI/UX aur clean code priority
8. **Scalability** — Freemium model ke hisaab se design kiya jayega

## Locked Tech Stack

**Frontend:** Next.js 15 (App Router) + TypeScript, Tailwind CSS + shadcn/ui, Zustand, dnd-kit, React Hook Form + Zod

**AI:** Google Gemini (2.5 Flash + Pro), structured JSON output only

**Auth:** Clerk (Email + Password + Google + Forgot Password)

**Database:** Neon (PostgreSQL) + Prisma ORM

**PDF:** @react-pdf/renderer (preview) + Puppeteer / html2pdf (final export)

**Other:** Vercel, Resend / Nodemailer, rate limiting & usage tracking

## MVP Features (9 Core)

1. Authentication + Dashboard
2. Drag & Drop Resume Builder
3. Live Preview (Left form → Right preview)
4. AI Features (Summary, Experience, Skills, etc.)
5. ATS Score Checker + Suggestions
6. Multiple Professional Templates
7. Job Match Analyzer
8. High-Quality PDF Export
9. Save / Duplicate / Multiple Resumes

## Success Metrics

- Users create first resume in < 8 minutes
- Average ATS Score > 85
- High PDF download to signup ratio
- Positive user feedback on AI quality

## Amendment Procedure

All changes require explicit user approval. Version bumps follow semantic versioning:
- MAJOR: Backward incompatible principle removals/redefinitions
- MINOR: New principles or materially expanded guidance
- PATCH: Clarifications, wording, typo fixes

**This Constitution is the source of truth.** Koi bhi decision iske against nahi liya ja sakta.
