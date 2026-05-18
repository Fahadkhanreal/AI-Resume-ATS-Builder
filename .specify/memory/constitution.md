# AI Resume + ATS Builder Constitution

<!-- Sync Impact Report: Version 1.0.0 (initial) | Ratified: 2026-05-18 | Last Amended: 2026-05-18 -->
<!-- New sections: Project Vision, Core Values, Target Audience, Tech Stack, Key Features, NFRs, Success Metrics, Future Phases, Constraints -->
<!-- Templates requiring review: spec-template.md, plan-template.md, tasks-template.md -->

## Project Vision

Ek powerful, beautiful aur intelligent AI-powered Resume Builder SaaS jo job seekers ko ATS-friendly, professional aur high-conversion resumes banane mein madad kare. Yeh tool users ko sirf resume nahi, balki **interview chances badhane wala competitive advantage** dega.

## Core Principles (Immutable)

### I. User First
Experience Canva jaisa smooth aur delightful hona chahiye. Every interaction must feel intuitive, responsive, and rewarding. User feedback drives all design decisions.

### II. ATS Compatibility
Har resume default mein ATS-friendly hona chahiye. Standard fonts, proper structure, no complex tables/graphics in critical sections. ATS parsing must never fail due to formatting.

### III. AI as Assistant (No Hallucination)
AI helpful, professional aur honest hona chahiye. Hallucination bilkul nahi allowed. All AI responses must be factually grounded, structured JSON only, with confidence indicators where applicable.

### IV. Privacy & Security
User data (especially resumes) highly secure rahega. End-to-end encryption where possible. No sensitive data in logs. Compliance with data protection standards mandatory.

### V. Performance
Live preview must be real-time (< 300ms update). Page load < 1.5s. Instant feel across all interactions. Performance is non-negotiable.

### VI. Mobile First + Responsive
Desktop aur mobile dono pe zabardast experience. Responsive design from ground up. Touch-friendly interactions on all devices.

### VII. Quality Over Speed
Beautiful UI/UX aur clean code priority. Technical debt must be addressed immediately. Code reviews enforce quality gates.

### VIII. Scalability
Freemium model ke hisaab se design kiya jayega. Architecture must support growth without major rewrites. Database queries optimized for scale.

## Core Values

- **Simplicity & Elegance**: Minimal, focused feature set; no bloat
- **Trust & Reliability**: Consistent, predictable behavior; zero data loss
- **Speed & Performance**: Fast interactions; instant feedback
- **Professionalism**: Enterprise-grade quality; polished UX
- **Continuous Improvement**: AI + Templates evolve based on user feedback

## Target Audience

- Fresh graduates
- Experienced professionals
- Tech developers & engineers
- Career switchers
- Pakistani + International job seekers

## Tech Stack (Locked)

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

## Key Features (MVP)

1. Authentication + Dashboard
2. Drag & Drop Resume Builder
3. Live Preview (Left form → Right preview)
4. AI Features (Summary, Experience, Skills, etc.)
5. ATS Score Checker + Suggestions
6. Multiple Professional Templates
7. Job Match Analyzer
8. High-Quality PDF Export
9. Save / Duplicate / Multiple Resumes

## Non-Functional Requirements

- **Performance**: Page load < 1.5s, Live preview instant feel
- **Security**: Secure auth, data isolation, no sensitive data in logs
- **SEO**: Public landing page SEO friendly
- **Accessibility**: WCAG 2.1 AA compliant
- **Error Handling**: Graceful degradation (AI fail hone pe bhi resume editable rahe)
- **Rate Limiting**: AI calls pe proper limits

## Success Metrics

- Users able to create first resume in < 8 minutes
- Average ATS Score > 85
- High PDF download to signup ratio
- Positive user feedback on AI quality

## Future Phases (Post MVP)

- AI Interview Question Generator
- Cover Letter Generator
- Resume Version History
- Team/Enterprise plans
- Analytics dashboard
- Custom domain resumes

## Constraints & Decisions

- No custom backend (FastAPI) in MVP → Next.js Route Handlers + Server Actions
- Gemini as primary AI (cost + performance)
- Clerk for auth (speed aur security)
- All AI responses must be strictly JSON structured

## Governance

This Constitution is the source of truth. Koi bhi decision iske against nahi liya ja sakta. Agar koi change chahiye to pehle Constitution update karke approval lena hoga.

**Amendment Procedure:**
- All changes require explicit user approval
- Version bumps follow semantic versioning (MAJOR.MINOR.PATCH)
- MAJOR: Backward incompatible principle removals/redefinitions
- MINOR: New principles or materially expanded guidance
- PATCH: Clarifications, wording, typo fixes

**Compliance Review:**
- All PRs must verify alignment with core principles
- Architecture decisions must reference applicable principles
- Design reviews check ATS compatibility and performance targets

**Version**: 1.0.0 | **Ratified**: 2026-05-18 | **Last Amended**: 2026-05-18
