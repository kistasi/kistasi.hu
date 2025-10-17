import { Language } from "./language";

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
