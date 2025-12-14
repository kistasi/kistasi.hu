"use client";

import ThemeToggle from "@/app/components/ThemeToggle";

interface Link {
  title: string;
  url: string;
  description: string;
}

interface Section {
  title: string;
  links: Link[];
}

const LINK_BUTTON_CLASSES = "block w-full border-2 border-primary dark:border-primary-dark bg-surface dark:bg-surface-dark text-primary dark:text-primary-dark hover:bg-primary dark:hover:bg-primary-dark hover:text-surface dark:hover:text-surface-dark transition-colors duration-200 p-4 text-center group";

const sections: Section[] = [
  {
    title: "Professional",
    links: [
      { title: "Resume", url: "/resume", description: "Work experience & skills" },
      { title: "LinkedIn", url: "https://www.linkedin.com/in/kistasi/", description: "Professional profile" },
      { title: "GitHub", url: "https://github.com/kistasi", description: "Code & contributions" }
    ]
  },
  /*{
    title: "Social",
    links: [
      { title: "Mastodon", url: "https://mastodon.social/@kistasi", description: "Social updates" },
      { title: "X", url: "https://x.com/_kistasi_", description: "Microblogging" }
    ]
  },*/
  {
    title: "Fun",
    links: [
      { title: "Watchlog", url: "/watchlog", description: "Films I've watched" },
      { title: "Letterboxd", url: "https://letterboxd.com/kistasi/", description: "Movie tracking" },
      { title: "Trakt", url: "https://trakt.tv/users/kistasi", description: "TV show tracking" }
    ]
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Márton Tasnádi",
  jobTitle: "Software Developer",
  description: "Full-stack software developer based in Budapest, Hungary",
  url: "https://kistasi.hu",
  email: "marton.tasnadi@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Budapest",
    addressCountry: "HU",
  },
  sameAs: [
    "https://www.linkedin.com/in/kistasi/",
    "https://github.com/kistasi",
    "https://mastodon.social/@kistasi",
    "https://x.com/_kistasi_",
    "https://letterboxd.com/kistasi/",
    "https://trakt.tv/users/kistasi",
  ],
};

export default function Home() {

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center p-6 transition-colors duration-200">
        <ThemeToggle />
        <div className="max-w-md w-full space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary dark:text-primary-dark">
            kistasi
          </h1>
          <p className="text-primary dark:text-primary-dark opacity-70">
            software • theatre • movie
          </p>
          <p className="text-primary dark:text-primary-dark opacity-60 text-sm pt-2">
            Welcome! Here you&apos;ll find links to my work, projects, and interests.
          </p>
        </header>

        <main className="space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-xl font-bold text-primary dark:text-primary-dark text-center pb-2">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.links.map((link) => (
                  <a
                    key={link.title}
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={LINK_BUTTON_CLASSES}
                  >
                    <div className="text-lg font-bold">{link.title}</div>
                    <div className="text-sm opacity-70">{link.description}</div>
                  </a>
                ))}
              </div>
            </section>
          ))}

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-primary dark:text-primary-dark text-center pb-2">
              Contact
            </h2>
            <div className="text-center text-primary dark:text-primary-dark">
              <p className="text-sm opacity-70 mb-2">Feel free to reach out</p>
              <a
                href="mailto:marton.tasnadi@gmail.com"
                className="text-lg hover:opacity-70 transition-opacity duration-200"
              >
                marton.tasnadi@gmail.com
              </a>
            </div>
          </section>
        </main>

        <footer className="text-center text-sm text-primary dark:text-primary-dark opacity-50 pt-4">
          © {new Date().getFullYear()} kistasi
        </footer>
      </div>
    </div>
    </>
  );
}
