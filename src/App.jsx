import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CssBaseline, Box } from '@mui/material'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'


import NotFound from './pages/NotFound'
import { useTheme } from './contexts/ThemeContext'
import { useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { theme } = useTheme()
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default,
      color: theme.palette.text.primary,
      minHeight: '100vh',
      transition: 'background-color 0.3s ease'
    }}>
      <CssBaseline />
      <Navbar />
      
      <Box component="main" sx={{ pt: { xs: 7, sm: 8 } }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App