# Feature Specification: AI Resume + ATS Builder Frontend

**Feature Branch**: `1-resume-builder`  
**Created**: 2026-05-18  
**Status**: Draft  
**Input**: Modern, fast, beautiful frontend with split-screen editor and live preview

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create and Edit Resume (Priority: P1)

A job seeker opens the resume builder and creates a new resume with personal information, work experience, education, and skills. They see their changes reflected in real-time on the right preview panel.

**Why this priority**: Core MVP feature; enables users to build resumes from scratch. Without this, the product has no value.

**Independent Test**: User can create a complete resume with all sections and see live preview updates. Delivers immediate value.

**Acceptance Scenarios**:

1. **Given** user is authenticated on dashboard, **When** they click "Create New Resume", **Then** they are taken to the builder with empty form and blank preview
2. **Given** user is in the builder, **When** they fill in personal info (name, title, email, phone), **Then** preview updates instantly (< 200ms)
3. **Given** user is in the builder, **When** they add an experience entry with company, role, dates, and bullet points, **Then** it appears in preview immediately
4. **Given** user is in the builder, **When** they drag a section to reorder, **Then** preview reflects new order instantly

---

### User Story 2 - Drag & Drop Section Reordering (Priority: P1)

User can drag resume sections (Experience, Education, Skills) to reorder them. The preview updates in real-time to show the new layout.

**Why this priority**: Core UX feature; users expect drag-and-drop in modern builders. Essential for MVP.

**Independent Test**: User can reorder sections via drag-and-drop and see preview update. Fully testable independently.

**Acceptance Scenarios**:

1. **Given** user has multiple sections in the builder, **When** they drag "Education" above "Experience", **Then** preview shows new order immediately
2. **Given** user is dragging a section, **When** they hover over drop zones, **Then** visual feedback (highlight) appears
3. **Given** user completes a drag operation, **When** they release the mouse, **Then** section moves and preview updates

---

### User Story 3 - AI-Powered Content Improvement (Priority: P1)

User clicks an "Improve with AI" button on any section (Summary, Experience, Skills). AI generates professional suggestions that user can accept or reject.

**Why this priority**: Differentiator feature; AI assistance is core value proposition. Drives user engagement and resume quality.

**Independent Test**: User can trigger AI improvement on a section and see suggestions. Fully independent feature.

**Acceptance Scenarios**:

1. **Given** user has entered a job summary, **When** they click "Improve with AI", **Then** loading state appears and AI suggestions load within 3 seconds
2. **Given** AI suggestions are displayed, **When** user clicks "Accept", **Then** text is replaced and preview updates
3. **Given** AI suggestions are displayed, **When** user clicks "Reject", **Then** suggestions disappear and original text remains

---

### User Story 4 - ATS Score Checker (Priority: P2)

User can view their resume's ATS compatibility score (0-100) with specific suggestions for improvement (e.g., "Add more action verbs", "Use standard fonts").

**Why this priority**: High value-add; helps users optimize for ATS systems. Important but not blocking MVP.

**Independent Test**: User can view ATS score and suggestions. Fully independent feature.

**Acceptance Scenarios**:

1. **Given** user has filled in resume content, **When** they view the ATS Score card, **Then** score is displayed with color coding (red < 60, yellow 60-80, green > 80)
2. **Given** ATS score is displayed, **When** user clicks on a suggestion, **Then** relevant section is highlighted in the editor
3. **Given** user makes changes to improve ATS score, **When** they trigger a rescan, **Then** score updates within 2 seconds

---

### User Story 5 - Template Switching (Priority: P2)

User can switch between professional resume templates (Modern, Classic, Minimal) and see live preview of their content in the new template.

**Why this priority**: Enhances user experience; allows customization. Important for MVP but not blocking.

**Independent Test**: User can switch templates and see preview update. Fully independent.

**Acceptance Scenarios**:

1. **Given** user is viewing a resume, **When** they open the template switcher, **Then** 3+ templates are displayed with thumbnails
2. **Given** templates are displayed, **When** user clicks a template, **Then** preview updates to show content in new template (< 300ms)
3. **Given** user switches templates, **When** they return to editor, **Then** all content is preserved

