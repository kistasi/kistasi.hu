export interface TMDBMovieDetails {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
  runtime: number | null;
}

export interface WatchlogEntry {
  tmdbId: number;
  movieDetails: TMDBMovieDetails;
}
