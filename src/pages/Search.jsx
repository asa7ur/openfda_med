import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'
import ResultDetail from '../components/ResultDetail'

const Search = () => {
  const [results, setResults] = useState([])
  const [selectedResult, setSelectedResult] = useState(null)

  const handleSearch = () => {
    setSelectedResult(null)
  }

  return (
    <>
      <SearchBar setResults={setResults} onSearch={handleSearch} />
      {!selectedResult ? (
        <ResultsList results={results} setSelectedResult={setSelectedResult} />
      ) : (
        <ResultDetail
          result={selectedResult}
          setSelectedResult={setSelectedResult}
        />
      )}
    </>
  )
}
export default Search
