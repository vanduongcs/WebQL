import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Box from '@mui/material/Box'
import NavBar from './components/NavBar/NavBar.jsx'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import DangNhap from './pages/DangNhap.jsx'
import TrangChu from './pages/TrangChu.jsx'
import DotThi from './pages/DotThi.jsx'
import LichKhaiGiang from './pages/LichKhaiGiang.jsx'
import DKOn from './pages/DKOn.jsx'
import DKThi from './pages/DKThi.jsx'
import KetQua from './pages/KetQua.jsx'
import KTChungChi from './pages/KTChungChi.jsx'
import TTChung from './pages/TTChung.jsx'

function Layout() {
  const location = useLocation()
  return (
      <Box>
        {location.pathname !== '/' && <NavBar />}
        <Routes>
          <Route path='/' element={<DangNhap />} />
          <Route path='/trang-chu' element={<TrangChu />} />
          <Route path='/dot-thi' element={<DotThi />} />
          <Route path='/lich-khai-giang' element={<LichKhaiGiang />} />
          <Route path='/dang-ky-khoa-on' element={<DKOn />} />
          <Route path='/dang-ky-thi' element={<DKThi />} />
          <Route path='/ket-qua' element={<KetQua />} />
          <Route path='/xac-thuc-chung-chi' element={<KTChungChi />} />
          <Route path='/thong-tin-chung' element={<TTChung />} />
        </Routes>
      </ Box>
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
