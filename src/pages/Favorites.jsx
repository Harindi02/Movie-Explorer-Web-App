import { Grid, Typography, Box, CircularProgress, Alert } from '@mui/material'
import MovieCard from '../components/MovieCard'
import { useMovieContext } from '../contexts/MovieContext'

const Favorites = () => {
  const { favorites } = useMovieContext()

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Movies
      </Typography>
      
      {favorites.length === 0 ? (
        <Alert severity="info">You haven't added any favorites yet.</Alert>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default Favorites