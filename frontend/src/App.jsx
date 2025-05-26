import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

// MUI components
import NavBar from './components/NavBar/NavBar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Box from '@mui/material/Box'

// Route
import DangNhap from './pages/UserPages/DangNhap.jsx'
import DangKy from './pages/UserPages/DangKy.jsx'
import TrangChu from './pages/UserPages/TrangChu.jsx'
import CCNgoaiNgu from './pages/UserPages/CCNgoaiNgu.jsx'
import CCTinHoc from './pages/UserPages/CCTinHoc.jsx'
import DotThi from './pages/UserPages/DotThi.jsx'
import LichKhaiGiang from './pages/UserPages/LichKhaiGiang.jsx'
import DKOn from './pages/UserPages/DKOn.jsx'
import DKThi from './pages/UserPages/DKThi.jsx'
import KetQua from './pages/UserPages/KetQua.jsx'
import KTChungChi from './pages/UserPages/KTChungChi.jsx'

// Admin zone
import Admin from './pages/adminPages/Admin.jsx'
import ThemChungChi from './pages/adminPages/ThemChungChi.jsx'

// Extend
import PrivateRoute from './components/Auth/PrivateRoute.jsx'
import RoleAuth from './components/Auth/RoleAuth.jsx'

function Layout() {
  const location = useLocation() 
  const isAuthPage = location.pathname === '/' || location.pathname === '/dang-ky' || location.pathname === '/dang-nhap' 

  return (
    <Box>
      {!isAuthPage && <NavBar />}
      
      <Box>
        <Routes>
          <Route path='/' element={<DangNhap />} />
          <Route path='/dang-nhap' element={<DangNhap />} />
          <Route path='/dang-ky' element={<DangKy />} />
          <Route path='/trang-chu' element={<PrivateRoute><TrangChu /></PrivateRoute>} />
          <Route path='/dot-thi' element={<PrivateRoute><DotThi /></PrivateRoute>} />
          <Route path='/lich-khai-giang' element={<PrivateRoute><LichKhaiGiang /></PrivateRoute>} />
          <Route path='/dang-ky-khoa-on' element={<PrivateRoute><DKOn /></PrivateRoute>} />
          <Route path='/dang-ky-thi' element={<PrivateRoute><DKThi /></PrivateRoute>} />
          <Route path='/ket-qua' element={<PrivateRoute><KetQua /></PrivateRoute>} />
          <Route path='/xac-thuc-chung-chi' element={<PrivateRoute><KTChungChi /></PrivateRoute>} />
          <Route path='/chung-chi-ngoai-ngu' element={<PrivateRoute><CCNgoaiNgu /></PrivateRoute>} />
          <Route path='/chung-chi-tin-hoc' element={<PrivateRoute><CCTinHoc /></PrivateRoute>} />
          <Route path='/admin' element={<PrivateRoute><RoleAuth><Admin /></RoleAuth></PrivateRoute>} />
          <Route path='/them-chung-chi' element={<PrivateRoute><RoleAuth><ThemChungChi /></RoleAuth></PrivateRoute>} />
        </Routes>
      </Box>

      {!isAuthPage && <Footer />}
    </Box>
  ) 
}

function App() {
  

  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App
