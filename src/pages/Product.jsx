import { useLocation } from 'react-router-dom'
import ResultDetail from '../components/ResultDetail'
import Search from '../components/Search'

const Product = () => {
  const location = useLocation()
  const { result } = location.state

  return (
    <div>
      <Search/>
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
