---
name: frontend_spec
description: Frontend specification for AI Resume + ATS Builder - split-screen editor, live preview, 6 user stories, 12 requirements
metadata:
  type: project
---

# Frontend Specification: AI Resume + ATS Builder

**Branch**: 1-resume-builder | **Created**: 2026-05-18 | **Status**: Draft

## Vision

Modern, fast, beautiful frontend with Canva + Notion-like experience. Split-screen layout: left editor (40-45%), right live preview (55-60%). Real-time sync, drag-and-drop sections, AI-powered improvements.

## 6 User Stories (Prioritized)

**P1 (Core MVP):**
1. Create and Edit Resume — Build complete resume with all sections, live preview updates
2. Drag & Drop Section Reordering — Reorder sections (Experience, Education, Skills) with instant preview
3. AI-Powered Content Improvement — Click "Improve with AI" on any section for professional suggestions

**P2 (High Value):**
4. ATS Score Checker — View 0-100 ATS compatibility score with specific improvement suggestions
5. Template Switching — Switch between 3+ professional templates with live preview

**P3 (Nice-to-Have):**
6. Job Match Analyzer — Paste job description, see match percentage and missing skills

## 12 Functional Requirements

- FR-001: Split-screen layout (desktop), stacked (tablet), bottom sheet (mobile)
- FR-002: Real-time preview updates (< 200ms)
- FR-003: Drag-and-drop section reordering via dnd-kit
- FR-004: "Improve with AI" buttons on Summary, Experience, Skills
- FR-005: Auto-save every 3 seconds
- FR-006: ATS score display (0-100) with suggestions
- FR-007: Support 3+ professional templates
- FR-008: Multi-format preview (web, PDF)
- FR-009: Form input validation (email, phone, dates)
- FR-010: Multi-resume support with persistence
- FR-011: Responsive design (desktop/tablet/mobile)
- FR-012: Loading states, error messages, toast notifications

## 5 Key Entities

- **Resume**: id, userId, title, template, sections, createdAt, updatedAt, atsScore
- **Section**: type, title, content, order, isVisible
- **ExperienceEntry**: company, role, startDate, endDate, description, bulletPoints
- **EducationEntry**: school, degree, field, graduationDate, description
- **SkillEntry**: name, proficiency

## 10 Success Criteria (Measurable)

- SC-001: Users create complete resume in < 8 minutes
- SC-002: Preview updates within 200ms (95th percentile)
- SC-003: Page load < 1.2s (first contentful paint)
- SC-004: Average ATS score > 85
- SC-005: 90% users complete first resume without errors
- SC-006: 70%+ users use AI improvement per session
- SC-007: Template switching < 300ms
- SC-008: Auto-save succeeds 99.9%
- SC-009: Mobile usable on 375px+ screens
- SC-010: WCAG 2.1 AA compliance

## Edge Cases Identified

- Long bullet points (> 500 chars) wrap gracefully
- Special characters in names/companies render correctly
- Internet disconnection: graceful auto-save failure, data recovery
- AI service unavailable: error message, manual editing still works
- 20+ bullet points: readable preview with pagination/collapsing

## Assumptions

- Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- Stable internet connection for real-time sync
- Gemini AI service responsive (< 3s)
- Neon PostgreSQL available and performant
- Users authenticated via Clerk
- Resume data in JSON format
- PDF export via separate service (Puppeteer/html2pdf)

## Out of Scope (Post-MVP)

- Cover letter generation
- Interview question generator
- Resume version history
- Team collaboration
- Custom domain resumes
- Analytics dashboard
