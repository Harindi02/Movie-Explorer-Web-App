import { Container, Typography, Button, Box } from '@mui/material'
import { Home, Movie } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container 
      sx={{ 
        py: 10, 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 150px)'
      }}
    >
      <Movie sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
      
      <Typography 
        variant="h2" 
        component="h1"
        sx={{ 
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }
        }}
      >
        404
      </Typography>
      
      <Typography 
        variant="h4"
        sx={{ 
          mb: 2,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
        }}
      >
        Page Not Found
      </Typography>
      
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ 
          maxWidth: 600,
          mb: 4
        }}
      >
        The page you're looking for doesn't exist or has been moved.
        Let's get you back to exploring movies!
      </Typography>
      
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        size="large"
        startIcon={<Home />}
      >
        Go Home
      </Button>
    </Container>
  )
}

export default NotFound