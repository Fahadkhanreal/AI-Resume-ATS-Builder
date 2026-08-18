import { ResumeData } from "@/types/resume";
import { getPdfTemplateStyle } from "./template-styles";

type FlexEntry = {
  [key: string]: string | string[] | boolean | undefined;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function strArr(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function renderExperienceItems(data: ResumeData): string {
  return (data.experience || [])
    .map((exp) => {
      const e = exp as unknown as FlexEntry;
      const jobTitle = str(e.jobTitle) || str(e.position);
      const company = str(e.company);
      const startDate = str(e.startDate);
      const endDate = str(e.endDate) || (e.currentlyWorking === true ? "Present" : "");
      const dateRange =
        startDate && endDate ? `${startDate} - ${endDate}` : startDate || endDate;
      const bullets = strArr(e.bullets).length ? strArr(e.bullets) : strArr(e.achievements);

      return `<div class="item"><strong>${escapeHtml(jobTitle)}</strong>${
        company ? ` - ${escapeHtml(company)}` : ""
      }${dateRange ? `<br/><span class="meta">${escapeHtml(dateRange)}</span>` : ""}${
        str(e.description) ? `<br/>${escapeHtml(str(e.description))}` : ""
      }${
        bullets.length
          ? `<ul>${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`
          : ""
      }</div>`;
    })
    .join("");
}

function renderEducationItems(data: ResumeData): string {
  return (data.education || [])
    .map((edu) => {
      const e = edu as unknown as FlexEntry;
      const degree = str(e.degree);
      const school = str(e.school);
      const year = str(e.graduationYear) || str(e.graduationDate);
      return `<div class="item"><strong>${escapeHtml(degree)}</strong>${
        school ? ` - ${escapeHtml(school)}` : ""
      }${year ? `<span class="meta right">${escapeHtml(year)}</span>` : ""}</div>`;
    })
    .join("");
}

function renderProjectsItems(data: ResumeData): string {
  return (data.projects || [])
    .map((proj) => {
      const p = proj as unknown as FlexEntry;
      const name = str(p.name);
      const url = str(p.url) || str(p.link);
      const description = str(p.description);
      const technologies = strArr(p.technologies);

      return `<div class="item"><strong>${escapeHtml(name)}</strong>${
        url ? `<br/><span class="meta">${escapeHtml(url)}</span>` : ""
      }${description ? `<br/>${escapeHtml(description)}` : ""}${
        technologies.length
          ? `<br/><span class="meta">Tech: ${escapeHtml(technologies.join(", "))}</span>`
          : ""
      }</div>`;
    })
    .join("");
}

function renderCertItems(data: ResumeData): string {
  return (data.certifications || [])
    .map((cert) => {
      const c = cert as unknown as FlexEntry;
      const name = str(c.name);
      const issuer = str(c.issuer);
      return `<div class="item"><strong>${escapeHtml(name)}</strong>${
        issuer ? ` - ${escapeHtml(issuer)}` : ""
      }</div>`;
    })
    .join("");
}

export function renderResumeHtml(data: ResumeData, title: string, templateId?: string) {
  const personal = data.personalInfo;
  const skills = data.skills?.map(escapeHtml).join(", ") || "";
  const style = getPdfTemplateStyle(templateId);

  const isDarkHeader = Boolean(style.headerBg);
  const headerText = isDarkHeader ? style.headerText || "#ffffff" : style.accent;
  const headerBorder = !isDarkHeader ? style.accent : style.headerBg || style.accent;
  const fontStack =
    style.fontFamily === "Times-Roman"
      ? "Georgia, 'Times New Roman', serif"
      : style.fontFamily === "Courier"
        ? "Consolas, Menlo, monospace"
        : "Arial, Helvetica, sans-serif";

  const experienceHtml = renderExperienceItems(data);
  const educationHtml = renderEducationItems(data);
  const projectsHtml = renderProjectsItems(data);
  const certHtml = renderCertItems(data);

  const bodyContent = style.layout === "sidebar"
    ? `
    <div class="layout-row">
      <aside class="col-sidebar">
        <div class="card">
          ${skills ? `<h2>Skills</h2><p>${skills}</p>` : ""}
          ${educationHtml ? `<h2>Education</h2>${educationHtml}` : ""}
          ${certHtml ? `<h2>Certifications</h2>${certHtml}` : ""}
        </div>
      </aside>
      <main class="col-main">
        ${personal?.summary ? `<h2>Summary</h2><p>${escapeHtml(personal.summary)}</p>` : ""}
        ${experienceHtml ? `<h2>Experience</h2>${experienceHtml}` : ""}
        ${projectsHtml ? `<h2>Projects</h2>${projectsHtml}` : ""}
      </main>
    </div>`
    : `
    ${personal?.summary ? `<h2>Summary</h2><p>${escapeHtml(personal.summary)}</p>` : ""}
    ${experienceHtml ? `<h2>Experience</h2>${experienceHtml}` : ""}
    ${educationHtml ? `<h2>Education</h2>${educationHtml}` : ""}
    ${projectsHtml ? `<h2>Projects</h2>${projectsHtml}` : ""}
    ${certHtml ? `<h2>Certifications</h2>${certHtml}` : ""}
    ${skills ? `<h2>Skills</h2><p>${skills}</p>` : ""}`;

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: ${fontStack}; color: #111827; line-height: 1.5; padding: 32px; }
    h1 { font-size: 28px; margin-bottom: 4px; color: ${isDarkHeader ? headerText : style.accent}; }
    h2 { font-size: 16px; border-bottom: 2px solid ${style.accent}; color: ${style.headingColor}; padding-bottom: 4px; margin-top: 24px; }
    .meta { color: #4b5563; font-size: 12px; }
    .meta.right { float: right; }
    .item { margin-bottom: 12px; }
    .item ul { margin: 4px 0 0 0; padding-left: 18px; }
    .item li { margin-bottom: 2px; }
    .layout-row { display: flex; gap: 24px; }
    .col-sidebar { width: 34%; }
    .col-main { width: 66%; }
    .card { background: ${style.softBg}; border-radius: 6px; padding: 10px; }
    .card h2 { margin-top: 10px; }
    .header-box { border-bottom: 3px solid ${headerBorder}; padding-bottom: 10px; margin-bottom: 6px; }
    ${isDarkHeader
      ? `.header-box { background: ${style.headerBg}; border-radius: 8px; padding: 14px 16px; color: ${style.headerText || "#fff"}; }
    .header-box h1 { color: ${style.headerText || "#fff"}; margin: 0 0 2px; }
    .header-box .meta { color: ${style.headerText || "#fff"}; opacity: 0.9; }`
      : ""}
    .contact-line { margin-bottom: 2px; }
  </style>
</head>
<body>
  <div class="header-box">
    <h1>${escapeHtml(personal?.fullName || title)}</h1>
    ${personal?.title ? `<p class="meta">${escapeHtml(personal.title)}</p>` : ""}
    <div class="meta contact-line">${escapeHtml([personal?.email, personal?.phone, personal?.location].filter(Boolean).join(" | "))}</div>
  </div>
  ${bodyContent}
</body>
</html>`;
}

