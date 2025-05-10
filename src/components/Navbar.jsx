 import { useState } from 'react'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Box,
  Container,
  useMediaQuery
} from '@mui/material'
import { 
  Menu as MenuIcon, 
  DarkMode, 
  LightMode, 
  Home, 
  Favorite, 
  Movie, 
  Login, 
  Logout 
} from '@mui/icons-material'
import SearchBar from './SearchBar'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const { theme, mode, toggleTheme } = useTheme()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleClose()
    navigate('/')
  }

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 1,
        transition: 'background-color 0.3s, color 0.3s'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', padding: { xs: '0.5rem 0', sm: '0.75rem 0' } }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Movie fontSize="large" color="primary" />
            Movie Explorer
          </Typography>
          
          <Box sx={{ flexGrow: 1, mx: { xs: 1, sm: 3 } }}>
            {location.pathname === '/' && <SearchBar />}
          </Box>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/"
                startIcon={<Home />}
              >
                Home
              </Button>
              
              {isAuthenticated && (
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/favorites"
                  startIcon={<Favorite />}
                >
                  Favorites
                </Button>
              )}
              
              <IconButton onClick={toggleTheme} color="inherit">
                {mode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
              
              {isAuthenticated ? (
                <>
                  <IconButton
                    onClick={handleMenu}
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    <Avatar
                      sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: theme.palette.primary.main
                      }}
                    >
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/login"
                  startIcon={<Login />}
                >
                  Login
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem component={RouterLink} to="/">
              <ListItemIcon>
                <Home color="primary" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            
            {isAuthenticated && (
              <ListItem component={RouterLink} to="/favorites">
                <ListItemIcon>
                  <Favorite color="primary" />
                </ListItemIcon>
                <ListItemText primary="Favorites" />
              </ListItem>
            )}
            
            <ListItem button onClick={toggleTheme}>
              <ListItemIcon>
                {mode === 'dark' ? <LightMode color="primary" /> : <DarkMode color="primary" />}
              </ListItemIcon>
              <ListItemText primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} />
            </ListItem>
            
            {isAuthenticated ? (
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <Logout color="primary" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <ListItem component={RouterLink} to="/login">
                <ListItemIcon>
                  <Login color="primary" />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default Navbar