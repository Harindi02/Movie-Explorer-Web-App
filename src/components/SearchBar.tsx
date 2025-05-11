 import { useState, useEffect, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Search, X } from 'lucide-react';
import { useMovies } from '../contexts/MovieContext';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const { searchQuery, setSearchQuery, searchMoviesAction, searchResults, loading } = useMovies();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(event.target as Node) && 
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery) {
        searchMoviesAction(localQuery);
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, searchMoviesAction]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchQuery(localQuery);
      navigate(`/search?q=${encodeURIComponent(localQuery)}`);
      setShowResults(false);
      if (onClose) onClose();
    }
  };

  const handleResultClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
    setShowResults(false);
    if (onClose) onClose();
  };

  const clearSearch = () => {
    setLocalQuery('');
    setSearchQuery('');
    setShowResults(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onFocus={() => localQuery && setShowResults(true)}
            placeholder="Search for movies..."
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {localQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute z-50 mt-1 w-full max-h-96 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          {loading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Loading results...
            </div>
          ) : (
            <ul>
              {searchResults.slice(0, 6).map((movie) => (
                <li key={movie.id}>
                  <button
                    onClick={() => handleResultClick(movie.id)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <div className="w-12 h-16 flex-shrink-0 overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                          <Film size={20} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {movie.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown year'}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
              <li className="border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    navigate(`/search?q=${encodeURIComponent(localQuery)}`);
                    setShowResults(false);
                    if (onClose) onClose();
                  }}
                  className="w-full text-center p-3 font-medium text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  View all results
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;