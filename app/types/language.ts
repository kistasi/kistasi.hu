export type Language = "hu" | "en";

export interface ResumeTranslations {
  title: string;
  subtitle: string;
  workExperience: string;
  jobTitle: string;
  backButton: string;
  downloadPdf: string;
  responsibilities: string;
  technologies: string;
  present: string;
  footer: string;
  phone: string;
  email: string;
  web: string;
  location: string;
}

export const translations: Record<Language, ResumeTranslations> = {
  hu: {
    title: "Önéletrajz",
    subtitle: "Szakmai tapasztalatok",
    workExperience: "Munkatapasztalat",
    jobTitle: "Szoftverfejlesztő",
    backButton: "← Vissza a főoldalra",
    downloadPdf: "PDF Letöltése ↓",
    responsibilities: "Feladatok:",
    technologies: "Technológiák:",
    present: "Jelen",
    footer: "© {year} kistasi",
    phone: "Telefon:",
    email: "Email:",
    web: "Web:",
    location: "Helyszín:",
  },
  en: {
    title: "Resume",
    subtitle: "Professional Experience",
    workExperience: "Work Experience",
    jobTitle: "Software Developer",
    backButton: "← Back to Home",
    downloadPdf: "Download PDF ↓",
    responsibilities: "Responsibilities:",
    technologies: "Technologies:",
    present: "Present",
    footer: "© {year} kistasi",
    phone: "Phone:",
    email: "Email:",
    web: "Web:",
    location: "Location:",
  },
};
