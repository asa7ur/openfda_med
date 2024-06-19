import { useState } from 'react'
import SearchBar from '../components/SearchBar'

const Search = () => {
  const [results, setResults] = useState([])
  return (
    <>
      <SearchBar setResults={setResults} />
    </>
  )
}
export default Search
