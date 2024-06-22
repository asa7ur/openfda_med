import React, { useState, useEffect } from 'react'
import { Stack, Box, Typography, Fade } from '@mui/material'
import image from '../assets/doctors.svg'
import Search from '../components/Search'

const Home = () => {
  const [showText, setShowText] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

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
        padding='10rem 0'
        direction='row'
        alignItems='center'
        justifyContent='space-around'
      >
        <Box sx={{ width: '600px', position: 'relative', marginTop: '-5rem' }}>
          <Fade in={showText} timeout={1000}>
            <div>
              <Typography variant='h1'>Buscador</Typography>
              <Typography variant='h5'>
                Busca información sobre medicamentos y sus efectos secundarios
              </Typography>
            </div>
          </Fade>
          <Fade in={showSearch} timeout={1000}>
            <div>
              <Search />
            </div>
          </Fade>
        </Box>
        <Box>
          <Fade in={showText} timeout={1000}>
            <img src={image} alt='Doctors' width='400px' />
          </Fade>
        </Box>
      </Stack>
    </>
  )
}

export default Home
