export default function Home() {
  const links = [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/kistasi/",
      description: "Professional profile"
    },
    {
      title: "Download CV",
      url: "/marton-tasnadi-cv-2025fall.pdf",
      description: "Resume & experience"
    },
    {
      title: "GitHub",
      url: "https://github.com/kistasi",
      description: "Code & contributions"
    },
    {
      title: "Letterboxd",
      url: "https://letterboxd.com/kistasi/",
      description: "Movie tracking"
    },
    {
      title: "Trakt",
      url: "https://trakt.tv/users/kistasi",
      description: "TV show tracking"
    },
    {
      title: "Email",
      url: "mailto:marton.tasnadi@gmail.com",
      description: "Get in touch"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f2f8fa] flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Profile Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-[#2c3144]">
            kistasi
          </h1>
          <p className="text-[#2c3144] opacity-70">
            software • theatre • movie
          </p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="block w-full border-2 border-[#2c3144] bg-white hover:bg-[#2c3144] hover:text-white transition-colors duration-200 p-4 text-center group"
            >
              <div className="text-lg font-bold">{link.title}</div>
              <div className="text-sm opacity-70">{link.description}</div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-[#2c3144] opacity-50 pt-4">
          © {new Date().getFullYear()} kistasi
        </div>
      </div>
    </div>
  );
}
