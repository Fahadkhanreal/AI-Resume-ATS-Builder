import { ResumeTemplateProps } from "./types";

function asText(value: unknown) {
  if (typeof value === "string" || typeof value === "number") return String(value);
  return "";
}

function Header({ resume, config }: ResumeTemplateProps) {
  const photoUrl = resume.personalInfo?.photoUrl;

  return (
    <div className={config.headerClass}>
      {photoUrl && <img src={photoUrl} alt="Profile" className={config.photoClass} />}
      <div className={config.headerClass.includes("text-center") ? "w-full" : "min-w-0"}>
        <h1 className={config.nameClass}>{resume.personalInfo?.fullName || "Your Name"}</h1>
        <p className={config.titleClass}>{resume.personalInfo?.title || "Professional Title"}</p>
        <div className={`mt-2 flex flex-wrap gap-4 text-sm ${config.contactClass}`}>
          {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo?.location && <span>{resume.personalInfo.location}</span>}
          {resume.personalInfo?.website && <span>{resume.personalInfo.website}</span>}
          {resume.personalInfo?.linkedin && <span>{resume.personalInfo.linkedin}</span>}
          {resume.personalInfo?.github && <span>{resume.personalInfo.github}</span>}
        </div>
      </div>
    </div>
  );
}

function SummarySection({ resume, config }: ResumeTemplateProps) {
  if (!resume.summary) return null;
  return (
    <section>
      <h2 className={`mb-2 text-lg font-bold ${config.headingClass}`}>Professional Summary</h2>
      <p className="text-sm leading-relaxed text-slate-700">{resume.summary}</p>
    </section>
  );
}

function ExperienceSection({ resume, config }: ResumeTemplateProps) {
  const experience = Array.isArray(resume.experience) ? resume.experience : [];
  if (!experience.length) return null;
  return (
    <section>
      <h2 className={`mb-3 text-lg font-bold ${config.headingClass}`}>Experience</h2>
      <div className="space-y-4">
        {experience.map((exp, idx) => {
          const bullets = Array.isArray(exp.bullets) ? exp.bullets : [];

          return (
            <div key={idx}>
              <div className="flex justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{asText(exp.jobTitle || (exp as any).position)}</h3>
                  <p className="text-sm text-slate-600">{asText(exp.company)}</p>
                </div>
                <span className="text-right text-sm text-slate-600">
                  {asText(exp.startDate)} - {asText(exp.endDate) || "Present"}
                </span>
              </div>
              {exp.description && <p className="mt-1 text-sm text-slate-700">{asText(exp.description)}</p>}
              {bullets.length ? (
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700">
                  {bullets.map((bullet, bidx) => <li key={bidx}>{asText(bullet)}</li>)}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function EducationSection({ resume, config }: ResumeTemplateProps) {
  const education = Array.isArray(resume.education) ? resume.education : [];
  if (!education.length) return null;
  return (
    <section>
      <h2 className={`mb-3 text-lg font-bold ${config.headingClass}`}>Education</h2>
      <div className="space-y-3">
        {education.map((edu, idx) => (
          <div key={idx} className="flex justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-900">{asText(edu.degree)}</h3>
              <p className="text-sm text-slate-600">{asText(edu.school)}</p>
              {edu.field && <p className="text-sm text-slate-700">Field: {asText(edu.field)}</p>}
            </div>
            <span className="text-sm text-slate-600">{asText((edu as any).graduationYear || edu.graduationDate)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillsSection({ resume, config }: ResumeTemplateProps) {
  const skills = Array.isArray(resume.skills)
    ? resume.skills
        .map((skill: any) => (typeof skill === "string" ? skill : skill?.name || skill?.label || ""))
        .filter(Boolean)
    : [];
  if (!skills.length) return null;
  return (
    <section>
      <h2 className={`mb-2 text-lg font-bold ${config.headingClass}`}>Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span key={idx} className={`${config.skillClass} rounded px-3 py-1 text-sm`}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection({ resume, config }: ResumeTemplateProps) {
  if (!resume.projects?.length) return null;
  return (
    <section>
      <h2 className={`mb-3 text-lg font-bold ${config.headingClass}`}>Projects</h2>
      <div className="space-y-3">
        {resume.projects.map((project, idx) => (
          <div key={idx}>
            <h3 className="font-semibold text-slate-900">{project.name}</h3>
            {project.description && <p className="text-sm text-slate-700">{project.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function CertificationsSection({ resume, config }: ResumeTemplateProps) {
  if (!resume.certifications?.length) return null;
  return (
    <section>
      <h2 className={`mb-2 text-lg font-bold ${config.headingClass}`}>Certifications</h2>
      <ul className="space-y-1">
        {resume.certifications.map((cert, idx) => (
          <li key={idx} className="text-sm text-slate-700">{cert.name}</li>
        ))}
      </ul>
    </section>
  );
}

function MainSections({ resume, config }: ResumeTemplateProps) {
  return (
    <>
      <SummarySection resume={resume} config={config} />
      <ExperienceSection resume={resume} config={config} />
      <EducationSection resume={resume} config={config} />
      <ProjectsSection resume={resume} config={config} />
      <CertificationsSection resume={resume} config={config} />
    </>
  );
}

function SidebarTemplate({ resume, config }: ResumeTemplateProps) {
  return (
    <div className={config.wrapperClass}>
      <Header resume={resume} config={config} />
      <div className="grid gap-6 md:grid-cols-[0.35fr_0.65fr]">
        <aside className="space-y-5 rounded-xl bg-slate-50 p-4">
          <SkillsSection resume={resume} config={config} />
          <EducationSection resume={resume} config={config} />
          <CertificationsSection resume={resume} config={config} />
        </aside>
        <main className="space-y-6">
          <SummarySection resume={resume} config={config} />
          <ExperienceSection resume={resume} config={config} />
          <ProjectsSection resume={resume} config={config} />
        </main>
      </div>
    </div>
  );
}

function CompactTemplate({ resume, config }: ResumeTemplateProps) {
  return (
    <div className={config.wrapperClass}>
      <Header resume={resume} config={config} />
      <div className="grid gap-4 md:grid-cols-2">
        <SummarySection resume={resume} config={config} />
        <SkillsSection resume={resume} config={config} />
      </div>
      <ExperienceSection resume={resume} config={config} />
      <div className="grid gap-4 md:grid-cols-2">
        <EducationSection resume={resume} config={config} />
        <CertificationsSection resume={resume} config={config} />
      </div>
      <ProjectsSection resume={resume} config={config} />
    </div>
  );
}

export function SharedResumeTemplate({ resume, config }: ResumeTemplateProps) {
  if (config.layout === "sidebar") return <SidebarTemplate resume={resume} config={config} />;
  if (config.layout === "compact") return <CompactTemplate resume={resume} config={config} />;

  return (
    <div className={config.wrapperClass}>
      <Header resume={resume} config={config} />
      <MainSections resume={resume} config={config} />
      <SkillsSection resume={resume} config={config} />
    </div>
  );
}
