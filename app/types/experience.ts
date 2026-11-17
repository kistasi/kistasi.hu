import { Language, translations } from "./language";

export interface LocalizedContent {
  hu: string;
  en: string;
}

export interface WorkExperience {
  company: string;
  position: LocalizedContent;
  location: string;
  startDate: string;
  endDate: string;
  description: LocalizedContent;
  responsibilities: LocalizedContent[];
  technologies?: string[];
}

export function getLocalizedString(content: LocalizedContent, lang: Language): string {
  return content[lang];
}

export function getLocalizedArray(content: LocalizedContent[], lang: Language): string[] {
  return content.map(item => item[lang]);
}

export function formatDate(date: string, lang: Language): string {
  if (date === "Present") return translations[lang].present;
  const [year, month] = date.split("-");
  return `${year}.${month}`;
}

export function formatDateRange(start: string, end: string, lang: Language): string {
  return `${formatDate(start, lang)} – ${formatDate(end, lang)}`;
}
