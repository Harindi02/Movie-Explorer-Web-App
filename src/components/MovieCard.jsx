 import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  IconButton, 
  Chip,
  Rating,
  Skeleton,
  CardActionArea 
} from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { getImageUrl } from '../api/tmdb'
import { useMovies } from '../contexts/MovieContext'
import { useAuth } from '../contexts/AuthContext'

const MovieCard = ({ movie }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { toggleFavorite, isFavorite } = useMovies()
  const { isAuthenticated } = useAuth()
  
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'Unknown'
    
  const rating = movie.vote_average / 2 // Convert from 10-point to 5-point scale

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(movie)
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardActionArea 
        component={RouterLink} 
        to={`/movie/${movie.id}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Box sx={{ position: 'relative', paddingTop: '150%' }}>
          {!imageLoaded && (
            <Skeleton 
              variant="rectangular" 
              animation="wave"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.11)',
              }}
            />
          )}
          
          <CardMedia
            component="img"
            image={getImageUrl(movie.poster_path) || '/movie-placeholder.png'}
            alt={movie.title}
            onLoad={() => setImageLoaded(true)}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: imageLoaded ? 'block' : 'none',
            }}
          />
          
          {isAuthenticated && (
            <IconButton
              aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
              onClick={handleFavoriteClick}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
            >
              {isFavorite(movie.id) ? (
                <Favorite sx={{ color: '#F44336' }} />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>
          )}

          <Chip 
            label={releaseYear} 
            size="small"
            sx={{
              position: 'absolute',
              left: 8,
              top: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
            }}
          />
        </Box>
        
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography 
            variant="h6" 
            component="div" 
            noWrap 
            sx={{ 
              mb: 1, 
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: 1.2
            }}
          >
            {movie.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating 
              value={rating} 
              precision={0.5} 
              readOnly 
              size="small" 
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {movie.vote_average.toFixed(1)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default MovieCard