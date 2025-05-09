import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const MovieContext = createContext()

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([])
  const [trending, setTrending] = useState([])
  const [favorites, setFavorites] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(saved)
  }, [])

  // Fetch trending movies
  const fetchTrending = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
      setTrending(data.results)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Search movies
  const searchMovies = async (query) => {
    if (!query.trim()) {
      setMovies([])
      return
    }
    
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      )
      setMovies(data.results)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Toggle favorite
  const toggleFavorite = (movie) => {
    const updated = favorites.some((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie]
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

 
  return (
    <MovieContext.Provider
      value={{
        movies,
        trending,
        favorites,
        
        isLoading,
        error,
        fetchTrending,
        searchMovies,
        toggleFavorite,
        
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export const useMovieContext = () => {
  return useContext(MovieContext)
}