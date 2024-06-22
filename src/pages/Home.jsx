import React, { useState, useEffect } from 'react'
import {
  Stack,
  Box,
  Typography,
  Fade,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import image from '../assets/doctors.svg'
import Search from '../components/Search'

const Home = () => {
  const [showText, setShowText] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    setShowText(true)
    const timer = setTimeout(() => {
      setShowSearch(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Stack
        padding={{ xs: '5rem 0', md: '10rem 0' }}
        direction={{ xs: 'column', md: 'row' }}
        alignItems='center'
        justifyContent={{ xs: 'center', md: 'space-between' }}
        spacing={4}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '600px' },
            position: 'relative',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Fade in={showText} timeout={1000}>
            <div>
              <Typography
                variant='h1'
                sx={{ fontSize: { xs: '2rem', md: '4rem' } }}
              >
                Buscador <strong>openFDA</strong>
              </Typography>
              <Typography
                variant='h5'
                sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}
              >
                Busca información sobre medicamentos y sus efectos secundarios
              </Typography>
            </div>
          </Fade>
          <Fade in={showSearch} timeout={1000}>
            <div>
              <Search />
            </div>
          </Fade>
          {isSmallScreen && (
            <Fade in={showSearch} timeout={1000}>
              <Box mt={4}>
                <img src={image} alt='Doctors' width='300px' />
              </Box>
            </Fade>
          )}
        </Box>
        {!isSmallScreen && (
          <Box>
            <Fade in={showText} timeout={1000}>
              <img src={image} alt='Doctors' width='400px' />
            </Fade>
          </Box>
        )}
      </Stack>
    </>
  )
}

export default Home
