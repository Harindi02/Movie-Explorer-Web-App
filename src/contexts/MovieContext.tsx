import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Movie, MovieContextState } from '../types';
import { getPopularMovies, searchMovies } from '../utils/api';
import { loadFavorites, saveFavorites } from '../utils/storage';

// Define action types
type MovieAction =
  | { type: 'SET_MOVIES'; payload: Movie[] }
  | { type: 'SET_SEARCH_RESULTS'; payload: Movie[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'ADD_FAVORITE'; payload: Movie }
  | { type: 'REMOVE_FAVORITE'; payload: number }
  | { type: 'SET_FAVORITES'; payload: Movie[] };

// Initial state
const initialState: MovieContextState = {
  movies: [],
  searchResults: [],
  favorites: [],
  loading: false,
  error: null,
  searchQuery: '',
};

// Create reducer
const movieReducer = (state: MovieContextState, action: MovieAction): MovieContextState => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'ADD_FAVORITE':
      // Avoid duplicates
      if (state.favorites.some(movie => movie.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(movie => movie.id !== action.payload),
      };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};

// Create context
interface MovieContextType extends MovieContextState {
  fetchMovies: () => Promise<void>;
  searchMoviesAction: (query: string) => Promise<void>;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  setSearchQuery: (query: string) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

// Create provider
export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const favorites = loadFavorites();
    dispatch({ type: 'SET_FAVORITES', payload: favorites });
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    saveFavorites(state.favorites);
  }, [state.favorites]);

  // Fetch initial popular movies
  useEffect(() => {
    fetchMovies();
  }, []);

  // Fetch popular movies
  const fetchMovies = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const movies = await getPopularMovies();
      dispatch({ type: 'SET_MOVIES', payload: movies });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      console.error('Error fetching movies:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch movies' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Search movies
  const searchMoviesAction = async (query: string) => {
    if (!query.trim()) {
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const results = await searchMovies(query);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      console.error('Error searching movies:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to search movies' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Add movie to favorites
  const addFavorite = (movie: Movie) => {
    dispatch({ type: 'ADD_FAVORITE', payload: movie });
  };

  // Remove movie from favorites
  const removeFavorite = (movieId: number) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: movieId });
  };

  // Set search query
  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  return (
    <MovieContext.Provider
      value={{
        ...state,
        fetchMovies,
        searchMoviesAction,
        addFavorite,
        removeFavorite,
        setSearchQuery,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook for using movie context
export const useMovies = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};