import { useEffect, useState } from 'react';
import { Film, TrendingUp as Trending, Clock } from 'lucide-react';
import { useMovies } from '../contexts/MovieContext';
import { getTrendingMovies } from '../utils/api';
import { Movie } from '../types';
import MovieGrid from '../components/MovieGrid';

const Home = () => {
  const { movies, loading, error, fetchMovies } = useMovies();
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingError, setTrendingError] = useState<string | null>(null);

  // Fetch popular movies
  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
  }, [movies.length, fetchMovies]);

  // Fetch trending movies
  useEffect(() => {
    const loadTrendingMovies = async () => {
      setTrendingLoading(true);
      try {
        const data = await getTrendingMovies();
        setTrendingMovies(data);
        setTrendingError(null);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setTrendingError('Failed to load trending movies');
      } finally {
        setTrendingLoading(false);
      }
    };

    loadTrendingMovies();
  }, []);

  return (
    <div className="container mx-auto px-4 pt-20 pb-8">
      {/* Hero Section */}
      <section className="relative rounded-xl overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-900 mb-12">
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <div className="relative z-10 py-16 px-6 md:px-12 text-center">
          <Film size={56} className="mx-auto mb-6 text-red-500" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Discover <span className="text-red-500">Amazing</span> Movies
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Search, explore and save your favorite movies all in one place.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Try 'Inception', 'Avengers', or 'The Godfather'..."
                className="w-full px-5 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="absolute right-1 top-1 bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-full transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Movies Section */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <Trending size={24} className="mr-2 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Trending Movies
          </h2>
        </div>
        <MovieGrid
          movies={trendingMovies}
          loading={trendingLoading}
          error={trendingError}
          emptyMessage="No trending movies available right now"
        />
      </section>

      {/* Popular Movies Section */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <Clock size={24} className="mr-2 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Popular Movies
          </h2>
        </div>
        <MovieGrid
          movies={movies}
          loading={loading}
          error={error}
          emptyMessage="No popular movies available right now"
        />
      </section>
    </div>
  );
};

export default Home;