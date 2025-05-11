import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Film, Star } from 'lucide-react';
import { Movie } from '../types';
import { useMovies } from '../contexts/MovieContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useMovies();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : '';

  return (
    <div className="group relative">
      <Link 
        to={`/movie/${movie.id}`}
        className="block transition-transform duration-300 transform group-hover:scale-105"
      >
        <div className="overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800">
          {/* Movie Poster */}
          <div className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-700">
            {!imageError && movie.poster_path ? (
              <>
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse w-16 h-16 text-gray-400">
                      <Film size={32} />
                    </div>
                  </div>
                )}
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <Film size={48} className="text-gray-400 mb-2" />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  {movie.title}
                </p>
              </div>
            )}
            
            {/* Rating Badge */}
            {movie.vote_average > 0 && (
              <div className="absolute top-2 left-2 flex items-center bg-black/70 text-yellow-400 text-sm font-bold px-2 py-1 rounded-md">
                <Star size={14} className="mr-1 fill-yellow-400" />
                {movie.vote_average.toFixed(1)}
              </div>
            )}
            
            {/* Favorite Button */}
            <button
              onClick={handleFavoriteToggle}
              className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm bg-black/30 transition-colors ${
                isFavorite ? 'text-red-500' : 'text-white hover:text-red-500'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={16} className={isFavorite ? 'fill-red-500' : ''} />
            </button>
          </div>
          
          {/* Movie Info */}
          <div className="p-3">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {movie.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {releaseYear}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;