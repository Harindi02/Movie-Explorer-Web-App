import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { useMovies } from '../contexts/MovieContext';
import MovieGrid from '../components/MovieGrid';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  
  const { searchMoviesAction, searchResults, loading, error, setSearchQuery } = useMovies();

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      searchMoviesAction(query);
    }
  }, [query, searchMoviesAction, setSearchQuery]);

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Search size={24} className="mr-3 text-blue-600 dark:text-blue-500" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Search Results
          </h1>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </button>
      </div>

      <div className="mb-8">
        <div className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full">
          <span className="font-medium">
            {query ? `Results for: "${query}"` : 'No search query provided'}
          </span>
          {!loading && searchResults.length > 0 && (
            <span className="ml-2 text-gray-500 dark:text-gray-400">
              ({searchResults.length} {searchResults.length === 1 ? 'result' : 'results'})
            </span>
          )}
        </div>
      </div>

      {query ? (
        <MovieGrid
          movies={searchResults}
          loading={loading}
          error={error}
          emptyMessage={`No results found for "${query}". Try a different search term.`}
        />
      ) : (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            Please enter a search term to find movies.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;