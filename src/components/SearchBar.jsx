import { useState, useEffect, useRef } from 'react'
import { 
  InputBase, 
  Paper, 
  IconButton, 
  Box,
  CircularProgress
} from '@mui/material'
import { Search, Clear } from '@mui/icons-material'
import { useTheme } from '../contexts/ThemeContext'
import { useMovies } from '../contexts/MovieContext'

const SearchBar = () => {
  const { theme } = useTheme()
  const { searchQuery, setSearchQuery, loading } = useMovies()
  const [inputValue, setInputValue] = useState(searchQuery)
  const inputRef = useRef(null)

  // Synchronize local state with context
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchQuery(inputValue.trim())
  }

  const handleClear = () => {
    setInputValue('')
    setSearchQuery('')
    inputRef.current?.focus()
  }

  // Update search query with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue.trim())
    }, 500)

    return () => clearTimeout(timer)
  }, [inputValue, setSearchQuery])

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        px: 2,
        py: 0.5,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[3]
        },
        '&:focus-within': {
          boxShadow: theme.shadows[4]
        }
      }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="search">
        <Search />
      </IconButton>
      
      <InputBase
        inputRef={inputRef}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for movies..."
        value={inputValue}
        onChange={handleInputChange}
        inputProps={{ 'aria-label': 'search movies' }}
        autoComplete="off"
      />

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {loading && <CircularProgress size={24} sx={{ mr: 1 }} />}
        
        {inputValue && (
          <IconButton 
            sx={{ p: '10px' }} 
            aria-label="clear" 
            onClick={handleClear}
          >
            <Clear />
          </IconButton>
        )}
      </Box>
    </Paper>
  )
}

export default SearchBar