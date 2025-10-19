import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watchlog",
  description: "Films I've watched - tracked via TMDB",
};

export default function WatchlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
