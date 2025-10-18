import { NextResponse } from "next/server";
import { watchedMovies } from "@/app/data/watchedMovies";
import { TMDBMovieDetails, WatchlogEntry } from "@/app/types/tmdb";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function fetchMovieDetails(tmdbId: number): Promise<TMDBMovieDetails | null> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      console.error(`Failed to fetch movie ${tmdbId}: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching movie ${tmdbId}:`, error);
    return null;
  }
}

export async function GET() {
  try {
    if (!TMDB_API_KEY) {
      return NextResponse.json(
        { error: "TMDB API key not configured" },
        { status: 500 }
      );
    }

    // Fetch movie details for all watched movies
    const movieDetailsPromises = watchedMovies.map(async (tmdbId) => {
      const details = await fetchMovieDetails(tmdbId);
      if (!details) return null;

      const entry: WatchlogEntry = {
        tmdbId,
        movieDetails: details,
      };
      return entry;
    });

    const results = await Promise.all(movieDetailsPromises);
    const entries = results.filter((entry): entry is WatchlogEntry => entry !== null);

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Error fetching watchlog data:", error);
    return NextResponse.json(
      { error: "Failed to fetch watchlog data" },
      { status: 500 }
    );
  }
}
