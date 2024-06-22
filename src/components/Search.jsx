import { useState, useEffect, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'

const Search = () => {
  const [results, setResults] = useState([])
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
    setResults([])
    setNotFound(false)
    setShowResults(false)
  }

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <SearchBar
        setResults={setResults}
        onSearch={handleSearchComplete}
        setNotFound={setNotFound}
        onNewSearch={handleNewSearch}
      />
      <Box
        ref={boxRef}
        sx={{
          backgroundColor: 'white',
          position: 'absolute',
          width: '100%',
          maxHeight: '220px',
          borderRadius: '0px 0px 5px 5px',
          overflow: 'auto',
          visibility: showResults ? 'visible' : 'hidden',
          opacity: showResults ? 1 : 0,
          boxShadow: showResults ? '0px 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
          transition: 'opacity 0.3s ease-in-out',
          zIndex: 99,
        }}
      >
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
            onResultClick={() => setShowResults(false)}
          />
        )}
      </Box>
    </Box>
  )
}

export default Search
