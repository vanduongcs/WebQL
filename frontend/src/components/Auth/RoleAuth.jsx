import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function RoleAuth({ children }) {

  const navigate = useNavigate()

  const TenTK = localStorage.getItem('account')

  const Auth = async () => {
    try {
      const res = await axios.get(`http://localhost:2025/api/account/tim-tk/${ TenTK }`)
      if (res.data?.Loai && res.data.Loai !== 'admin') {
        navigate('/trang-chu')
      }
    } catch (error) {
      console.error('Lỗi xác thực quyền:', error)
      navigate('/dang-nhap')
    }
  }

  useEffect(() => {
    Auth()
  }, [])


  return (
    children
  )
}

export default RoleAuth
