"use client";

import { Document, Image, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Resume } from "@/types";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  photo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    objectFit: "cover",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 9,
    color: "#666",
    marginBottom: 5,
  },
  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 4,
  },
  entry: {
    marginBottom: 10,
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  entrySubtitle: {
    fontSize: 10,
    color: "#666",
  },
  entryText: {
    fontSize: 10,
    marginTop: 4,
  },
  bullet: {
    marginLeft: 15,
    marginBottom: 4,
    fontSize: 10,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skill: {
    fontSize: 10,
    backgroundColor: "#f0f0f0",
    padding: 4,
    borderRadius: 2,
  },
});

interface PDFResumeProps {
  resume: Resume;
}

export function PDFResume({ resume }: PDFResumeProps) {
  const template =
    ((resume as Resume & { templateId?: string }).templateId || resume.template || "modern") as string;
  const accentColor =
    template === "creative" ? "#7e22ce" : template === "modern" ? "#059669" : "#111827";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: accentColor }]}>
          <View style={styles.headerRow}>
            {resume.personalInfo?.photoUrl && (
              <Image src={resume.personalInfo.photoUrl} style={styles.photo} />
            )}
            <View>
              <Text style={[styles.name, { color: accentColor }]}>
                {resume.personalInfo?.fullName || "Your Name"}
              </Text>
              <Text style={styles.title}>
                {resume.personalInfo?.title || "Professional Title"}
              </Text>
              <View>
                {resume.personalInfo?.email && (
                  <Text style={styles.contactInfo}>
                    Email: {resume.personalInfo.email}
                  </Text>
                )}
                {resume.personalInfo?.phone && (
                  <Text style={styles.contactInfo}>
                    Phone: {resume.personalInfo.phone}
                  </Text>
                )}
                {resume.personalInfo?.location && (
                  <Text style={styles.contactInfo}>
                    Location: {resume.personalInfo.location}
                  </Text>
                )}
                {resume.personalInfo?.website && (
                  <Text style={styles.contactInfo}>
                    Website: {resume.personalInfo.website}
                  </Text>
                )}
                {resume.personalInfo?.linkedin && (
                  <Text style={styles.contactInfo}>
                    LinkedIn: {resume.personalInfo.linkedin}
                  </Text>
                )}
                {resume.personalInfo?.github && (
                  <Text style={styles.contactInfo}>
                    GitHub: {resume.personalInfo.github}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Summary */}
        {resume.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.entryText}>{resume.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {resume.experience && resume.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
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
                <View key={idx} style={styles.entry}>
                  {jobTitle && <Text style={styles.entryTitle}>{jobTitle}</Text>}
                  {company && <Text style={styles.entrySubtitle}>{company}</Text>}
                  {dateParts.length > 0 && (
                    <Text style={styles.entrySubtitle}>{dateParts.join(" - ")}</Text>
                  )}
                  {entry.description && (
                    <Text style={styles.entryText}>{entry.description}</Text>
                  )}
                  {bullets.length > 0 && (
                    <View>
                      {bullets.map((bullet: string, bidx: number) => (
                        <Text key={bidx} style={styles.bullet}>
                          • {bullet}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resume.education.map((edu, idx) => (
              <View key={idx} style={styles.entry}>
                <Text style={styles.entryTitle}>{edu.degree}</Text>
                <Text style={styles.entrySubtitle}>{edu.school}</Text>
                <Text style={styles.entrySubtitle}>{edu.graduationYear}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {resume.skills.map((skill, idx) => (
                <Text key={idx} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {resume.projects && resume.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {resume.projects.map((proj, idx) => (
              <View key={idx} style={styles.entry}>
                <Text style={styles.entryTitle}>{proj.name}</Text>
                {proj.link && (
                  <Text style={styles.entrySubtitle}>{proj.link}</Text>
                )}
                {proj.description && (
                  <Text style={styles.entryText}>{proj.description}</Text>
                )}
                {proj.technologies && proj.technologies.length > 0 && (
                  <Text style={styles.entrySubtitle}>
                    Tech: {proj.technologies.join(", ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {resume.certifications && resume.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {resume.certifications.map((cert, idx) => (
              <View key={idx} style={styles.entry}>
                <Text style={styles.entryTitle}>{cert.name}</Text>
                {cert.issuer && (
                  <Text style={styles.entrySubtitle}>{cert.issuer}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
