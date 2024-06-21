import { useLocation } from 'react-router-dom'
import ResultDetail from '../components/ResultDetail'
import SearchBar from '../components/SearchBar'

const Product = () => {
  const location = useLocation()
  const { result } = location.state

  return (
    <div>
      <SearchBar/>
      {result ? (
        <ResultDetail result={result}/>
      ) : (
        <Typography variant='h6' color='error'>
          No se ha encontrado el producto.
        </Typography>
      )}
    </div>
  )
}

export default Product
