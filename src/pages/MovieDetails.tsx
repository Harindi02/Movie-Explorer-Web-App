 import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Film, Heart, Calendar, Clock, Star, ArrowLeft, AlertTriangle } from 'lucide-react';
import { getMovieDetails, getMovieVideos } from '../utils/api';
import { Movie, Video } from '../types';
import { useMovies } from '../contexts/MovieContext';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useMovies();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isFavorite = id ? favorites.some((fav) => fav.id === parseInt(id)) : false;

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const [movieData, videoData] = await Promise.all([
          getMovieDetails(id),
          getMovieVideos(id)
        ]);
        setMovie(movieData);
        
        // Filter for YouTube trailers and teasers
        const trailers = videoData.filter(
          (video) => video.site === 'YouTube' && 
          (video.type === 'Trailer' || video.type === 'Teaser')
        );
        setVideos(trailers);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!movie) return;
    
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-8 min-h-screen flex justify-center items-start">
        <div className="w-full max-w-4xl animate-pulse">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl mb-8"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-8 min-h-screen">
        <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-lg">
          <AlertTriangle size={48} className="text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Something went wrong
          </h2>
          <p className="text-red-600 dark:text-red-400 mb-6">{error || 'Movie not found'}</p>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-gray-800 dark:text-gray-200 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Get the main trailer if available
  const mainTrailer = videos.find(video => video.type === 'Trailer') || videos[0];

  return (
    <>
      {/* Backdrop Image */}
      {movie.backdrop_path && (
        <div className="fixed top-0 left-0 right-0 h-96 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900"></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-6 px-3 py-1 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200 backdrop-blur-sm transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </button>

        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Movie Poster */}
            <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Film size={64} className="text-gray-400" />
                </div>
              )}
            </div>

            {/* Movie Details */}
            <div className="p-6 md:p-8 md:w-2/3 lg:w-3/4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {movie.release_date && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar size={16} className="mr-1" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                )}
                
                {movie.runtime && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock size={16} className="mr-1" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                
                {movie.vote_average > 0 && (
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} className="mr-1 fill-yellow-400" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                )}
                
                <button
                  onClick={handleFavoriteToggle}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-colors ${
                    isFavorite
                      ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400'
                      : 'border-gray-200 dark:border-gray-700 hover:border-red-200 hover:text-red-600 dark:hover:border-red-800 dark:hover:text-red-400'
                  }`}
                >
                  <Heart size={16} className={isFavorite ? 'fill-red-500' : ''} />
                  <span>{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
                </button>
              </div>
              
              {movie.genres && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {movie.overview || 'No overview available.'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Trailer Section */}
          {mainTrailer && (
            <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Trailer
              </h2>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
                <iframe
                  src={`https://www.youtube.com/embed/${mainTrailer.key}`}
                  title={mainTrailer.name}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          
          {/* More Videos */}
          {videos.length > 1 && (
            <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                More Videos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {videos.slice(1, 4).map((video) => (
                  <div key={video.id} className="rounded-lg overflow-hidden bg-gray-900">
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        className="w-full h-full"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-2 text-sm text-gray-200 truncate">
                      {video.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieDetail;