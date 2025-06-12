import { useState, useEffect } from 'react'

// Custom
import PageComponent from '../../components/Admin/pageComponent/PageComponent.jsx'
import CertificateForm from '../../components/Form/CertificateForm.jsx'
import API from '../../api.jsx'

// Extend
import Swal from 'sweetalert2'

function QLChungChi() {
  const FormName = CertificateForm
  const [editingCertificate, setEditingCertificate] = useState(null)

  const [TenChungChi, SetTenChungChi] = useState('')
  const [Loai, SetLoai] = useState('')
  const [LePhiThi, SetLePhiThi] = useState('')
  const [ThoiHan, SetThoiHan] = useState('')

  const formStates = {
    TenChungChi, SetTenChungChi,
    Loai, SetLoai,
    LePhiThi, SetLePhiThi,
    ThoiHan, SetThoiHan
  }

  const [certificates, setCertificates] = useState([])

  const routeAddress = 'certificate'
  const pageContent = 'chứng chỉ'
  const funcAdd = 'them-chung-chi'            // C
  const funcFindAll = 'tat-ca-chung-chi'      // R
  const funcUpdate = 'cap-nhat-chung-chi'       // U
  const funcDelete = 'xoa-chung-chi'          // D

  const handleAdd = () => {
    const newCertificate = { TenChungChi, Loai, LePhiThi, ThoiHan }

    API.post(`/${routeAddress}/${funcAdd}`, newCertificate)
      .then(() => {
        fetchCertificates()
        resetForm()
      })
      .catch(() => {
        Swal.fire({
          icon: 'warning',
          title: 'Lỗi khi thêm chứng chỉ',
          confirmButtonText: 'Đóng',
          confirmButtonColor: '#1976d2'
        })
      })
  }

    const handleDelete = async (id) => {
    try {
      await API.delete(`/${routeAddress}/${funcDelete}/${id}`)
      fetchCertificates()
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'Lỗi khi xóa chứng chỉ',
        confirmButtonText: 'Đóng',
        confirmButtonColor: '#1976d2'
      })
    }
  }

  const handleEdit = (row) => {
    SetTenChungChi(row.TenChungChi)
    SetLoai(row.Loai)
    SetLePhiThi(row.LePhiThi)
    SetThoiHan(row.ThoiHan)
    setEditingCertificate(row._id)
  }

  const handleUpdate = () => {
    const updatedCertificate = { TenChungChi, Loai, LePhiThi, ThoiHan: Number(ThoiHan) }

    API.put(`/${routeAddress}/${funcUpdate}/${editingCertificate}`, updatedCertificate)
      .then(() => {
        fetchCertificates()
        resetForm()
      })
      .catch(() => {
        Swal.fire({
          icon: 'warning',
          title: 'Lỗi khi cập nhật chứng chỉ',
          confirmButtonText: 'Đóng',
          confirmButtonColor: '#1976d2'
        })
      })
  }

  const resetForm = () => {
    SetTenChungChi('')
    SetLoai('')
    SetLePhiThi('')
    SetThoiHan('')
    setEditingCertificate(null)
  }

  const fetchCertificates = () => {
    API.get(`/${routeAddress}/${funcFindAll}`)
      .then(res => setCertificates(res.data))
      .catch(() => {
        Swal.fire({
          icon: 'warning',
          title: 'Không thể tải danh sách chứng chỉ',
          confirmButtonText: 'Đóng',
          confirmButtonColor: '#1976d2'
        })
      })
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  const columns = [
    { label: 'Tên chứng chỉ', key: 'TenChungChi' },
    { label: 'Loại', key: 'Loai' },
    { label: 'Lệ phí thi', key: 'LePhiThi' },
    { label: 'Thời hạn', key: 'ThoiHan'},
    { label: 'Thời gian khởi tạo', key: 'createdAt', isDate: true },
    { label: 'Lần sửa cuối', key: 'updatedAt', isDate: true },
    { label: 'Sửa', isAction: 'edit' },
    { label: 'Xóa', isAction: 'delete' }
  ]

  const columnsCanEdit = [
    { label: 'Tên chứng chỉ', key: 'TenChungChi' },
    { 
      label: 'Loại',
      key: 'Loai', 
      type: 'select',
      options: [
        { value: 'Ngoại ngữ', label: 'Ngoại ngữ' },
        { value: 'Tin học', label: 'Tin học' },
      ]
    },
    { label: 'Lệ phí thi', key: 'LePhiThi', type: 'number' },
    { label: 'Thời hạn', key: 'ThoiHan', type: 'number' }
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