---

### User Story 6 - Job Match Analyzer (Priority: P3)

User can paste a job description and see how well their resume matches it. System highlights matching keywords and suggests missing skills.

**Why this priority**: Nice-to-have feature; adds value but not essential for MVP. Can be added post-launch.

**Independent Test**: User can paste JD and see match analysis. Fully independent.

**Acceptance Scenarios**:

1. **Given** user opens Job Match Analyzer, **When** they paste a job description, **Then** system analyzes and displays match percentage
2. **Given** analysis is complete, **When** user views results, **Then** matching keywords are highlighted and missing skills are listed

---

### Edge Cases

- What happens when user has very long bullet points (> 500 characters)? Preview should wrap gracefully.
- How does system handle special characters in names or company names? Should render correctly without breaking layout.
- What if user's internet connection drops while editing? Auto-save should have failed gracefully; data should be recoverable.
- What if AI service is unavailable? "Improve with AI" button should show error message; user can still edit manually.
- What if user has 20+ bullet points in one section? Preview should remain readable; consider pagination or collapsing.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a split-screen layout with editor on left (40-45%) and live preview on right (55-60%) on desktop
- **FR-002**: System MUST update preview in real-time (< 200ms) when user makes changes to any field
- **FR-003**: System MUST support drag-and-drop reordering of resume sections using dnd-kit
- **FR-004**: System MUST provide "Improve with AI" buttons on Summary, Experience, and Skills sections
- **FR-005**: System MUST auto-save resume data every 3 seconds to prevent data loss
- **FR-006**: System MUST display ATS compatibility score (0-100) with specific improvement suggestions
- **FR-007**: System MUST support switching between at least 3 professional resume templates
- **FR-008**: System MUST render resume preview in multiple formats (web view, PDF preview)
- **FR-009**: System MUST validate all form inputs (email format, phone format, date ranges)
- **FR-010**: System MUST persist resume data to database and allow users to save multiple resumes
- **FR-011**: System MUST support responsive design: desktop (split view), tablet (stacked), mobile (bottom sheet preview)
- **FR-012**: System MUST display loading states and error messages for all async operations (AI calls, saves, API requests)

### Key Entities

- **Resume**: Contains user's resume data (personal info, experience, education, skills, summary)
  - Attributes: id, userId, title, template, sections, createdAt, updatedAt, atsScore
- **Section**: Individual resume section (Experience, Education, Skills, Summary)
  - Attributes: type, title, content, order, isVisible
- **ExperienceEntry**: Single job entry within Experience section
  - Attributes: company, role, startDate, endDate, description, bulletPoints
- **EducationEntry**: Single education entry within Education section
  - Attributes: school, degree, field, graduationDate, description
- **SkillEntry**: Single skill within Skills section
  - Attributes: name, proficiency (optional)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create a complete resume (all sections filled) in under 8 minutes
- **SC-002**: Live preview updates appear within 200ms of user input (95th percentile)
- **SC-003**: Page load time for resume builder is under 1.2 seconds (first contentful paint)
- **SC-004**: Average ATS score for generated resumes is above 85 (out of 100)
- **SC-005**: 90% of users successfully complete their first resume without errors
- **SC-006**: AI improvement feature is used by 70%+ of users per session
- **SC-007**: Template switching completes in under 300ms without data loss
- **SC-008**: Auto-save succeeds 99.9% of the time (no data loss incidents)
- **SC-009**: Mobile responsiveness: builder is fully usable on screens 375px+ wide
- **SC-010**: Accessibility: WCAG 2.1 AA compliance (keyboard navigation, screen reader support)

## Assumptions

- Users have modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- Users have stable internet connection for real-time sync
- AI service (Gemini) is available and responsive (< 3 second response time)
- Database (Neon PostgreSQL) is available and performant
- Users are authenticated via Clerk before accessing builder
- Resume data is stored in JSON format in database
- PDF export is handled by separate service (Puppeteer/html2pdf)

## Out of Scope (Post-MVP)

- Cover letter generation
- Interview question generator
- Resume version history / branching
- Team collaboration features
- Custom domain resumes
- Advanced analytics dashboard
