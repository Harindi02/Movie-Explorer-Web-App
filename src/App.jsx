import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useMemo } from 'react' // Add this import
import { useMovieContext } from './contexts/MovieContext'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import CssBaseline from '@mui/material/CssBaseline'

function App() {
  const { darkMode } = useMovieContext()
  
  // Memoize theme to prevent unnecessary recreations
  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
    },
  }), [darkMode]) // Only recreate when darkMode changes

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App