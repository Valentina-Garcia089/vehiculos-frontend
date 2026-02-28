import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Inventory from './pages/Inventory'
import Inquiries from './pages/Inquiries'
import Catalog from './pages/Catalog';
import Profile from './pages/Profile';
import UserInquiries from './pages/UserInquiries';

function App() {
  const location = useLocation();

  const hideNavbarPaths = ["/login", "/register"];

  return (
    <>
      {/* solo si la ruta no se encuentra en hideNavbarPaths se mostrará el navbar en ellas */}
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inquiries" element={<Inquiries />} />
          <Route path="/my-inquiries" element={<UserInquiries />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  )
}

export default App
