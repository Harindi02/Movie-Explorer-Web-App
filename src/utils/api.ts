import axios from 'axios';
import { Movie, Video, Genre } from '../types';

// Replace with your actual TMDB API key
const API_KEY = 'f745fcddb68a110b677a689f55674cf9';
const BASE_URL = 'https://api.themoviedb.org/3';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// Function to get popular movies
export const getPopularMovies = async (page = 1): Promise<Movie[]> => {
  try {
    const response = await api.get('/movie/popular', {
      params: { page },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Function to get trending movies
export const getTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/trending/movie/day');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

// Function to search movies
export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await api.get('/search/movie', {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Function to get movie details
export const getMovieDetails = async (id: string): Promise<Movie> => {
  try {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    throw error;
  }
};

// Function to get movie videos
export const getMovieVideos = async (id: string): Promise<Video[]> => {
  try {
    const response = await api.get(`/movie/${id}/videos`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching videos for movie ID ${id}:`, error);
    throw error;
  }
};

// Function to get all genres
export const getGenres = async (): Promise<Genre[]> => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export default api;