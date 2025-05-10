import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Avatar,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { 
  LockOutlined, 
  Visibility, 
  VisibilityOff,
  Movie
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the redirect path if available
  const from = location.state?.from || '/'
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }
  
  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }
  
  const validate = () => {
    const newErrors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validate()) {
      // In a real app, this would validate with a backend
      // For demo purposes, just log in with whatever is entered
      login({
        username: formData.username,
        // Don't include password in the stored user object
      })
      
      // Show success message and redirect
      setShowAlert(true)
      setTimeout(() => {
        navigate(from)
      }, 1500)
    }
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlined />
        </Avatar>
        
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Sign in to Movie Explorer
        </Typography>
        
        {showAlert && (
          <Alert 
            severity="success" 
            sx={{ width: '100%', mb: 2 }}
          >
            Login successful! Redirecting...
          </Alert>
        )}
        
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Sign In
          </Button>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ mt: 2 }}
          >
            This is a demo login. Enter any username and password.
          </Typography>
        </Box>
      </Paper>
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Movie color="primary" sx={{ fontSize: 40 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Movie Explorer - Discover your next favorite film
        </Typography>
      </Box>
    </Container>
  )
}

export default Login