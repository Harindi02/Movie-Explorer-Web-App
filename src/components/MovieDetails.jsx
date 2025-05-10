import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Box, Typography, Paper, Chip, IconButton, Divider, CircularProgress } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useMovieContext } from '../contexts/MovieContext'
import { useNavigate } from 'react-router-dom'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useMovieContext()
  const [movie, setMovie] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isFavorite = favorites.some((fav) => fav.id === Number(id))

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        const [movieRes, videosRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`),
        ])
        
        setMovie(movieRes.data)
        const trailer = videosRes.data.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        )
        setTrailer(trailer?.key)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  if (loading) return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
  if (error) return <Typography color="error">{error}</Typography>
  if (!movie) return <Typography>Movie not found</Typography>

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 3 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        <ArrowBackIcon /> Back
      </IconButton>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/no-poster.jpg'
              }
              alt={movie.title}
              sx={{ width: '100%', borderRadius: '8px' }}
            />
          </Box>

          <Box sx={{ flex: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </Typography>
              <IconButton onClick={() => toggleFavorite(movie)} size="large">
                <FavoriteIcon color={isFavorite ? 'error' : 'action'} fontSize="large" />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={`${movie.vote_average.toFixed(1)}/10`} color="primary" />
              {movie.genres.map((genre) => (
                <Chip key={genre.id} label={genre.name} variant="outlined" />
              ))}
              <Chip label={`${movie.runtime} min`} variant="outlined" />
            </Box>

            <Typography variant="body1" paragraph>
              {movie.overview}
            </Typography>

            {trailer && (
              <>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Trailer
                </Typography>
                <Box
                  component="iframe"
                  src={`https://www.youtube.com/embed/${trailer}`}
                  width="100%"
                  height="400"
                  sx={{ border: 'none', borderRadius: '8px' }}
                  allowFullScreen
                />
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default MovieDetails