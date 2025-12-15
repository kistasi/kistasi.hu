import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://kistasi.hu"),
  title: {
    default: "kistasi.hu",
    template: "%s | kistasi.hu"
  },
  description: "doing film, theatre and software stuff",
  authors: [{ name: "Márton Tasnádi", url: "https://kistasi.hu" }],
  creator: "Márton Tasnádi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kistasi.hu",
    title: "kistasi.hu",
    description: "doing film, theatre and software stuff",
    siteName: "kistasi.hu",
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
  other: {
    "theme-color": "#1a1d2e",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
