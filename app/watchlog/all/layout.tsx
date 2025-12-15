import type { Metadata } from "next";
import React from "react";

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
