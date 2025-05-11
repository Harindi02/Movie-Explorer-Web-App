import { useMovies } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';
import MovieGrid from '../components/MovieGrid';
import { Heart, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites } = useMovies();
  const { isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <div className="flex items-center mb-6">
        <Heart size={28} className="mr-3 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Your Favorites
        </h1>
      </div>

      {!isAuthenticated ? (
        <div className="mt-8 text-center p-12 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
          <LogIn size={48} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Login to Save Your Favorites
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Create an account or login to save your favorite movies and access them from any device.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
          >
            <LogIn size={18} className="mr-2" />
            Login Now
          </Link>
        </div>
      ) : favorites.length === 0 ? (
        <div className="mt-8 text-center p-12 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
          <Heart size={48} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            No favorites yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Start exploring movies and click the heart icon to add them to your favorites list.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Explore Movies
          </Link>
        </div>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  );
};

export default Favorites;