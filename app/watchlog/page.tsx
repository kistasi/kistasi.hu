"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WatchlogEntry } from "@/app/types/tmdb";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

const CARD_BASE = "bg-surface dark:bg-surface-dark rounded-lg overflow-hidden shadow-md max-w-xs mx-auto";
const FILM_TITLE = "text-3xl font-bold text-primary dark:text-primary-dark";
const FILM_YEAR = "text-gray-600 dark:text-gray-400 text-xl";
const MESSAGE_TEXT = "text-center text-gray-600 dark:text-gray-400 py-8";
const BUTTON_BASE = "px-6 py-3 bg-primary dark:bg-primary-dark text-surface dark:text-surface-dark rounded-lg font-semibold hover:opacity-90 transition-opacity";
const LINK_BUTTON = "text-primary dark:text-primary-dark underline hover:opacity-80 transition-opacity";
const BREADCRUMB_LINK = "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors";

export default function WatchlogPage() {
  const [entries, setEntries] = useState<WatchlogEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<WatchlogEntry | null>(null);
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

        // Set random initial entry
        if (data.entries.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.entries.length);
          setCurrentEntry(data.entries[randomIndex]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlog();
  }, []);

  const getRandomEntry = () => {
    if (entries.length === 0) return;
    const randomIndex = Math.floor(Math.random() * entries.length);
    setCurrentEntry(entries[randomIndex]);
  };

  const renderHeader = () => (
    <header className="mb-8">
      <nav className="mb-4">
        <Link href="/" className={BREADCRUMB_LINK}>
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-primary dark:text-primary-dark">Watchlog</span>
      </nav>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary dark:text-primary-dark">
          Watchlog
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          A random film I&apos;ve watched
        </p>
      </div>
    </header>
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-background dark:bg-background-dark p-8">
        <div className="max-w-7xl mx-auto">
          {renderHeader()}
          <p className={MESSAGE_TEXT}>Loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background dark:bg-background-dark p-8">
        <div className="max-w-7xl mx-auto">
          {renderHeader()}
          <p className={MESSAGE_TEXT}>Oops! Couldn&apos;t load the films right now.</p>
        </div>
      </main>
    );
  }

  if (entries.length === 0 || !currentEntry) {
    return (
      <main className="min-h-screen bg-background dark:bg-background-dark p-8">
        <div className="max-w-7xl mx-auto">
          {renderHeader()}
          <p className={MESSAGE_TEXT}>No films here yet!</p>
        </div>
      </main>
    );
  }

  const { movieDetails } = currentEntry;
  const posterUrl = movieDetails.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${movieDetails.poster_path}`
    : null;
  const year = movieDetails.release_date
    ? new Date(movieDetails.release_date).getFullYear()
    : null;

  return (
    <main className="min-h-screen bg-background dark:bg-background-dark p-8">
      <div className="max-w-7xl mx-auto">
        {renderHeader()}

        <div className="flex flex-col items-center gap-4">
          <article className={CARD_BASE}>
            {posterUrl && (
              <Image
                src={posterUrl}
                alt={`${movieDetails.title} poster`}
                width={342}
                height={513}
                priority
                className="w-full h-auto aspect-[2/3] object-cover"
              />
            )}
            <div className="p-6">
              <h2 className={FILM_TITLE}>
                <a
                  href={`https://www.themoviedb.org/movie/${currentEntry.tmdbId}`}
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

          <button
            onClick={getRandomEntry}
            className={BUTTON_BASE}
          >
            Show me another
          </button>

          <Link href="/watchlog/all" className={LINK_BUTTON}>
            See all films →
          </Link>
        </div>
      </div>
    </main>
  );
}
