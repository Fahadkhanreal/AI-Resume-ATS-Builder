import { ResumeData } from "@/types/resume";

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

export function renderResumeHtml(data: ResumeData, title: string) {
  const personal = data.personalInfo;
  const skills = data.skills?.map(escapeHtml).join(", ") || "";

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #111827; line-height: 1.5; padding: 32px; }
    h1 { font-size: 28px; margin-bottom: 4px; }
    h2 { font-size: 16px; border-bottom: 1px solid #d1d5db; padding-bottom: 4px; margin-top: 24px; }
    .meta { color: #4b5563; font-size: 12px; }
    .item { margin-bottom: 12px; }
    .item ul { margin: 4px 0 0 0; padding-left: 18px; }
    .item li { margin-bottom: 2px; }
  </style>
</head>
<body>
  <h1>${escapeHtml(personal?.fullName || title)}</h1>
  <div class="meta">${escapeHtml([personal?.email, personal?.phone, personal?.location].filter(Boolean).join(" | "))}</div>
  ${personal?.summary ? `<h2>Summary</h2><p>${escapeHtml(personal.summary)}</p>` : ""}
  <h2>Experience</h2>
  ${(data.experience || []).map((exp) => {
    const e = exp as unknown as FlexEntry;
    const jobTitle = str(e.jobTitle) || str(e.position);
    const company = str(e.company);
    const startDate = str(e.startDate);
    const endDate = str(e.endDate) || (e.currentlyWorking === true ? "Present" : "");
    const dateRange =
      startDate && endDate ? `${startDate} - ${endDate}` : startDate || endDate;
    const bullets = strArr(e.bullets).length
      ? strArr(e.bullets)
      : strArr(e.achievements);

    return `<div class="item"><strong>${escapeHtml(jobTitle)}</strong>${
      company ? ` - ${escapeHtml(company)}` : ""
    }${dateRange ? `<br/><span class="meta">${escapeHtml(dateRange)}</span>` : ""}${
      str(e.description) ? `<br/>${escapeHtml(str(e.description))}` : ""
    }${
      bullets.length
        ? `<ul>${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`
        : ""
    }</div>`;
  }).join("")}
  <h2>Education</h2>
  ${(data.education || []).map((edu) => `<div class="item"><strong>${escapeHtml(edu.degree || "")}</strong> - ${escapeHtml(edu.school || "")}</div>`).join("")}
  ${skills ? `<h2>Skills</h2><p>${skills}</p>` : ""}
  ${
    data.projects && data.projects.length > 0
      ? `<h2>Projects</h2>
  ${data.projects
    .map((proj) => {
      const p = proj as unknown as FlexEntry;
      const name = str(p.name);
      const url = str(p.url) || str(p.link);
      const description = str(p.description);
      const technologies = strArr(p.technologies);

      return `<div class="item"><strong>${escapeHtml(name)}</strong>${
        url ? ` - <span class="meta">${escapeHtml(url)}</span>` : ""
      }${description ? `<br/>${escapeHtml(description)}` : ""}${
        technologies.length
          ? `<br/><span class="meta">Tech: ${escapeHtml(technologies.join(", "))}</span>`
          : ""
      }</div>`;
    })
    .join("")}`
      : ""
  }
  ${
    data.certifications && data.certifications.length > 0
      ? `<h2>Certifications</h2>
  ${data.certifications
    .map((cert) => {
      const c = cert as unknown as FlexEntry;
      const name = str(c.name);
      const issuer = str(c.issuer);
      return `<div class="item"><strong>${escapeHtml(name)}</strong>${
        issuer ? ` - ${escapeHtml(issuer)}` : ""
      }</div>`;
    })
    .join("")}`
      : ""
  }
</body>
</html>`;
}
