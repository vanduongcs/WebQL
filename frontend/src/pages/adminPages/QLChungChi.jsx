import { useState, useEffect } from 'react' 
import axios from 'axios' 



// Custom
import PageComponent from '../../components/Admin/pageComponent/pageComponent.jsx'

function QLChungChi() {
  const [editingCertificate, setEditingCertificate] = useState(null) 
  const [certificates, setCertificates] = useState([]) 

  const routeAddress = 'certificate'
  const funcTable = 'xoa-chung-chi'
  const pageContent = 'chứng chỉ'
  const funcAdd = 'them-chung-chi'
  const funcEdit = 'cap-nhat-chung-chi'
  const funcFindAll = 'lay-tat-ca-chung-chi'

  const fetchCertificates = () => {
    // http://localhost:2025/api/certificate/lay-tat-ca-chung-chi
    axios.get(`http://localhost:2025/api/${ routeAddress }/${ funcFindAll }`)
      .then(res => setCertificates(res.data))
      .catch(err => console.error(err)) 
  } 

  useEffect(() => {
    fetchCertificates() 
  }, []) 

  const handleEdit = (certificate) => {
    setEditingCertificate(certificate) 
  } 

  const clearEditing = () => {
    setEditingCertificate(null) 
  } 

  const columns = [
    { label: 'Tên chứng chỉ', key: 'TenChungChi' },
    { label: 'Loại', key: 'Loai' },
    { label: 'Lệ phí thi', key: 'LePhiThi' },
    { label: 'Cấp bậc', key: 'CapDo' },
    { label: 'Thời gian khởi tạo', key: 'createdAt', isDate: true },
    { label: 'Lần sửa cuối', key: 'updatedAt', isDate: true },
    { label: 'Sửa', key: 'editButton', isAction: 'edit' },
    { label: 'Xóa', key: 'deleteButton', isAction: 'delete' }
  ]

  return (
    <PageComponent
      columns = { columns }
      clearEditing = { clearEditing }
      handleEdit = { handleEdit }
      items = { certificates }
      editingItem = { editingCertificate }
      fetchItems = { fetchCertificates }
      routeAddress = { routeAddress }
      funcTable = { funcTable }
      funcAdd = { funcAdd }
      funcEdit = { funcEdit }
      pageContent = { pageContent }
      >

      </PageComponent>
  ) 
}

export default QLChungChi 