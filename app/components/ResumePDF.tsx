import path from "node:path";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import {
  WorkExperience,
  formatDateRange,
  getLocalizedString,
  getLocalizedArray,
} from "@/app/types/experience";
import { Language, translations } from "@/app/types/language";

// Courier Prime (SIL OFL 1.1) is bundled in the repo: a Courier-style monospace that
// matches the site's Courier New look and covers Hungarian characters (ő, ű, …).
// Fonts are read from disk, so PDF generation never hits the network.
const fontDir = path.join(process.cwd(), "assets", "fonts");
Font.register({
  family: "CourierPrime",
  fonts: [
    { src: path.join(fontDir, "CourierPrime-Regular.ttf") },
    { src: path.join(fontDir, "CourierPrime-Bold.ttf"), fontWeight: "bold" },
  ],
});
// No automatic hyphenation: it is wrong for Hungarian and looks odd in monospace.
Font.registerHyphenationCallback((word) => [word]);

// Print-friendly palette: solid ink on white (no opacity, no dark fills).
const colors = {
  text: "#2c3144",
  textSecondary: "#565a69",
  textMuted: "#80838f",
  border: "#2c3144",
  tagBg: "#f4f5f8",
  page: "#ffffff",
};

const fontSize = {
  name: 22,
  title: 13,
  sectionHeading: 13,
  position: 13,
  company: 11,
  cardHeading: 10.5,
  body: 9.5,
  meta: 9,
  tag: 8.5,
  footer: 8,
};

const space = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
};

const lineHeight = 1.4;

interface ResumePDFProps {
  experiences: WorkExperience[];
  language: Language;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingHorizontal: 36,
    paddingBottom: 56,
    backgroundColor: colors.page,
    fontFamily: "CourierPrime",
    color: colors.text,
  },
  name: {
    fontSize: fontSize.name,
    fontWeight: "bold",
    color: colors.text,
  },
  title: {
    marginTop: space.sm,
    fontSize: fontSize.title,
    fontWeight: "bold",
    color: colors.textSecondary,
  },
  contactRow: {
    marginTop: space.md,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: space.lg,
    rowGap: space.xs,
  },
  contactItem: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },
  sectionHeading: {
    marginTop: space.xxl,
    marginBottom: space.md,
    fontSize: fontSize.sectionHeading,
    fontWeight: "bold",
    color: colors.text,
  },
  card: {
    padding: space.lg,
    border: `1.5 solid ${colors.border}`,
  },
  // Cards are spaced with marginTop rather than marginBottom: react-pdf counts a node's
  // marginBottom when checking whether it fits, which would push a card that ends just
  // above the page bottom onto the next page.
  cardSpacing: {
    marginTop: space.xl,
  },
  cardHeader: {
    rowGap: space.sm,
  },
  position: {
    fontSize: fontSize.position,
    fontWeight: "bold",
    color: colors.text,
  },
  company: {
    fontSize: fontSize.company,
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: space.lg,
  },
  meta: {
    fontSize: fontSize.meta,
    color: colors.textMuted,
  },
  description: {
    marginTop: space.lg,
    fontSize: fontSize.body,
    lineHeight,
    color: colors.textSecondary,
  },
  cardHeading: {
    marginTop: space.lg,
    fontSize: fontSize.cardHeading,
    fontWeight: "bold",
    color: colors.text,
  },
  bulletRow: {
    marginTop: space.sm,
    flexDirection: "row",
  },
  bulletMark: {
    width: 10,
    fontSize: fontSize.body,
    lineHeight,
    color: colors.textSecondary,
  },
  bulletText: {
    flex: 1,
    fontSize: fontSize.body,
    lineHeight,
    color: colors.textSecondary,
  },
  tags: {
    marginTop: space.sm,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space.sm,
  },
  tag: {
    fontSize: fontSize.tag,
    color: colors.text,
    backgroundColor: colors.tagBg,
    border: `0.75 solid ${colors.border}`,
    paddingHorizontal: space.sm,
    paddingVertical: space.xs,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 36,
    right: 36,
    textAlign: "center",
    fontSize: fontSize.footer,
    color: colors.textMuted,
  },
});

// A bullet with a hanging indent: wrapped lines align with the text, not the bullet.
// wrap={false} keeps a single bullet from splitting across pages.
function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow} wrap={false}>
      <Text style={styles.bulletMark}>•</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

export default function ResumePDF({ experiences, language }: ResumePDFProps) {
  const t = translations[language];
  const name = language === "hu" ? "Tasnádi Márton" : "Márton Tasnádi";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{t.jobTitle}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{t.phone} +36 20 2327330</Text>
            <Text style={styles.contactItem}>{t.email} marton.tasnadi@gmail.com</Text>
            <Text style={styles.contactItem}>{t.web} kistasi.hu</Text>
            <Text style={styles.contactItem}>{t.location} Budapest, Hungary</Text>
          </View>
        </View>

        <Text style={styles.sectionHeading} minPresenceAhead={120}>
          {t.workExperience}
        </Text>

        {/* Experiences */}
        {experiences.map((experience, index) => {
          const [firstResponsibility, ...otherResponsibilities] = getLocalizedArray(
            experience.responsibilities,
            language
          );

          return (
            <View key={index} style={index > 0 ? [styles.card, styles.cardSpacing] : styles.card}>
              {/* Lead block: header, description, heading and first bullet move together,
                  so a job header is never left alone at the bottom of a page. */}
              <View wrap={false}>
                <View style={styles.cardHeader}>
                  <Text style={styles.position}>{getLocalizedString(experience.position, language)}</Text>
                  <Text style={styles.company}>{experience.company}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.meta}>{experience.location}</Text>
                    <Text style={styles.meta}>
                      {formatDateRange(experience.startDate, experience.endDate, language)}
                    </Text>
                  </View>
                </View>

                <Text style={styles.description}>{getLocalizedString(experience.description, language)}</Text>

                {firstResponsibility && (
                  <>
                    <Text style={styles.cardHeading}>{t.responsibilities}</Text>
                    <Bullet text={firstResponsibility} />
                  </>
                )}
              </View>

              {otherResponsibilities.map((responsibility, idx) => (
                <Bullet key={idx} text={responsibility} />
              ))}

              {experience.technologies && experience.technologies.length > 0 && (
                <View wrap={false}>
                  <Text style={styles.cardHeading}>{t.technologies}</Text>
                  <View style={styles.tags}>
                    {experience.technologies.map((tech, idx) => (
                      <Text key={idx} style={styles.tag}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          );
        })}

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) => `${name} · kistasi.hu · ${pageNumber} / ${totalPages}`}
        />
      </Page>
    </Document>
  );
}
