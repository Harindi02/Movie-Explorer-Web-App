import MovieCard from './MovieCard';
import { Movie } from '../types';
import { AlertTriangle } from 'lucide-react';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}

const MovieGrid = ({
  movies,
  title,
  loading = false,
  error = null,
  emptyMessage = 'No movies found'
}: MovieGridProps) => {
  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          {title}
        </h2>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-lg">
          <AlertTriangle size={32} className="text-red-500 mb-2" />
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieGrid;