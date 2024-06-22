import { Stack, Box, Typography } from '@mui/material'
import image from '../assets/doctors.svg'
import Search from '../components/Search'

const Home = () => {
  return (
    <>
      <Stack
        padding='10rem 0'
        direction='row'
        alignItems='center'
        justifyContent='space-around'
      >
        <Box sx={{ width: '600px', position: 'relative', marginTop: '-5rem' }}>
          <Typography variant='h1'>Buscador</Typography>
          <Typography variant='h5'>
            Busca información sobre medicamentos y sus efectos secundarios
          </Typography>
          <Search />
        </Box>
        <Box>
          <img src={image} alt='Doctors' width='400px' />
        </Box>
      </Stack>
    </>
  )
}

export default Home
