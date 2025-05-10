import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Chip, 
  Button, 
  Rating,
  Divider,
  Paper,
  CircularProgress,
  IconButton,
  Alert
} from '@mui/material'
import { ArrowBack, Favorite, FavoriteBorder } from '@mui/icons-material'
import { getMovieDetails, getMovieRecommendations, getImageUrl, BACKDROP_SIZE } from '../api/tmdb'
import MovieCard from '../components/MovieCard'
import { useMovies } from '../contexts/MovieContext'
import { useAuth } from '../contexts/AuthContext'

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite } = useMovies()
  const { isAuthenticated } = useAuth()
  
  const [movie, setMovie] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch movie details
        const movieData = await getMovieDetails(id)
        setMovie(movieData)
        
        // Fetch recommendations
        const recommendationsData = await getMovieRecommendations(id)
        setRecommendations(recommendationsData.results.slice(0, 6))
      } catch (err) {
        console.error('Error fetching movie details:', err)
        setError('Failed to load movie details')
      } finally {
        setLoading(false)
      }
    }
    
    fetchMovieData()
  }, [id])
  
  const handleToggleFavorite = () => {
    if (movie) {
      toggleFavorite(movie)
    }
  }
  
  const backdropUrl = movie?.backdrop_path 
    ? getImageUrl(movie.backdrop_path, BACKDROP_SIZE) 
    : null
    
  const posterUrl = movie?.poster_path
    ? getImageUrl(movie.poster_path)
    : '/movie-placeholder.png'
  
  const formatRuntime = (minutes) => {
    if (!minutes) return 'Unknown'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }
  
  const formatMoney = (amount) => {
    if (!amount) return 'Unknown'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }
  
  if (loading) {
    return (
      <Container sx={{ py: 5, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }
  
  if (error) {
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    )
  }
  
  if (!movie) return null
  
  return (
    <Box>
      {/* Backdrop */}
      {backdropUrl && (
        <Box 
          sx={{ 
            height: { xs: '200px', sm: '300px', md: '400px' },
            width: '100%',
            position: 'relative',
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${backdropUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mb: 4
          }}
        >
          <Container sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'flex-end',
            pb: 3
          }}>
            <Typography 
              variant="h3" 
              component="h1" 
              color="white"
              sx={{ 
                fontWeight: 700,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
              }}
            >
              {movie.title}
            </Typography>
            
            {movie.tagline && (
              <Typography 
                variant="h6" 
                color="white" 
                sx={{ 
                  opacity: 0.8,
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' }
                }}
              >
                {movie.tagline}
              </Typography>
            )}
          </Container>
        </Box>
      )}
      
      <Container sx={{ mb: 6 }}>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back to Movies
        </Button>
        
        <Grid container spacing={4}>
          {/* Movie Poster and Info */}
          <Grid item xs={12} sm={4} md={3}>
            <Paper 
              elevation={3}
              sx={{ 
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <Box 
                component="img"
                src={posterUrl}
                alt={movie.title}
                sx={{ 
                  width: '100%',
                  display: 'block'
                }}
              />
              
              {isAuthenticated && (
                <IconButton
                  onClick={handleToggleFavorite}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    }
                  }}
                >
                  {isFavorite(movie.id) ? (
                    <Favorite sx={{ color: '#F44336' }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              )}
            </Paper>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Released:</strong> {movie.release_date || 'Unknown'}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Runtime:</strong> {formatRuntime(movie.runtime)}
              </Typography>
              
              {movie.budget > 0 && (
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Budget:</strong> {formatMoney(movie.budget)}
                </Typography>
              )}
              
              {movie.revenue > 0 && (
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Revenue:</strong> {formatMoney(movie.revenue)}
                </Typography>
              )}
            </Box>
          </Grid>
          
          {/* Details */}
          <Grid item xs={12} sm={8} md={9}>
            {!backdropUrl && (
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                {movie.title}
              </Typography>
            )}
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating 
                value={movie.vote_average / 2} 
                precision={0.5} 
                readOnly
              />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {movie.vote_average.toFixed(1)}/10
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                {movie.vote_count} votes
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              {movie.genres.map(genre => (
                <Chip 
                  key={genre.id} 
                  label={genre.name} 
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
            
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Overview
            </Typography>
            
            <Typography 
              variant="body1" 
              paragraph
              sx={{ lineHeight: 1.7 }}
            >
              {movie.overview || 'No overview available.'}
            </Typography>
            
            {/* Cast Section */}
            {movie.credits?.cast?.length > 0 && (
              <>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ fontWeight: 600, mt: 2 }}
                >
                  Cast
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {movie.credits.cast.slice(0, 8).map(person => (
                    <Chip 
                      key={person.id} 
                      label={person.name} 
                      size="medium"
                    />
                  ))}
                </Box>
              </>
            )}
            
            {/* Recommendations */}
            {recommendations.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  You Might Also Like
                </Typography>
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {recommendations.map(movie => (
                    <Grid item xs={6} sm={4} md={2} key={movie.id}>
                      <MovieCard movie={movie} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default MovieDetails