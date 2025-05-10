import axios from 'axios'

// TMDb API configuration 
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

// Sizes: w92, w154, w185, w342, w500, w780, original
export const POSTER_SIZE = 'w342'
export const BACKDROP_SIZE = 'w1280'

// Create axios instance
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  }
})

// API Functions
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/movie/popular', { params: { page } })
    return response.data
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    throw error
  }
}

export const searchMovies = async (query, page = 1) => {
  try {
    if (!query) return { results: [] }
    const response = await tmdbApi.get('/search/movie', { 
      params: { query, page, include_adult: false } 
    })
    return response.data
  } catch (error) {
    console.error('Error searching movies:', error)
    throw error
  }
}

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, { 
      params: { append_to_response: 'credits' } 
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error)
    throw error
  }
}

export const getMovieRecommendations = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/recommendations`)
    return response.data
  } catch (error) {
    console.error(`Error fetching recommendations for movie ID ${movieId}:`, error)
    throw error
  }
}

export const getImageUrl = (path, size = POSTER_SIZE) => {
  if (!path) return null
  return `${IMAGE_BASE_URL}/${size}${path}`
}

export default tmdbApi