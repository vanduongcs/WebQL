import { useState, useEffect } from 'react'
import axios from 'axios'

// Custom
import PageComponent from '../../components/Admin/pageComponent/PageComponent.jsx'
import CertificateForm from '../../components/Form/CertificateForm.jsx'

function QLChungChi() {
  const FormName = CertificateForm
  // Hàm set dữ liệu edit và hằng lưu trữ dữ liệu edit
  const [editingCertificate, setEditingCertificate] = useState(null)

  // Danh sách dữ liệu cần edit/add
  const [TenChungChi, SetTenChungChi] = useState('')
  const [Loai, SetLoai] = useState('')
  const [LePhiThi, SetLePhiThi] = useState('')
  const [ThoiHan, SetThoiHan] = useState('')

  // Truyền danh sách trên vào từng field của form
  const formStates = {
    TenChungChi, SetTenChungChi,
    Loai, SetLoai,
    LePhiThi, SetLePhiThi,
    ThoiHan, SetThoiHan
  }

  // Đọc danh sách dữ liệu từ database
  const [certificates, setCertificates] = useState([])

  // Gắn vào các lời gọi API, nội dung components
  const routeAddress = 'certificate'
  const pageContent = 'chứng chỉ'
  const funcAdd = 'them-chung-chi'            // C
  const funcFindAll = 'tat-ca-chung-chi'  // R
  const funcEdit = 'cap-nhat-chung-chi'       // U
  const funcDelete = 'xoa-chung-chi'          // D

    const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2025/api/${routeAddress}/${funcDelete}/${id}`)
      fetchCertificates()
    } catch (error) {
      console.error(`Lỗi khi xóa ${pageContent}:`, error.response?.data || error.message)
    }
  }

  const handleEdit = (row) => {
    // Chỉ set dữ liệu form để người dùng sửa
    SetTenChungChi(row.TenChungChi || '')
    SetLoai(row.Loai || '')
    SetLePhiThi(row.LePhiThi || '')
    SetThoiHan(row.ThoiHan || '')
    setEditingCertificate(row._id)
  }

  const handleAdd = () => {
    const newCertificate = {
      TenChungChi,
      Loai,
      LePhiThi,
      ThoiHan
    }

    axios.post(`http://localhost:2025/api/${routeAddress}/${funcAdd}`, newCertificate)
      .then(() => {
        fetchCertificates()
        resetForm()
      })
      .catch(err => console.error(err))
  }

  const handleUpdate = () => {
    if (!editingCertificate) {
      console.error('Không có chứng chỉ nào đang được chỉnh sửa')
      return
    }

    const updatedCertificate = {
      TenChungChi,
      Loai,
      LePhiThi
    }

    axios.put(`http://localhost:2025/api/${routeAddress}/${funcEdit}/${editingCertificate}`, updatedCertificate)
      .then(() => {
        fetchCertificates()
        resetForm()
      })
      .catch(err => console.error(err))
  }

  const resetForm = () => {
    SetTenChungChi('')
    SetLoai('')
    SetLePhiThi('')
    SetThoiHan('')
    setEditingCertificate(null)
  }

  const fetchCertificates = () => {
    axios.get(`http://localhost:2025/api/${routeAddress}/${funcFindAll}`)
      .then(res => setCertificates(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  // Danh sách cột hiển thị trên table
  const columns = [
    { label: 'Tên chứng chỉ', key: 'TenChungChi' },
    { label: 'Loại', key: 'Loai' },
    { label: 'Lệ phí thi', key: 'LePhiThi' },
    { label: 'Thời hạn', key: 'ThoiHan'},
    { label: 'Thời gian khởi tạo', key: 'createdAt', isDate: true },
    { label: 'Lần sửa cuối', key: 'updatedAt', isDate: true },
    { label: 'Sửa', key: 'editButton', isAction: 'edit' },
    { label: 'Xóa', key: 'deleteButton', isAction: 'delete' }
  ]

  // Danh sách các trường dữ liệu được phép chỉnh sửa tại form
  const columnsCanEdit = [
    { label: 'Tên chứng chỉ', key: 'TenChungChi' },
    { 
      label: 'Loại',
      key: 'Loai', 
      type: 'select',
      options: [
        { value: 'Ngoại ngữ', label: 'Ngoại ngữ' },
        { value: 'Tin học', label: 'Tin học' },
      ],
      multiple: false,
    },
    { label: 'Lệ phí thi', key: 'LePhiThi', type: 'number' },
    { label: 'Thời hạn', key: 'ThoiHan'}
  ]

  return (
    <PageComponent
      columns={columns}
      columnsCanEdit={columnsCanEdit}
      rows={certificates}
      formStates={formStates}
      pageContent={pageContent}
      handleAdd={handleAdd}
      handleEdit={handleEdit}
      isEditing={!!editingCertificate}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      resetForm={resetForm}
      FormName={FormName}
    />
  )
}

export default QLChungChi
