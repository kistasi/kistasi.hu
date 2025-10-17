import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://kistasi.hu"),
  title: {
    default: "kistasi - Software Developer",
    template: "%s | kistasi"
  },
  description: "Full-stack software developer based in Budapest, Hungary. Specializing in web development with experience in Next.js, Laravel, TypeScript, and Python.",
  keywords: ["software developer", "web developer", "full-stack developer", "Budapest", "Márton Tasnádi", "kistasi", "TypeScript", "React", "Next.js", "Laravel", "PHP"],
  authors: [{ name: "Márton Tasnádi", url: "https://kistasi.hu" }],
  creator: "Márton Tasnádi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kistasi.hu",
    title: "kistasi - Software Developer",
    description: "Full-stack software developer based in Budapest, Hungary",
    siteName: "kistasi.hu",
  },
  twitter: {
    card: "summary",
    title: "kistasi - Software Developer",
    description: "Full-stack software developer based in Budapest, Hungary",
    creator: "@_kistasi_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://kistasi.hu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
