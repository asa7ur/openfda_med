import { useState } from 'react'
import { TextField, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Search } from '@mui/icons-material'
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
      <LoadingButton
        variant='contained'
        loading={loading}
        loadingPosition='start'
        startIcon={<Search />}
        color='primary'
        size='large'
        onClick={handleSearch}
      >
        Buscar
      </LoadingButton>
    </Box>
  )
}

export default SearchBar
