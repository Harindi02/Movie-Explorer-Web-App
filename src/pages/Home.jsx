import { Container, Typography, Box, Button, CircularProgress, Alert } from '@mui/material'
import MovieCard from '../components/MovieCard'
import { useMovies } from '../contexts/MovieContext'

const Home = () => {
  const { 
    movies, 
    searchResults, 
    searchQuery, 
    loading, 
    error, 
    loadMoreMovies,
    hasMorePages
  } = useMovies()

  // Choose which array of movies to display
  const displayMovies = searchQuery ? searchResults : movies
  
  return (
    <Container>
      <Box sx={{ pt: 3, pb: 2 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {searchQuery ? 'Search Results' : 'Popular Movies'}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {displayMovies.length === 0 && !loading ? (
          <Box sx={{ py: 5, textAlign: 'center' }}>
            <Typography variant="h6">
              {searchQuery 
                ? `No results found for "${searchQuery}"`
                : 'No movies available'
              }
            </Typography>
          </Box>
        ) : (
          <>
            <div className="movie-grid">
              {displayMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            
            {hasMorePages && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={loadMoreMovies}
                  disabled={loading}
                  sx={{ px: 4, py: 1 }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Load More'
                  )}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  )
}

export default Home