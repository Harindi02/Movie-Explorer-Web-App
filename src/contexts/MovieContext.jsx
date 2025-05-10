import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getPopularMovies, searchMovies } from '../api/tmdb'

const MovieContext = createContext()

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  // Fetch popular movies on initial load
  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getPopularMovies(1)
        setMovies(data.results)
        setTotalPages(data.total_pages)
        setCurrentPage(1)
      } catch (err) {
        setError('Failed to fetch popular movies')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialMovies()
  }, [])

  // Handle search functionality
  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (searchQuery) {
        try {
          setLoading(true)
          setError(null)
          const data = await searchMovies(searchQuery, 1)
          setSearchResults(data.results)
          setTotalPages(data.total_pages)
          setCurrentPage(1)
        } catch (err) {
          setError('Failed to search movies')
          console.error(err)
        } finally {
          setLoading(false)
        }
      } else {
        setSearchResults([])
      }
    }, 500) // debounce

    return () => clearTimeout(searchTimer)
  }, [searchQuery])

  // Load more movies functionality
  const loadMoreMovies = async () => {
    if (loading || currentPage >= totalPages) return
    
    try {
      setLoading(true)
      setError(null)
      const nextPage = currentPage + 1
      const data = searchQuery
        ? await searchMovies(searchQuery, nextPage)
        : await getPopularMovies(nextPage)
        
      if (searchQuery) {
        setSearchResults(prev => [...prev, ...data.results])
      } else {
        setMovies(prev => [...prev, ...data.results])
      }
      
      setCurrentPage(nextPage)
    } catch (err) {
      setError('Failed to load more movies')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Favorites management
  const toggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === movie.id)
      
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== movie.id)
      } else {
        return [...prevFavorites, movie]
      }
    })
  }

  const isFavorite = useCallback((movieId) => {
    return favorites.some(movie => movie.id === movieId)
  }, [favorites])

  return (
    <MovieContext.Provider value={{
      movies,
      searchResults,
      favorites,
      loading,
      error,
      searchQuery,
      setSearchQuery,
      loadMoreMovies,
      toggleFavorite,
      isFavorite,
      hasMorePages: currentPage < totalPages
    }}>
      {children}
    </MovieContext.Provider>
  )
}

export const useMovies = () => {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider')
  }
  return context
}