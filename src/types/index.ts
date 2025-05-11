export interface Movie {
  runtime: any;
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  genres?: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface MovieContextState {
  movies: Movie[];
  searchResults: Movie[];
  favorites: Movie[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export type ThemeMode = 'light' | 'dark';