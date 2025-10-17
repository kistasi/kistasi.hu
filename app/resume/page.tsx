"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ExperienceCard from "@/app/components/ExperienceCard";
import ThemeToggle from "@/app/components/ThemeToggle";
import { workExperiences } from "@/app/data/experiences";
import { Language, translations } from "@/app/types/language";

const LANG_BUTTON_BASE = "px-4 py-2 border-2 border-primary dark:border-primary-dark transition-colors duration-200 font-bold cursor-pointer";
const LANG_BUTTON_ACTIVE = "bg-primary dark:bg-primary-dark text-surface dark:text-surface-dark";
const LANG_BUTTON_INACTIVE = "bg-surface dark:bg-surface-dark text-primary dark:text-primary-dark hover:bg-primary dark:hover:bg-primary-dark hover:text-surface dark:hover:text-surface-dark";

const ACTION_BUTTON_BASE = "inline-block px-6 py-2 border-2 border-primary dark:border-primary-dark transition-colors duration-200 font-bold";
const BACK_BUTTON = "bg-surface dark:bg-surface-dark text-primary dark:text-primary-dark hover:bg-primary dark:hover:bg-primary-dark hover:text-surface dark:hover:text-surface-dark";
const DOWNLOAD_BUTTON = "bg-primary dark:bg-primary-dark text-surface dark:text-surface-dark hover:bg-surface dark:hover:bg-surface-dark hover:text-primary dark:hover:text-primary-dark";

export default function ResumePage() {
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language];

  useEffect(() => {
    document.title = `${t.title} | kistasi`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Professional work experience and skills of kistasi (Márton Tasnádi), full-stack software developer");
    }
  }, [t.title]);

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark py-12 px-6 transition-colors duration-200">
      <ThemeToggle />
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-primary dark:text-primary-dark">
            {t.title}
          </h1>
          <p className="text-primary dark:text-primary-dark opacity-70 text-lg">
            {t.subtitle}
          </p>

          <div className="flex justify-center gap-2">
            <button
              onClick={() => setLanguage("en")}
              className={`${LANG_BUTTON_BASE} ${language === "en" ? LANG_BUTTON_ACTIVE : LANG_BUTTON_INACTIVE}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("hu")}
              className={`${LANG_BUTTON_BASE} ${language === "hu" ? LANG_BUTTON_ACTIVE : LANG_BUTTON_INACTIVE}`}
            >
              HU
            </button>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/" className={`${ACTION_BUTTON_BASE} ${BACK_BUTTON}`}>
              {t.backButton}
            </Link>
            <a
              href={`/api/resume/pdf?lang=${language}`}
              download={language === "hu" ? "tasnadi-marton-cv.pdf" : "marton-tasnadi-cv.pdf"}
              className={`${ACTION_BUTTON_BASE} ${DOWNLOAD_BUTTON}`}
            >
              {t.downloadPdf}
            </a>
          </div>
        </header>

        <main className="space-y-6">
          {workExperiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} language={language} />
          ))}
        </main>

        <footer className="text-center text-sm text-primary dark:text-primary-dark opacity-50 pt-8">
          {t.footer.replace("{year}", new Date().getFullYear().toString())}
        </footer>
      </div>
    </div>
  );
}
