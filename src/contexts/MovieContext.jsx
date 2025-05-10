import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]); // Removed localStorage
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load only favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
  }, []);

  const fetchTrending = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      );
      setTrending(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const searchMovies = async (query) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      setMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (movie) => {
    const updated = favorites.some((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const contextValue = useMemo(() => ({
    movies,
    trending,
    favorites,
    darkMode,
    isLoading,
    error,
    fetchTrending,
    searchMovies,
    toggleFavorite,
    toggleDarkMode,
  }), [movies, trending, favorites, darkMode, isLoading, error]);

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);