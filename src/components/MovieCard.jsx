import { Card, CardMedia, CardContent, Typography, IconButton, Chip, Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useMovieContext } from '../contexts/MovieContext'

const MovieCard = ({ movie }) => {
  const { favorites, toggleFavorite } = useMovieContext()
  const isFavorite = favorites.some((fav) => fav.id === movie.id)

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="340"
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/no-poster.jpg'
        }
        alt={movie.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3">
          {movie.title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {movie.release_date?.split('-')[0] || 'N/A'}
          </Typography>
          <Chip
            label={`${movie.vote_average?.toFixed(1) || 'N/A'}/10`}
            size="small"
            color="primary"
          />
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
          {movie.overview?.length > 100
            ? `${movie.overview.substring(0, 100)}...`
            : movie.overview || 'No overview available.'}
        </Typography>
        <IconButton
          aria-label="add to favorites"
          onClick={() => toggleFavorite(movie)}
          sx={{ ml: 'auto', display: 'block' }}
        >
          <FavoriteIcon color={isFavorite ? 'error' : 'action'} />
        </IconButton>
      </CardContent>
    </Card>
  )
}

export default MovieCard