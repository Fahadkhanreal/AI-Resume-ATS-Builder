"use client";

import { Resume } from "@/types";

export const AVAILABLE_TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional and formal",
  },
  {
    id: "tech",
    name: "Tech",
    description: "Developer-focused design",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and artistic",
  },
];

interface TemplateProps {
  resume: Resume;
}

export function ModernTemplate({ resume }: TemplateProps) {
  return (
    <div className="bg-white p-8 text-gray-900 font-sans">
      {/* Header */}
      <div className="mb-6 border-b-2 border-blue-600 pb-4">
        <h1 className="text-4xl font-bold text-gray-900">
          {resume.personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-lg text-blue-600 font-semibold">
          {resume.personalInfo?.title || "Professional Title"}
        </p>
        <div className="flex gap-4 text-sm text-gray-600 mt-2">
          {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo?.location && <span>{resume.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Professional Summary</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Experience</h2>
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900">{exp.jobTitle}</p>
                  <p className="text-blue-600 text-sm">{exp.company}</p>
                </div>
                <p className="text-gray-600 text-sm">
                  {exp.startDate} - {exp.endDate || "Present"}
                </p>
              </div>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="mt-2 ml-4 text-sm text-gray-700">
                  {exp.bullets.map((bullet, bidx) => (
                    <li key={bidx} className="list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Education</h2>
          {resume.education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-bold text-gray-900">{edu.degree}</p>
              <p className="text-blue-600 text-sm">{edu.school}</p>
              <p className="text-gray-600 text-sm">{edu.graduationYear}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function MinimalTemplate({ resume }: TemplateProps) {
  return (
    <div className="bg-white p-8 text-gray-800 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-900 tracking-wide">
          {resume.personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {resume.personalInfo?.title || "Professional Title"}
        </p>
        <div className="flex gap-3 text-xs text-gray-600 mt-3">
          {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo?.phone && <span>•</span>}
          {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo?.location && <span>•</span>}
          {resume.personalInfo?.location && <span>{resume.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-6 text-sm text-gray-700 leading-relaxed">
          {resume.summary}
        </div>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-3">
            Experience
          </h2>
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="mb-4 text-sm">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-900">{exp.jobTitle}</p>
                <p className="text-gray-600">{exp.startDate}</p>
              </div>
              <p className="text-gray-600">{exp.company}</p>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="mt-2 ml-4 text-gray-700">
                  {exp.bullets.map((bullet, bidx) => (
                    <li key={bidx} className="list-disc text-xs">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-3">
            Education
          </h2>
          {resume.education.map((edu, idx) => (
            <div key={idx} className="mb-2 text-sm">
              <p className="font-semibold text-gray-900">{edu.degree}</p>
              <p className="text-gray-600">{edu.school}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-2">
            Skills
          </h2>
          <p className="text-sm text-gray-700">{resume.skills.join(" • ")}</p>
        </div>
      )}
    </div>
  );
}

export function CorporateTemplate({ resume }: TemplateProps) {
  return (
    <div className="bg-white p-10 text-gray-800 font-serif">
      {/* Header */}
      <div className="mb-8 border-b-4 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {resume.personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-gray-700 font-semibold mt-1">
          {resume.personalInfo?.title || "Professional Title"}
        </p>
        <div className="flex gap-4 text-xs text-gray-700 mt-3">
          {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo?.location && <span>{resume.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase mb-2">Professional Summary</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase mb-3">Professional Experience</h3>
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between">
                <p className="font-bold text-gray-900">{exp.jobTitle}</p>
                <p className="text-gray-700 text-xs">{exp.startDate} – {exp.endDate || "Present"}</p>
              </div>
              <p className="text-gray-700 font-semibold text-sm">{exp.company}</p>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="mt-2 ml-4 text-xs text-gray-700">
                  {exp.bullets.map((bullet, bidx) => (
                    <li key={bidx} className="list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase mb-3">Education</h3>
          {resume.education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-bold text-gray-900 text-sm">{edu.degree}</p>
              <p className="text-gray-700 text-sm">{edu.school}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase mb-2">Core Competencies</h3>
          <p className="text-xs text-gray-700">{resume.skills.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export function TechTemplate({ resume }: TemplateProps) {
  return (
    <div className="bg-gray-900 text-gray-100 p-8 font-mono">
      {/* Header */}
      <div className="mb-6 border-l-4 border-green-400 pl-4">
        <h1 className="text-2xl font-bold text-green-400">
          {resume.personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {resume.personalInfo?.title || "Professional Title"}
        </p>
        <div className="flex gap-3 text-xs text-gray-400 mt-2">
          {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo?.phone && <span>|</span>}
          {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-6 text-xs text-gray-300 leading-relaxed">
          {resume.summary}
        </div>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-green-400 font-bold text-sm mb-3">$ experience</h2>
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="mb-3 text-xs">
              <p className="text-green-400 font-semibold">
                {exp.jobTitle} @ {exp.company}
              </p>
              <p className="text-gray-500">{exp.startDate} - {exp.endDate || "Present"}</p>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="mt-1 ml-2 text-gray-300">
                  {exp.bullets.map((bullet, bidx) => (
                    <li key={bidx}>→ {bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-green-400 font-bold text-sm mb-3">$ education</h2>
          {resume.education.map((edu, idx) => (
            <div key={idx} className="mb-2 text-xs">
              <p className="text-green-400">{edu.degree}</p>
              <p className="text-gray-400">{edu.school}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div>
          <h2 className="text-green-400 font-bold text-sm mb-2">$ skills</h2>
          <p className="text-xs text-gray-300">{resume.skills.join(" • ")}</p>
        </div>
      )}
    </div>
  );
}

export function CreativeTemplate({ resume }: TemplateProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 text-gray-900">
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg">
        <h1 className="text-4xl font-bold">{resume.personalInfo?.fullName || "Your Name"}</h1>
        <p className="text-purple-100 text-lg mt-2">
          {resume.personalInfo?.title || "Professional Title"}
        </p>
        <div className="flex gap-4 text-sm mt-3">
          {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Experience</h2>
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="mb-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-600">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900">{exp.jobTitle}</p>
                  <p className="text-pink-600 font-semibold">{exp.company}</p>
                </div>
                <p className="text-gray-600 text-sm">{exp.startDate}</p>
              </div>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="mt-3 ml-4 text-sm text-gray-700">
                  {exp.bullets.map((bullet, bidx) => (
                    <li key={bidx} className="list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Education</h2>
          {resume.education.map((edu, idx) => (
            <div key={idx} className="mb-3 bg-white p-4 rounded-lg shadow-sm">
              <p className="font-bold text-gray-900">{edu.degree}</p>
              <p className="text-pink-600">{edu.school}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
