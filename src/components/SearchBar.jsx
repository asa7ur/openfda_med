import { useState } from 'react'
import { TextField, InputAdornment, Box, Snackbar, Alert } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Search } from '@mui/icons-material'
import { searchDrugs } from '../api/openFDA'

const SearchBar = ({ setResults, onSearch, setNotFound, onNewSearch }) => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) {
      setOpenSnackbar(true)
      return
    }

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        label='Buscar medicamento'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
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
                  borderRadius: '50%',
                  minWidth: '40px',
                  minHeight: '40px',
                  padding: '8px',
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='warning'
          sx={{ width: '100%' }}
        >
          Por favor, ingrese un nombre de medicamento.
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default SearchBar
