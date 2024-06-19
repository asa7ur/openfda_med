import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'
import { searchDrugs } from '../api/openFDA'

const SearchBar = ({ setResults }) => {
  const [query, setQuery] = useState('')

  const handleSearch = async () => {
    const results = await searchDrugs(query)
    setResults(results)
  }

  return (
    <Box sx={{padding: '2rem 10rem'}} >
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
