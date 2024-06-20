import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Producto from './pages/Product'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/producto' element={<Producto />} />
      </Routes>
    </Router>
  )
}
export default App
