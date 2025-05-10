import { Container, Typography, Box, Grid, Button, Alert } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { useMovies } from '../contexts/MovieContext'
import { useTheme } from '../contexts/ThemeContext'

const Favorites = () => {
  const { favorites } = useMovies()
  const { theme } = useTheme()
  const navigate = useNavigate()
  
  return (
    <Container sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        Back to Home
      </Button>
      
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        My Favorites
      </Typography>
      
      {favorites.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          py: 8
        }}>
          <Alert 
            severity="info" 
            sx={{ mb: 3, width: '100%', maxWidth: 500 }}
          >
            You haven't added any movies to your favorites yet.
          </Alert>
          
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/')}
          >
            Explore Movies
          </Button>
        </Box>
      ) : (
        <div className="movie-grid">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </Container>
  )
}

export default Favorites