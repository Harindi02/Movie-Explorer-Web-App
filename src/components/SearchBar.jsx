import { TextField, InputAdornment, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useMovieContext } from '../contexts/MovieContext'

const SearchBar = () => {
  const { searchMovies } = useMovieContext()

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        fullWidth
        placeholder="Search for movies..."
        onChange={(e) => searchMovies(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
            backgroundColor: 'background.paper',
          },
        }}
      />
    </Box>
  )
}

export default SearchBar