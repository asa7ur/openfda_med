import { useState } from 'react'
import { TextField, InputAdornment, Box } from '@mui/material'
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
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <LoadingButton
                variant='contained'
                loading={loading}
                onClick={handleSearch}
                sx={{
                  borderRadius: '50%', // Make the button round
                  minWidth: '40px', // Ensure it has a minimum width
                  minHeight: '40px', // Ensure it has a minimum height
                  padding: '8px', // Add some padding
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {loading ? null : <Search />}{' '}
              </LoadingButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}

export default SearchBar
