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
    <div className="border-2 border-primary bg-surface p-6 space-y-6 transition-colors duration-200">
      {/* Header */}
      <div className="space-y-3">
        <h3 className="text-2xl md:text-3xl font-bold text-primary">
          {getLocalizedString(experience.position, language)}
        </h3>
        <p className="text-lg md:text-xl text-primary opacity-80">
          {experience.company}
        </p>
        <div className="flex flex-col md:flex-row md:justify-between gap-1 text-sm md:text-base text-primary opacity-60">
          <span>{experience.location}</span>
          <span>
            {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm md:text-base text-primary opacity-80">
        {getLocalizedString(experience.description, language)}
      </p>

      {/* Responsibilities */}
      <div className="space-y-3">
        <h4 className="text-lg md:text-xl font-bold text-primary">{t.responsibilities}</h4>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-primary opacity-80">
          {getLocalizedArray(experience.responsibilities, language).map((responsibility, index) => (
            <li key={index}>
              {responsibility}
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      {experience.technologies && experience.technologies.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg md:text-xl font-bold text-primary">{t.technologies}</h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-sm border border-primary text-primary bg-background"
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
