"use client";

import { Document, Image, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Resume } from "@/types";
import { getPdfTemplateStyle } from "@/lib/pdf/template-styles";

const baseStyles = StyleSheet.create({
  page: {
    paddingHorizontal: 36,
    paddingVertical: 30,
    fontSize: 10.5,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 14,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  photo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    objectFit: "cover",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 3,
  },
  title: {
    fontSize: 11,
    color: "#666",
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 8.5,
    color: "#666",
    marginBottom: 3,
  },
  section: {
    marginTop: 10,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 3,
  },
  entry: {
    marginBottom: 7,
  },
  entryTitle: {
    fontSize: 10.5,
    fontWeight: "bold",
  },
  entrySubtitle: {
    fontSize: 9.5,
    color: "#666",
  },
  entryText: {
    fontSize: 9.5,
    marginTop: 3,
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  bullet: {
    marginLeft: 14,
    marginBottom: 2,
    fontSize: 9.5,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skill: {
    fontSize: 9,
    backgroundColor: "#f0f0f0",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
  },
  // Sidebar layout
  sidebarColumns: {
    flexDirection: "row",
    gap: 20,
  },
  sidebar: {
    width: "32%",
  },
  main: {
    width: "68%",
  },
  sidebarCard: {
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
});

interface PDFResumeProps {
  resume: Resume;
}

export function PDFResume({ resume }: PDFResumeProps) {
  const template =
    ((resume as Resume & { templateId?: string }).templateId || resume.template || "modern") as string;
  const style = getPdfTemplateStyle(template);

  const pageFont = { fontFamily: style.fontFamily || "Helvetica" };
  const accentColor = style.accent;
  const headingColor = style.headingColor;
  const isDarkHeader = Boolean(style.headerBg);
  const headerTextColor = isDarkHeader ? style.headerText || "#ffffff" : "#111827";
  const titleTextColor = isDarkHeader ? (style.headerText || "#ffffff") : "#666";
  const contactTextColor = isDarkHeader ? (style.headerText || "#ffffff") : "#666";
  const headerBorderColor = !isDarkHeader ? accentColor : style.headerBg || accentColor;

  const renderHeader = () => (
    <View
      style={[
        baseStyles.header,
        {
          borderBottomColor: headerBorderColor,
          ...(isDarkHeader
            ? { backgroundColor: style.headerBg, borderRadius: 6, padding: 12 }
            : {}),
        },
      ]}
    >
      <View style={baseStyles.headerRow}>
        {resume.personalInfo?.photoUrl && (
          <Image src={resume.personalInfo.photoUrl} style={baseStyles.photo} />
        )}
        <View style={{ flex: 1 }}>
          <Text
            style={[
              baseStyles.name,
              { color: isDarkHeader ? headerTextColor : accentColor },
            ]}
          >
            {resume.personalInfo?.fullName || "Your Name"}
          </Text>
          <Text
            style={[
              baseStyles.title,
              { color: titleTextColor },
            ]}
          >
            {resume.personalInfo?.title || "Professional Title"}
          </Text>
          <View>
            {resume.personalInfo?.email && (
              <Text style={[baseStyles.contactInfo, { color: contactTextColor }]}>
                Email: {resume.personalInfo.email}
              </Text>
            )}
            {resume.personalInfo?.phone && (
              <Text style={[baseStyles.contactInfo, { color: contactTextColor }]}>
                Phone: {resume.personalInfo.phone}
              </Text>
            )}
            {resume.personalInfo?.location && (
              <Text style={[baseStyles.contactInfo, { color: contactTextColor }]}>
                Location: {resume.personalInfo.location}
              </Text>
            )}
            {resume.personalInfo?.website && (
              <Text style={[baseStyles.contactInfo, { color: contactTextColor }]}>
                Website: {resume.personalInfo.website}
              </Text>
            )}
            {resume.personalInfo?.linkedin && (
              <Text style={[baseStyles.contactInfo, { color: contactTextColor }]}>
                LinkedIn: {resume.personalInfo.linkedin}
              </Text>
            )}
            {resume.personalInfo?.github && (
              <Text style={[baseStyles.contactInfo, { color: contactTextColor }]}>
                GitHub: {resume.personalInfo.github}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  const sectionTitleStyle = () => ({
    ...baseStyles.sectionTitle,
    color: headingColor,
    borderBottomColor: headingColor,
  });

  const renderExperience = () => {
    if (!resume.experience || resume.experience.length === 0) return null;
    return (
      <View style={baseStyles.section} wrap={false} minPresenceAhead={30}>
        <Text style={sectionTitleStyle()}>Experience</Text>
        {resume.experience.map((exp, idx) => {
          const entry = (exp as Record<string, string | string[] | undefined>) || undefined;
          const expAny = entry;
          const jobTitle = expAny.jobTitle || expAny.position || "";
          const company = expAny.company || "";
          const bullets = Array.isArray(expAny.bullets)
            ? expAny.bullets.filter((b): b is string => typeof b === "string")
            : Array.isArray(expAny.achievements)
              ? expAny.achievements.filter((b): b is string => typeof b === "string")
              : [];
          const dateParts = [expAny.startDate, expAny.endDate || "Present"].filter(
            Boolean
          );

          return (
            <View key={idx} style={baseStyles.entry}>
              <View style={baseStyles.entryRow}>
                <View style={{ flex: 1 }}>
                  {jobTitle && <Text style={baseStyles.entryTitle}>{jobTitle}</Text>}
                  {company && <Text style={baseStyles.entrySubtitle}>{company}</Text>}
                </View>
                {dateParts.length > 0 && (
                  <Text style={baseStyles.entrySubtitle}>{dateParts.join(" - ")}</Text>
                )}
              </View>
              {expAny.description && (
                <Text style={baseStyles.entryText}>{expAny.description}</Text>
              )}
              {bullets.length > 0 && (
                <View>
                  {bullets.map((bullet: string, bidx: number) => (
                    <Text key={bidx} style={baseStyles.bullet}>
                      • {bullet}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderEducation = () => {
    if (!resume.education || resume.education.length === 0) return null;
    return (
      <View style={baseStyles.section} wrap={false} minPresenceAhead={30}>
        <Text style={sectionTitleStyle()}>Education</Text>
        {resume.education.map((edu, idx) => (
          <View key={idx} style={baseStyles.entry}>
            <View style={baseStyles.entryRow}>
              <View style={{ flex: 1 }}>
                <Text style={baseStyles.entryTitle}>{edu.degree}</Text>
                <Text style={baseStyles.entrySubtitle}>{edu.school}</Text>
              </View>
              {edu.graduationYear && (
                <Text style={baseStyles.entrySubtitle}>{edu.graduationYear}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderProjects = () => {
    if (!resume.projects || resume.projects.length === 0) return null;
    return (
      <View style={baseStyles.section} wrap={false} minPresenceAhead={30}>
        <Text style={sectionTitleStyle()}>Projects</Text>
        {resume.projects.map((proj, idx) => (
          <View key={idx} style={baseStyles.entry}>
            <Text style={baseStyles.entryTitle}>{proj.name}</Text>
            <View>
              {proj.link && <Text style={baseStyles.entrySubtitle}>{proj.link}</Text>}
              {proj.description && (
                <Text style={baseStyles.entryText}>{proj.description}</Text>
              )}
              {proj.technologies && proj.technologies.length > 0 && (
                <Text style={baseStyles.entrySubtitle}>
                  Tech: {proj.technologies.join(", ")}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderCertifications = () => {
    if (!resume.certifications || resume.certifications.length === 0) return null;
    return (
      <View style={baseStyles.section} wrap={false} minPresenceAhead={30}>
        <Text style={sectionTitleStyle()}>Certifications</Text>
        {resume.certifications.map((cert, idx) => (
          <View key={idx} style={baseStyles.entry}>
            <Text style={baseStyles.entryTitle}>{cert.name}</Text>
            {cert.issuer && <Text style={baseStyles.entrySubtitle}>{cert.issuer}</Text>}
          </View>
        ))}
      </View>
    );
  };

  const renderSkills = () => {
    if (!resume.skills || resume.skills.length === 0) return null;
    return (
      <View style={baseStyles.section} wrap={false} minPresenceAhead={30}>
        <Text style={sectionTitleStyle()}>Skills</Text>
        <View style={baseStyles.skillsContainer}>
          {resume.skills.map((skill, idx) => (
            <Text
              key={idx}
              style={[
                baseStyles.skill,
                { backgroundColor: style.skillBg, color: style.skillText },
              ]}
            >
              {skill}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const allMainSections = () => (
    <>
      {resume.summary && (
        <View style={baseStyles.section} wrap={false} minPresenceAhead={30}>
          <Text style={sectionTitleStyle()}>Professional Summary</Text>
          <Text style={baseStyles.entryText}>{resume.summary}</Text>
        </View>
      )}
      {renderExperience()}
      {renderEducation()}
      {renderProjects()}
      {renderCertifications()}
      {renderSkills()}
    </>
  );

  const renderSidebarLayout = () => (
    <View style={[baseStyles.sidebarColumns, { alignItems: "flex-start" }]}>
      <View style={baseStyles.sidebar}>
        <View style={[baseStyles.sidebarCard, { backgroundColor: style.softBg }]} wrap={false}>
          {renderSkills()}
        </View>
        <View style={[baseStyles.sidebarCard, { backgroundColor: style.softBg }]} wrap={false}>
          {renderEducation()}
        </View>
        <View style={[baseStyles.sidebarCard, { backgroundColor: style.softBg }]} wrap={false}>
          {renderCertifications()}
        </View>
      </View>
      <View style={baseStyles.main}>
        {resume.summary && (
          <View style={baseStyles.section} wrap={false} minPresenceAhead={30}>
            <Text style={sectionTitleStyle()}>Professional Summary</Text>
            <Text style={baseStyles.entryText}>{resume.summary}</Text>
          </View>
        )}
        {renderExperience()}
        {renderProjects()}
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={[baseStyles.page, pageFont]}>
        {renderHeader()}
        {style.layout === "sidebar" ? renderSidebarLayout() : allMainSections()}
      </Page>
    </Document>
  );
}