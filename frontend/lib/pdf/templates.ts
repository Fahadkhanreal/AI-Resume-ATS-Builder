import { ResumeData } from "@/types/resume";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
  </style>
</head>
<body>
  <h1>${escapeHtml(personal?.fullName || title)}</h1>
  <div class="meta">${escapeHtml([personal?.email, personal?.phone, personal?.location].filter(Boolean).join(" | "))}</div>
  ${personal?.summary ? `<h2>Summary</h2><p>${escapeHtml(personal.summary)}</p>` : ""}
  <h2>Experience</h2>
  ${(data.experience || []).map((exp) => `<div class="item"><strong>${escapeHtml(exp.position || "")}</strong> - ${escapeHtml(exp.company || "")}<br/>${escapeHtml(exp.description || "")}</div>`).join("")}
  <h2>Education</h2>
  ${(data.education || []).map((edu) => `<div class="item"><strong>${escapeHtml(edu.degree || "")}</strong> - ${escapeHtml(edu.school || "")}</div>`).join("")}
  ${skills ? `<h2>Skills</h2><p>${skills}</p>` : ""}
</body>
</html>`;
}
