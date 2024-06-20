import { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material'
import { searchDrugs } from '../api/openFDA'

const SearchBar = ({ setResults, onSearch, setNotFound, onNewSearch }) => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    onNewSearch()
    try {
      const results = await searchDrugs(query)
      setResults(results)
      if (results.length === 0) {
        setNotFound(true)
      } else {
        setNotFound(false)
      }
      if (onSearch) {
        onSearch()
      }
    } catch (error) {
      console.error('Error fetching data from OpenFDA', error)
      setResults([])
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        label='Buscar medicamento'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        variant='filled'
        margin='normal'
        sx={{ marginRight: '1rem' }}
      />
      <Button variant='contained' color='primary' onClick={handleSearch}>
        Buscar
      </Button>
      {loading && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <CircularProgress />
          <Typography variant='body1' sx={{ marginTop: '1rem' }}>
            Buscando...
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default SearchBar
