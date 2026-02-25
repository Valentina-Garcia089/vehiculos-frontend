import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Inventory from './pages/Inventory'

function App() {

  return (
    // posibles paginas
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/inventory" element={<Inventory />} />
    </Routes>
  )
}

export default App
