import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'
import { searchDrugs } from '../api/openFDA'

const SearchBar = ({ setResults, onSearch }) => {
  const [query, setQuery] = useState('')

  const handleSearch = async () => {
    const results = await searchDrugs(query)
    setResults(results)
    if (onSearch) {
      onSearch()
    }
  }

  return (
    <Box sx={{paddingTop: '2rem'}} >
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
    </Box>
  )
}

export default SearchBar
