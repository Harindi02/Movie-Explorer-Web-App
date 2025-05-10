import { useState } from 'react'
import { 
  Box, 
  Typography, 
  IconButton,
  Dialog,
  DialogContent 
} from '@mui/material'
import { PlayArrow, Close } from '@mui/icons-material'

const MovieTrailer = ({ video }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (!video) return null

  return (
    <>
      <Box 
        onClick={handleOpen}
        sx={{ 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          my: 2
        }}
      >
        <IconButton 
          color="primary" 
          sx={{ 
            bgcolor: 'rgba(33, 150, 243, 0.1)',
            '&:hover': {
              bgcolor: 'rgba(33, 150, 243, 0.2)',
            }
          }}
        >
          <PlayArrow />
        </IconButton>
        <Typography variant="subtitle1">
          Watch Trailer
        </Typography>
      </Box>

      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 1,
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.9)',
              }
            }}
          >
            <Close />
          </IconButton>
          
          <DialogContent sx={{ p: 0 }}>
            <Box sx={{ pt: '56.25%', position: 'relative' }}>
              <iframe
                title={video.name}
                src={`https://www.youtube.com/embed/${video.key}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
              ></iframe>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  )
}

export default MovieTrailer