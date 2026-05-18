---
id: 1
title: Constitution Initial
stage: constitution
date: 2026-05-18
surface: agent
model: kr/claude-haiku-4.5-agentic
feature: none
branch: master
user: Fahadkhanreal
command: /sp.constitution
labels: ["constitution", "governance", "project-setup"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

# AI Resume + ATS Builder - Project Constitution

**Version:** 1.0  
**Date:** May 18, 2026  
**Project Type:** Modern SaaS Application  
**Development Methodology:** Spec-Driven Development (Spec Kit Plus)

## 1. Project Vision

Ek powerful, beautiful aur intelligent AI-powered Resume Builder SaaS jo job seekers ko ATS-friendly, professional aur high-conversion resumes banane mein madad kare. Yeh tool users ko sirf resume nahi, balki **interview chances badhane wala competitive advantage** dega.

## 2. Core Principles (Immutable)

- **User First**: Experience Canva jaisa smooth aur delightful hona chahiye.
- **ATS Compatibility**: Har resume default mein ATS-friendly hona chahiye (standard fonts, proper structure, no complex tables/graphics in critical sections).
- **AI as Assistant**: AI helpful, professional aur honest hona chahiye. Hallucination bilkul nahi allowed.
- **Privacy & Security**: User data (especially resumes) highly secure rahega. End-to-end encryption where possible.
- **Performance**: Live preview must be real-time (< 300ms update).
- **Mobile First + Responsive**: Desktop aur mobile dono pe zabardast experience.
- **Quality Over Speed**: Beautiful UI/UX aur clean code priority.
- **Scalability**: Freemium model ke hisaab se design kiya jayega.

## 3. Core Values

- Simplicity & Elegance
- Trust & Reliability
- Speed & Performance
- Professionalism
- Continuous Improvement (AI + Templates)

## 4. Target Audience

- Fresh graduates
- Experienced professionals
- Tech developers & engineers
- Career switchers
- Pakistani + International job seekers

## 5. Tech Stack (Locked)

**Frontend:**
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Zustand (state management)
- dnd-kit (Drag & Drop)
- React Hook Form + Zod

**AI Integration:**
- Google Gemini (2.5 Flash + Pro)
- Structured JSON output only

**Authentication:**
- Clerk (Email + Password + Google + Forgot Password)

**Database:**
- Neon (PostgreSQL) + Prisma ORM

**PDF Generation:**
- @react-pdf/renderer (preview) + Puppeteer / html2pdf (final export)

**Other:**
- Vercel (Deployment)
- Resend / Nodemailer (emails)
- Rate limiting & usage tracking

## 6. Key Features (MVP)

1. Authentication + Dashboard
2. Drag & Drop Resume Builder
3. Live Preview (Left form → Right preview)
4. AI Features (Summary, Experience, Skills, etc.)
5. ATS Score Checker + Suggestions
6. Multiple Professional Templates
7. Job Match Analyzer
8. High-Quality PDF Export
9. Save / Duplicate / Multiple Resumes

## 7. Non-Functional Requirements

- **Performance**: Page load < 1.5s, Live preview instant feel
- **Security**: Secure auth, data isolation, no sensitive data in logs
- **SEO**: Public landing page SEO friendly
- **Accessibility**: WCAG 2.1 AA compliant
- **Error Handling**: Graceful degradation (AI fail hone pe bhi resume editable rahe)
- **Rate Limiting**: AI calls pe proper limits

## 8. Success Metrics

- Users able to create first resume in < 8 minutes
- Average ATS Score > 85
- High PDF download to signup ratio
- Positive user feedback on AI quality

## 9. Future Phases (Post MVP)

- AI Interview Question Generator
- Cover Letter Generator
- Resume Version History
- Team/Enterprise plans
- Analytics dashboard
- Custom domain resumes

## 10. Constraints & Decisions

- No custom backend (FastAPI) in MVP → Next.js Route Handlers + Server Actions
- Gemini as primary AI (cost + performance)
- Clerk for auth (speed aur security)
- All AI responses must be strictly JSON structured

---

**This Constitution is the source of truth.**  
Koi bhi decision iske against nahi liya ja sakta. Agar koi change chahiye to pehle Constitution update karke approval lena hoga.

**Approved By:** Fahd  
**Date:** May 18, 2026

## Response snapshot

Constitution created and ratified for AI Resume + ATS Builder project. Comprehensive governance document established covering:

- 8 immutable core principles (User First, ATS Compatibility, AI Assistant, Privacy & Security, Performance, Mobile First, Quality Over Speed, Scalability)
- 5 core values (Simplicity, Trust, Speed, Professionalism, Continuous Improvement)
- Locked tech stack (Next.js 15, Gemini AI, Clerk, Neon PostgreSQL, Puppeteer)
- 9 MVP features with clear success metrics
- Amendment procedure and compliance review process
- Version 1.0.0 ratified on 2026-05-18

Constitution file written to `.specify/memory/constitution.md` as authoritative source of truth for all project decisions.

## Outcome

- ✅ Impact: Project governance established; all future decisions must align with 8 core principles
- 🧪 Tests: Constitution structure validated; no placeholder tokens remain
- 📁 Files: .specify/memory/constitution.md (created/updated)
- 🔁 Next prompts: /sp.specify (feature spec), /sp.plan (architecture), /sp.tasks (implementation tasks)
- 🧠 Reflection: Constitution provides clear, immutable guidance for SDD workflow; principles are testable and enforceable

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS - all placeholders resolved, version coherent, dates ISO format
- Prompt variant (if applicable): none
- Next experiment: Validate spec-template.md alignment with constitution principles
