import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'
import ResultDetail from '../components/ResultDetail'
import image from '../assets/medicine.svg'

const Search = () => {
  const [results, setResults] = useState([])
  const [selectedResult, setSelectedResult] = useState(null)
  const [searching, setSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const handleSearchComplete = () => {
    setSearching(false)
  }
  return (
    <>
      <SearchBar
        setResults={setResults}
        onSearch={handleSearchComplete}
        setNotFound={setNotFound}
      />
      {!searching && results.length === 0 && !notFound && (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
        >
          <img src={image} alt='medicine' style={{ maxWidth: '400px' }} />
        </Box>
      )}
      {!searching && notFound && (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
        >
          
        <Typography variant='h6' color='error' sx={{ marginTop: '2rem' }}>
          No se ha podido encontrar ningún medicamento
        </Typography>
        </Box>
      )}
      {!selectedResult && results.length > 0 ? (
        <ResultsList results={results} setSelectedResult={setSelectedResult} />
      ) : (
        selectedResult && (
          <ResultDetail
            result={selectedResult}
            setSelectedResult={setSelectedResult}
          />
        )
      )}
    </>
  )
}
export default Search
