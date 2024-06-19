import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'

const Search = () => {
  const [results, setResults] = useState([])
  return (
    <>
      <SearchBar setResults={setResults} />
      <ResultsList results={results} />
    </>
  )
}
export default Search
