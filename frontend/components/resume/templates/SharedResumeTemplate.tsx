import { ResumeTemplateProps } from "./types";

function asText(value: unknown) {
  if (typeof value === "string" || typeof value === "number") return String(value);
  return "";
}

function formatUrl(url?: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function cleanDisplayUrl(url?: string): string {
  if (!url) return "";
  return url.trim().replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "");
}

function Header({ resume, config }: ResumeTemplateProps) {
  const photoUrl = resume.personalInfo?.photoUrl;
  const isCentered = config.headerClass?.includes("text-center");
  const isLightText =
    config.headerClass?.includes("text-white") ||
    config.contactClass?.includes("text-white") ||
    config.contactClass?.includes("text-sky-100") ||
    config.contactClass?.includes("text-emerald-100");

  const linkColorClass = isLightText
    ? "text-sky-200 hover:text-white underline decoration-sky-300/60 hover:decoration-white"
    : "text-blue-600 hover:text-blue-800 hover:underline";

  const personalInfo = resume.personalInfo ?? (resume as any).data?.personalInfo ?? {};
  const website = personalInfo?.website?.trim();
  const linkedin = personalInfo?.linkedin?.trim();
  const github = personalInfo?.github?.trim();

  const allContactItems = [
    personalInfo?.email
      ? {
          type: "email",
          label: "Email",
          display: personalInfo.email,
          href: `mailto:${personalInfo.email}`,
        }
      : null,
    personalInfo?.phone
      ? {
          type: "phone",
          label: "Phone",
          display: personalInfo.phone,
          href: `tel:${personalInfo.phone}`,
        }
      : null,
    personalInfo?.location
      ? {
          type: "location",
          label: "Location",
          display: personalInfo.location,
        }
      : null,
    website
      ? {
          type: "website",
          label: "Portfolio",
          display: cleanDisplayUrl(website),
          href: formatUrl(website),
        }
      : null,
    linkedin
      ? {
          type: "linkedin",
          label: "LinkedIn",
          display: cleanDisplayUrl(linkedin).startsWith("linkedin.com")
            ? cleanDisplayUrl(linkedin)
            : `linkedin.com/in/${cleanDisplayUrl(linkedin)}`,
          href: formatUrl(
            linkedin.startsWith("http") || linkedin.startsWith("linkedin.com")
              ? linkedin
              : `https://linkedin.com/in/${linkedin}`
          ),
        }
      : null,
    github
      ? {
          type: "github",
          label: "GitHub",
          display: cleanDisplayUrl(github).startsWith("github.com")
            ? cleanDisplayUrl(github)
            : `github.com/${cleanDisplayUrl(github)}`,
          href: formatUrl(
            github.startsWith("http") || github.startsWith("github.com")
              ? github
              : `https://github.com/${github}`
          ),
        }
      : null,
  ].filter(Boolean);

  return (
    <div className={config.headerClass}>
      {photoUrl && <img src={photoUrl} alt="Profile" className={config.photoClass} />}
      <div className={isCentered ? "w-full" : "min-w-0 flex-1"}>
        <h1 className={config.nameClass}>{personalInfo?.fullName || "Your Name"}</h1>
        <p className={config.titleClass}>{personalInfo?.title || "Professional Title"}</p>

        {/* All contact info & links: Each on its own separate line */}
        {allContactItems.length > 0 && (
          <div
            className={`mt-2 flex flex-col gap-1 text-sm ${
              isCentered ? "items-center" : "items-start"
            } ${config.contactClass}`}
          >
            {allContactItems.map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-1.5">
                <span className={isLightText ? "font-semibold opacity-90" : "font-semibold text-slate-800"}>
                  {item!.label}:
                </span>
                {item?.href ? (
                  <a
                    href={item.href}
                    target={item.type === "email" || item.type === "phone" ? undefined : "_blank"}
                    rel={item.type === "email" || item.type === "phone" ? undefined : "noopener noreferrer"}
                    className={`hover:underline font-medium ${
                      item.type === "email" || item.type === "phone" ? "" : linkColorClass
                    }`}
                  >
                    {item.display}
                  </a>
                ) : (
                  <span>{item?.display}</span>
                )}
              </div>
            ))}
          </div>
        )}
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
        {resume.projects.map((project, idx) => {
          const proj = project as any;
          const projectLink = proj.link || proj.url;
          const technologies = Array.isArray(proj.technologies) ? proj.technologies : [];

          return (
            <div key={idx}>
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-semibold text-slate-900">{project.name}</h3>
                {projectLink && (
                  <a
                    href={projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    {projectLink}
                  </a>
                )}
              </div>
              {project.description && (
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{project.description}</p>
              )}
              {technologies.length > 0 && (
                <p className="mt-1 text-xs text-slate-600">
                  <span className="font-medium">Tech:</span> {technologies.join(", ")}
                </p>
              )}
            </div>
          );
        })}
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
