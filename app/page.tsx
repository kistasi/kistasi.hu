"use client";

interface Link {
  title: string;
  url: string;
  description: string;
}

interface Section {
  title: string;
  links: Link[];
}

const LINK_BUTTON_CLASSES =
  "block w-full border-2 border-primary bg-surface text-primary hover:bg-primary hover:text-surface transition-colors duration-200 p-6 text-center group";

const sections: Section[] = [
  {
    title: "Professional",
    links: [
      {
        title: "Resume",
        url: "/resume",
        description: "Work experience & skills",
      },
      {
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/kistasi/",
        description: "Professional profile",
      },
      {
        title: "GitHub",
        url: "https://github.com/kistasi",
        description: "Code & contributions",
      },
    ],
  },
  {
    title: "Fun",
    links: [
      {
        title: "Letterboxd",
        url: "https://letterboxd.com/kistasi/",
        description: "Film tracking",
      },
      {
        title: "Serializd",
        url: "https://www.serializd.com/user/kistasi",
        description: "TV show tracking",
      },
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Márton Tasnádi",
  jobTitle: "Software Developer",
  description: "doing film, theatre and software stuff",
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
    "https://letterboxd.com/kistasi/",
    "https://www.serializd.com/user/kistasi",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background flex items-center justify-center p-8 transition-colors duration-200">
        <div className="max-w-md w-full space-y-12">
          <header className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              kistasi
            </h1>
            <div className="flex justify-center">
              <p className="text-base md:text-lg text-primary opacity-70 text-nowrap">
                doing film, theatre and software stuff
              </p>
            </div>
          </header>

          <main className="space-y-12">
            {sections.map((section) => (
              <section key={section.title} className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-primary text-center">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.links.map((link) => (
                    <a
                      key={link.title}
                      href={link.url}
                      target={
                        link.url.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={LINK_BUTTON_CLASSES}
                    >
                      <div className="text-lg font-bold">{link.title}</div>
                      <div className="text-sm opacity-70">
                        {link.description}
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}

            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-primary text-center">
                Contact
              </h2>
              <div className="text-center text-primary space-y-3">
                <p className="text-base opacity-70">Feel free to reach out</p>
                <a
                  href="mailto:marton.tasnadi@gmail.com"
                  className="text-lg hover:opacity-70 transition-opacity duration-200"
                >
                  marton.tasnadi@gmail.com
                </a>
              </div>
            </section>
          </main>

          <footer className="text-center text-sm text-primary opacity-50 pt-6">
            © {new Date().getFullYear()} kistasi
          </footer>
        </div>
      </div>
    </>
  );
}
