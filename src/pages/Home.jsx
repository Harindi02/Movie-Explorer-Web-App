import { useEffect } from 'react'
import { Grid, Typography, Box, CircularProgress, Alert } from '@mui/material'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import ThemeToggle from '../components/ThemeToggle'
import { useMovieContext } from '../contexts/MovieContext'

const Home = () => {
  const { movies, trending, fetchTrending, isLoading, error } = useMovieContext()

  useEffect(() => {
    fetchTrending()
  }, [fetchTrending])

  const displayMovies = movies.length > 0 ? movies : trending

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <ThemeToggle />
      </Box>
      
      <SearchBar />
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {isLoading ? (
        <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            {movies.length > 0 ? 'Search Results' : 'Trending Movies'}
          </Typography>
          
          <Grid container spacing={3}>
            {displayMovies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  )
}

export default Home