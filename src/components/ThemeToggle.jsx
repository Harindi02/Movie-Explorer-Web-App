import { IconButton, Tooltip } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useMovieContext } from '../contexts/MovieContext'

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useMovieContext()

  return (
    <Tooltip title={darkMode ? 'Light mode' : 'Dark mode'}>
      <IconButton onClick={toggleDarkMode} color="inherit">
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle