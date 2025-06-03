import { useState, useEffect } from 'react'
import axios from 'axios'
import PageComponent from '../../components/Admin/pageComponent/PageComponent.jsx'
import ExamForm from '../../components/Form/ExamForm.jsx'

function QLKyThi() {
  const FormName = ExamForm
  const [EditingExam, SetEditingExam] = useState(null)

  const [CertificateID, SetCertificateID] = useState('')
  const [TenChungChi, SetTenChungChi] = useState('')
  const [Loai, SetLoai] = useState('')
  const [LePhiThi, SetLePhiThi] = useState('')
  const [NgayThi, SetNgayThi] = useState('')
  const [Buoi, SetBuoi] = useState('')
  const [SiSoToiDa, SetSiSoToiDa] = useState('')
  const [SiSoHienTai, SetSiSoHienTai] = useState('')

  const [certificates, setCertificates] = useState([])
  const [Exams, SetExams] = useState([])

  const formStates = {
    CertificateID, SetCertificateID,
    TenChungChi, SetTenChungChi,
    Loai, SetLoai,
    LePhiThi, SetLePhiThi,
    NgayThi, SetNgayThi,
    Buoi, SetBuoi,
    SiSoToiDa, SetSiSoToiDa,
    SiSoHienTai, SetSiSoHienTai
  }

  const routeAddress = 'exam'
  const pageContent = 'đợt thi'
  const funcAdd = 'them-dot-thi'
  const funcFindAll = 'tat-ca-dot-thi'
  const funcEdit = 'cap-nhat-dot-thi'
  const funcDelete = 'xoa-dot-thi'

  const fetchCertificates = () => {
    axios.get('http://localhost:2025/api/certificate/tat-ca-chung-chi')
      .then(res => setCertificates(res.data))
      .catch(err => console.error('Lỗi khi lấy danh sách chứng chỉ:', err))
  }

  const fetchExams = () => {
    axios.get(`http://localhost:2025/api/${routeAddress}/${funcFindAll}`)
      .then(res => SetExams(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchExams()
    fetchCertificates()
  }, [])

  // Tự động cập nhật thông tin khi chọn chứng chỉ
  useEffect(() => {
    const selectedCert = certificates.find(cert => cert._id === CertificateID)
    if (selectedCert) {
      SetTenChungChi(selectedCert.TenChungChi || '')
      SetLoai(selectedCert.Loai || '')
      SetLePhiThi(selectedCert.LePhiThi?.toString() ?? '')
    } else {
      SetTenChungChi('')
      SetLoai('')
      SetLePhiThi('')
    }
  }, [CertificateID, certificates])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2025/api/${routeAddress}/${funcDelete}/${id}`)
      fetchExams()
    } catch (err) {
      console.error('Lỗi xóa:', err)
    }
  }

  const handleEdit = (row) => {
    // Tìm lại certificate để hiện select đúng
    const matchedCert = certificates.find(cert => cert.TenChungChi === row.TenChungChi)
    SetCertificateID(matchedCert ? matchedCert._id : '')

    SetTenChungChi(row.TenChungChi || '')
    SetLoai(row.Loai || '')
    SetLePhiThi(row.LePhiThi || '')
    SetNgayThi(row.NgayThi ? row.NgayThi.slice(0, 10) : '')
    SetBuoi(row.Buoi || '')
    SetSiSoToiDa(row.SiSoToiDa || '')
    SetSiSoHienTai(row.SiSoHienTai || '')
    SetEditingExam(row._id)
  }

  const handleAdd = () => {
    const newExam = {
      TenChungChi, Loai, LePhiThi, NgayThi, Buoi, SiSoToiDa, SiSoHienTai
    }

    axios.post(`http://localhost:2025/api/${routeAddress}/${funcAdd}`, newExam)
      .then(() => {
        fetchExams()
        resetForm()
      })
      .catch(err => console.error(err))
  }

  const handleUpdate = () => {
    if (!EditingExam) return

    const updated = {
      TenChungChi, Loai, LePhiThi, NgayThi, Buoi, SiSoToiDa, SiSoHienTai
    }

    axios.put(`http://localhost:2025/api/${routeAddress}/${funcEdit}/${EditingExam}`, updated)
      .then(() => {
        fetchExams()
        resetForm()
      })
      .catch(err => console.error(err))
  }

  const resetForm = () => {
    SetCertificateID('')
    SetTenChungChi('')
    SetLoai('')
    SetLePhiThi('')
    SetNgayThi('')
    SetBuoi('')
    SetSiSoToiDa('')
    SetSiSoHienTai('')
    SetEditingExam(null)
  }

  const columns = [
    { label: 'Tên chứng chỉ', key: 'TenChungChi' },
    { label: 'Loại', key: 'Loai' },
    { label: 'Lệ phí thi', key: 'LePhiThi' },
    { label: 'Ngày thi', key: 'NgayThi', isDate: true },
    { label: 'Buổi', key: 'Buoi' },
    { label: 'Sỉ số tối đa', key: 'SiSoToiDa' },
    { label: 'Sỉ số hiện tại', key: 'SiSoHienTai' },
    { label: 'Thời gian khởi tạo', key: 'createdAt', isDate: true },
    { label: 'Lần sửa cuối', key: 'updatedAt', isDate: true },
    { label: 'Sửa', key: 'editButton', isAction: 'edit' },
    { label: 'Xóa', key: 'deleteButton', isAction: 'delete' }
  ]

  const columnsCanEdit = [
    {
      label: 'Chọn chứng chỉ',
      key: 'CertificateID',
      type: 'select',
      options: certificates.map(cert => ({
        label: cert.TenChungChi,
        value: cert._id
      }))
    },
    { label: 'Tên chứng chỉ', key: 'TenChungChi', type: 'text' },
    { label: 'Loại', key: 'Loai', type: 'text' },
    { label: 'Lệ phí thi', key: 'LePhiThi', type: 'number' },
    { label: 'Ngày thi', key: 'NgayThi', type: 'date' },
    { 
      label: 'Buổi', 
      key: 'Buoi', 
      type: 'select',
      options: [
        { value: 'Sáng', label: 'Sáng' },
        { value: 'Chiều', label: 'Chiều' },
        { value: 'Tối', label: 'Tối' },
      ],
      multiple: false,
    },
    { label: 'Sỉ số tối đa', key: 'SiSoToiDa', type: 'number' },
    { label: 'Sỉ số hiện tại', key: 'SiSoHienTai', type: 'number' }
  ]

  return (
    <PageComponent
      columns={columns}
      columnsCanEdit={columnsCanEdit}
      rows={Exams}
      formStates={formStates}
      pageContent={pageContent}
      handleAdd={handleAdd}
      handleEdit={handleEdit}
      isEditing={!!EditingExam}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      resetForm={resetForm}
      FormName={FormName}
    />
  )
}

export default QLKyThi
