import { createContext, useContext, useState, useEffect } from 'react'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  // Check local storage for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light'
  const [mode, setMode] = useState(savedTheme)

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('theme', newMode)
  }

  // Create theme based on current mode
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#2196F3',
        light: '#64B5F6',
        dark: '#1976D2',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#F44336', 
        light: '#FF7961',
        dark: '#BA000D',
        contrastText: '#FFFFFF',
      },
      background: {
        default: mode === 'light' ? '#F5F5F5' : '#121212',
        paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
      },
      text: {
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h1: {
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h3: {
        fontWeight: 500,
        lineHeight: 1.2,
      },
      h4: {
        fontWeight: 500,
        lineHeight: 1.3,
      },
      body1: {
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: mode === 'light' 
                ? '0 10px 20px rgba(0,0,0,0.1)' 
                : '0 10px 20px rgba(0,0,0,0.5)',
            },
          },
        },
      },
    },
  })

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}