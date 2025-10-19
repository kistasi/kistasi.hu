import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Films - Watchlog",
  description: "Complete list of films I've watched",
};

export default function WatchlogAllLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
