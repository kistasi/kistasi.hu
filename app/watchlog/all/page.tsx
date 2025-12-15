"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WatchlogEntry } from "@/app/types/tmdb";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

const CARD_BASE = "bg-surface rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow";
const FILM_TITLE = "text-xl font-bold text-primary";
const FILM_YEAR = "text-base text-gray-400";
const MESSAGE_TEXT = "text-center text-gray-400 py-8";
const GRID_LAYOUT = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6";
const BREADCRUMB_LINK = "text-base text-gray-400 hover:text-primary transition-colors";

export default function WatchlogAllPage() {
  const [entries, setEntries] = useState<WatchlogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWatchlog() {
      try {
        const response = await fetch("/api/watchlog");
        if (!response.ok) {
          throw new Error("Failed to fetch watchlog");
        }
        const data = await response.json();
        setEntries(data.entries);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlog();
  }, []);

  const renderHeader = () => (
    <header className="mb-12">
      <nav className="mb-6 text-base">
        <Link href="/" className={BREADCRUMB_LINK}>
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href="/watchlog" className={BREADCRUMB_LINK}>
          Watchlog
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-primary">All Films</span>
      </nav>
      <div className="space-y-3">
        <h1 className="text-5xl font-bold text-primary">
          All Films
        </h1>
        <p className="text-lg text-gray-400">
          {entries.length} {entries.length === 1 ? 'film' : 'films'} I&apos;ve watched
        </p>
      </div>
    </header>
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          {renderHeader()}
          <p className={MESSAGE_TEXT}>Loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          {renderHeader()}
          <p className={MESSAGE_TEXT}>Oops! Couldn&apos;t load the films right now.</p>
        </div>
      </main>
    );
  }

  if (entries.length === 0) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          {renderHeader()}
          <p className={MESSAGE_TEXT}>No films here yet!</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {renderHeader()}

        <div className={GRID_LAYOUT}>
          {entries.map((entry, index) => {
            const { movieDetails } = entry;
            const posterUrl = movieDetails.poster_path
              ? `${TMDB_IMAGE_BASE_URL}${movieDetails.poster_path}`
              : null;
            const year = movieDetails.release_date
              ? new Date(movieDetails.release_date).getFullYear()
              : null;

            return (
              <article key={`${entry.tmdbId}-${index}`} className={CARD_BASE}>
                {posterUrl && (
                  <Image
                    src={posterUrl}
                    alt={`${movieDetails.title} poster`}
                    width={342}
                    height={513}
                    className="w-full h-auto aspect-[2/3] object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className={FILM_TITLE}>
                    <a
                      href={`https://www.themoviedb.org/movie/${entry.tmdbId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {movieDetails.title}
                    </a>
                  </h2>
                  {year && <p className={FILM_YEAR}>{year}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
