import { WorkExperience, getLocalizedString, getLocalizedArray } from "@/app/types/experience";
import { Language, translations } from "@/app/types/language";

interface ExperienceCardProps {
  experience: WorkExperience;
  language: Language;
}

export default function ExperienceCard({ experience, language }: ExperienceCardProps) {
  const t = translations[language];

  const formatDate = (date: string) => {
    if (date === "Present") return t.present;
    const [year, month] = date.split("-");
    return `${year}.${month}`;
  };

  return (
    <div className="border-2 border-[#2c3144] dark:border-white bg-white dark:bg-[#2c3144] p-6 space-y-4 transition-colors duration-200">
      {/* Header */}
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-[#2c3144] dark:text-white">
          {getLocalizedString(experience.position, language)}
        </h3>
        <p className="text-lg text-[#2c3144] dark:text-white opacity-80">
          {experience.company}
        </p>
        <div className="flex justify-between text-sm text-[#2c3144] dark:text-white opacity-60">
          <span>{experience.location}</span>
          <span>
            {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-[#2c3144] dark:text-white opacity-80">
        {getLocalizedString(experience.description, language)}
      </p>

      {/* Responsibilities */}
      <div className="space-y-2">
        <h4 className="font-bold text-[#2c3144] dark:text-white">{t.responsibilities}</h4>
        <ul className="list-disc list-inside space-y-1 text-[#2c3144] dark:text-white opacity-80">
          {getLocalizedArray(experience.responsibilities, language).map((responsibility, index) => (
            <li key={index} className="text-sm">
              {responsibility}
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      {experience.technologies && experience.technologies.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-bold text-[#2c3144] dark:text-white">{t.technologies}</h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm border border-[#2c3144] dark:border-white text-[#2c3144] dark:text-white bg-[#f2f8fa] dark:bg-[#1a1d2e]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
