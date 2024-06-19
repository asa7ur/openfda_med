import { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material'
import { searchDrugs } from '../api/openFDA'

const SearchBar = ({ setResults, onSearch }) => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    const results = await searchDrugs(query)
    setResults(results)
    setLoading(false)
    if (onSearch) {
      onSearch()
    }
  }

  return (
    <Box sx={{ paddingTop: '2rem' }}>
      <TextField
        label='Buscar medicamento'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        variant='filled'
        margin='normal'
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
