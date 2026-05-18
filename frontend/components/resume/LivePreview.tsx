"use client";

import { useResumeStore } from "@/lib/store/resume.store";
import { Resume } from "@/types";

export default function LivePreview() {
  const resume = useResumeStore((state) => state.currentResume);

  if (!resume) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No resume data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-4">
        <h1 className="text-3xl font-bold">{resume.personalInfo?.fullName || "Your Name"}</h1>
        <p className="text-slate-600">{resume.personalInfo?.title || "Professional Title"}</p>

        {/* Contact Info */}
        <div className="flex gap-4 text-sm mt-2 text-slate-700">
          {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo?.location && <span>{resume.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div>
          <h2 className="text-lg font-bold mb-2">Professional Summary</h2>
          <p className="text-slate-700 text-sm leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">Experience</h2>
          <div className="space-y-4">
            {resume.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">{exp.jobTitle}</h3>
                    <p className="text-slate-600 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-slate-600 text-sm">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-slate-700 text-sm mt-1">{exp.description}</p>
                )}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-inside text-slate-700 text-sm mt-2 space-y-1">
                    {exp.bullets.map((bullet, bidx) => (
                      <li key={bidx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">Education</h2>
          <div className="space-y-3">
            {resume.education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                    <p className="text-slate-600 text-sm">{edu.school}</p>
                  </div>
                  <span className="text-slate-600 text-sm">{edu.graduationYear}</span>
                </div>
                {edu.field && (
                  <p className="text-slate-700 text-sm">Field: {edu.field}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-slate-200 text-slate-900 px-3 py-1 rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">Projects</h2>
          <div className="space-y-3">
            {resume.projects.map((proj, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-slate-900">{proj.name}</h3>
                {proj.description && (
                  <p className="text-slate-700 text-sm">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-2">Certifications</h2>
          <ul className="space-y-1">
            {resume.certifications.map((cert, idx) => (
              <li key={idx} className="text-slate-700 text-sm">
                {cert.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
