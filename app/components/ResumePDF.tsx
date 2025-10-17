import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { WorkExperience, getLocalizedString, getLocalizedArray } from "@/app/types/experience";
import { Language, translations } from "@/app/types/language";

// Register a font that supports Hungarian characters
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

interface ResumePDFProps {
  experiences: WorkExperience[];
  language: Language;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Roboto",
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
  },
  name: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2c3144",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#2c3144",
    opacity: 0.8,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 8,
  },
  contactItem: {
    fontSize: 10,
    color: "#2c3144",
    opacity: 0.7,
  },
  subtitle: {
    fontSize: 14,
    color: "#2c3144",
    opacity: 0.7,
    marginTop: 20,
    marginBottom: 5,
  },
  experienceCard: {
    marginBottom: 25,
    borderBottom: "2 solid #2c3144",
    paddingBottom: 20,
  },
  experienceCardLast: {
    marginBottom: 25,
    paddingBottom: 20,
  },
  experienceHeader: {
    marginBottom: 10,
  },
  position: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3144",
    marginBottom: 5,
  },
  company: {
    fontSize: 14,
    color: "#2c3144",
    opacity: 0.8,
    marginBottom: 3,
  },
  locationDate: {
    fontSize: 10,
    color: "#2c3144",
    opacity: 0.6,
    marginBottom: 10,
  },
  description: {
    fontSize: 11,
    color: "#2c3144",
    opacity: 0.8,
    marginBottom: 12,
    lineHeight: 1.5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2c3144",
    marginBottom: 8,
  },
  responsibility: {
    fontSize: 10,
    color: "#2c3144",
    opacity: 0.8,
    marginBottom: 4,
    marginLeft: 10,
    lineHeight: 1.4,
  },
  technologiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  technology: {
    fontSize: 9,
    color: "#2c3144",
    backgroundColor: "#f2f8fa",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    border: "1 solid #2c3144",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#2c3144",
    opacity: 0.5,
  },
});

export default function ResumePDF({ experiences, language }: ResumePDFProps) {
  const t = translations[language];

  const formatDate = (date: string) => {
    if (date === "Present") return t.present;
    const [year, month] = date.split("-");
    return `${year}.${month}`;
  };

  const name = language === "hu" ? "Tasnádi Márton" : "Márton Tasnádi";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{t.jobTitle}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{t.phone} +36 20 2327330</Text>
            <Text style={styles.contactItem}>{t.email} marton.tasnadi@gmail.com</Text>
            <Text style={styles.contactItem}>{t.web} kistasi.hu</Text>
            <Text style={styles.contactItem}>{t.location} Budapest, Hungary</Text>
          </View>
          <Text style={styles.subtitle}>{t.workExperience}</Text>
        </View>

        {/* Experiences */}
        {experiences.map((experience, index) => (
          <View key={index} style={index === experiences.length - 1 ? styles.experienceCardLast : styles.experienceCard}>
            <View style={styles.experienceHeader}>
              <Text style={styles.position}>{getLocalizedString(experience.position, language)}</Text>
              <Text style={styles.company}>{experience.company}</Text>
              <Text style={styles.locationDate}>
                {experience.location} • {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
              </Text>
            </View>

            <Text style={styles.description}>{getLocalizedString(experience.description, language)}</Text>

            {/* Responsibilities */}
            <View>
              <Text style={styles.sectionTitle}>{t.responsibilities}</Text>
              {getLocalizedArray(experience.responsibilities, language).map((responsibility, idx) => (
                <Text key={idx} style={styles.responsibility}>
                  • {responsibility}
                </Text>
              ))}
            </View>

            {/* Technologies */}
            {experience.technologies && experience.technologies.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>{t.technologies}</Text>
                <View style={styles.technologiesContainer}>
                  {experience.technologies.map((tech, idx) => (
                    <Text key={idx} style={styles.technology}>
                      {tech}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        ))}
      </Page>
    </Document>
  );
}
