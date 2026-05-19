"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
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
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
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
            {resume.experience.map((exp, idx) => (
              <View key={idx} style={styles.entry}>
                <Text style={styles.entryTitle}>{exp.jobTitle}</Text>
                <Text style={styles.entrySubtitle}>{exp.company}</Text>
                <Text style={styles.entrySubtitle}>
                  {exp.startDate} - {exp.endDate || "Present"}
                </Text>
                {exp.bullets && exp.bullets.length > 0 && (
                  <View>
                    {exp.bullets.map((bullet, bidx) => (
                      <Text key={bidx} style={styles.bullet}>
                        • {bullet}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
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
      </Page>
    </Document>
  );
}
