import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function RoleAuth({ children }) {

  const navigate = useNavigate()



  const Auth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/dang-nhap');
        return;
      }
      const res = await axios.get('http://localhost:2025/api/account/tim-tai-khoan/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data?.Loai && res.data.Loai !== 'admin') {
        navigate('/dang-nhap');
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.error('Lỗi xác thực quyền:', error);
      navigate('/dang-nhap');
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
