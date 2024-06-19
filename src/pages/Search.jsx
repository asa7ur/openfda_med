import { useState } from 'react'
import { Box } from '@mui/material'
import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'
import ResultDetail from '../components/ResultDetail'
import image from '../assets/medicine.svg'

const Search = () => {
  const [results, setResults] = useState([])
  const [selectedResult, setSelectedResult] = useState(null)
  const [showImage, setShowImage] = useState(true)

  const handleSearch = () => {
    setSelectedResult(null)
    setShowImage(false)
  }

  return (
    <>
      <SearchBar setResults={setResults} onSearch={handleSearch} />
      {showImage && (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
        >
          <img src={image} alt='Doctors' style={{ width: '500px' }} />
        </Box>
      )}
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
