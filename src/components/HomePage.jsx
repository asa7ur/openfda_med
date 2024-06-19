import { Stack, Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import image from '../assets/doctors.svg'

const HomePage = () => {
  return (
    <>
      <Stack
        direction='row'
        padding='10rem'
        alignItems='center'
        justifyContent='space-around'
      >
        <Box width='600px'>
          <Typography variant='h1'>Buscador</Typography>
          <Typography variant='h5' marginBottom='20px'>
            Busca información sobre medicaméntos y sus efectos secundarios
          </Typography>
          <Link to='/search'>
            <Button variant='contained' size='large'>
              Buscar
            </Button>
          </Link>
        </Box>
        <Box>
          <img src={image} width='400px' />
        </Box>
      </Stack>
    </>
  )
}
export default HomePage
