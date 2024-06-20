import { useState, useEffect, useRef } from 'react'
import { Stack, Box, Typography, CircularProgress } from '@mui/material'
import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'
import image from '../assets/doctors.svg'

const HomePage = () => {
  const [results, setResults] = useState([])
  const [selectedResult, setSelectedResult] = useState(null)
  const [searching, setSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const boxRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchComplete = () => {
    setSearching(false)
    setShowResults(true)
  }

  const handleNewSearch = () => {
    setSelectedResult(null)
    setResults([])
    setNotFound(false)
    setShowResults(false)
  }

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
          <SearchBar
            setResults={setResults}
            onSearch={handleSearchComplete}
            setNotFound={setNotFound}
            onNewSearch={handleNewSearch}
          />
          <Box
            ref={boxRef}
            sx={{
              position: 'absolute',
              width: '600px',
              maxHeight: '200px',
              overflow: 'auto',
              opacity: showResults ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
              backgroundColor: 'white',
              visibility: showResults ? 'visible' : 'hidden',
              zIndex: 10, // Asegura que la caja esté por encima del resto del contenido
            }}
          >
            {searching && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <CircularProgress />
                <Typography variant='body1' sx={{ marginTop: '1rem' }}>
                  Buscando...
                </Typography>
              </Box>
            )}
            {!searching && notFound && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '1rem',
                }}
              >
                <Typography variant='h6' color='error'>
                  No se ha podido encontrar ningún medicamento
                </Typography>
              </Box>
            )}
            {!searching && !notFound && results.length > 0 && (
              <ResultsList
                results={results}
                setSelectedResult={setSelectedResult}
              />
            )}
          </Box>
        </Box>
        <Box>
          <img src={image} alt='Doctors' width='400px' />
        </Box>
      </Stack>
    </>
  )
}

export default HomePage
