import { useState, useEffect } from 'react'
import API from '../../api.jsx'
import PageComponent from '../../components/Admin/pageComponent/PageComponent.jsx'
import ExamForm from '../../components/Form/ExamForm.jsx'

function QLKyThi() {
  const FormName = ExamForm

  const [EditingExam, SetEditingExam] = useState(null)
  const [CertificateID, SetCertificateID] = useState('')

  const [TenKhoaThi, SetTenKhoaThi] = useState('')
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
    TenKhoaThi, SetTenKhoaThi,
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
  const funcUpdate = 'cap-nhat-dot-thi'
  const funcDelete = 'xoa-dot-thi'

  const fetchCertificates = () => {
    API.get('/certificate/tat-ca-chung-chi')
      .then(res => {
        setCertificates(res.data)
      })
      .catch(err => console.error('Lỗi khi lấy danh sách chứng chỉ:', err))
  }

  const fetchExams = () => {
    API.get(`/${routeAddress}/${funcFindAll}`)
      .then(res => {
        SetExams(res.data)
      })
      .catch(err => console.error('Lỗi khi lấy danh sách đợt thi:', err))
  }

  useEffect(() => {
    fetchExams()
    fetchCertificates()
  }, [])

  useEffect(() => {
    const selectedCert = certificates.find(cert => cert._id === CertificateID)
    if (selectedCert) {
      SetLoai(selectedCert.Loai || '')
      SetLePhiThi(selectedCert.LePhiThi?.toString() || '')
    } else {
      SetLoai('')
      SetLePhiThi('')
    }
  }, [CertificateID, certificates])

  const handleDelete = async (id) => {
    try {
      await API.delete(`/${routeAddress}/${funcDelete}/${id}`)
      fetchExams()
    } catch (err) {
      console.error('Lỗi xóa:', err)
    }
  }

  const handleEdit = (row) => {
    const matchedCert = certificates.find(cert => cert.TenChungChi === row.TenChungChi)
    SetCertificateID(matchedCert ? matchedCert._id : '')
    SetTenKhoaThi(row.TenKhoaThi || '')
    SetLoai(row.Loai || '')
    SetLePhiThi(row.LePhiThi?.toString() || '')
    SetNgayThi(row.NgayThi ? new Date(row.NgayThi).toISOString().slice(0, 10) : '')
    SetBuoi(row.Buoi || '')
    SetSiSoToiDa(row.SiSoToiDa?.toString() || '')
    SetSiSoHienTai(row.SiSoHienTai?.toString() || '')
    SetEditingExam(row._id)
  }

  const handleAdd = () => {
    const selectedCert = certificates.find(cert => cert._id === CertificateID)
    const newExam = {
      TenKhoaThi,
      TenChungChi: selectedCert.TenChungChi,
      Loai: selectedCert.Loai,
      LePhiThi: Number(LePhiThi) || 0,
      NgayThi: new Date(NgayThi),
      Buoi,
      SiSoToiDa: Number(SiSoToiDa) || 0,
      SiSoHienTai: Number(SiSoHienTai) || 0
    }
    API.post(`/${routeAddress}/${funcAdd}`, newExam)
      .then(() => {
        fetchExams()
        resetForm()
      })
      .catch(err => console.error('Lỗi thêm đợt thi:', err))
  }

  const handleUpdate = () => {
    const selectedCert = certificates.find(cert => cert._id === CertificateID)
    const updated = {
      TenKhoaThi,
      TenChungChi: selectedCert.TenChungChi,
      Loai: selectedCert.Loai,
      LePhiThi: Number(LePhiThi) || 0,
      NgayThi: new Date(NgayThi),
      Buoi,
      SiSoToiDa: Number(SiSoToiDa),
      SiSoHienTai: Number(SiSoHienTai) || 0
    }
    API.put(`/${routeAddress}/${funcUpdate}/${EditingExam}`, updated)
      .then(() => {
        fetchExams()
        resetForm()
      })
      .catch(err => console.error('Lỗi cập nhật đợt thi:', err))
  }

  const resetForm = () => {
    SetCertificateID('')
    SetTenKhoaThi('')
    SetLoai('')
    SetLePhiThi('')
    SetNgayThi('')
    SetBuoi('')
    SetSiSoToiDa('')
    SetSiSoHienTai('')
    SetEditingExam(null)
  }

  const columns = [
    { label: 'Tên khóa thi', key: 'TenKhoaThi' },
    { label: 'Tên chứng chỉ', key: 'TenChungChi' },
    { label: 'Loại', key: 'Loai' },
    { label: 'Lệ phí thi', key: 'LePhiThi' },
    { label: 'Ngày thi', key: 'NgayThi', isDate: true },
    { label: 'Buổi', key: 'Buoi' },
    { label: 'Sĩ số tối đa', key: 'SiSoToiDa' },
    { label: 'Sĩ số hiện tại', key: 'SiSoHienTai' },
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
    { label: 'Tên khóa thi', key: 'TenKhoaThi', type: 'text' },
    { label: 'Loại', key: 'Loai', type: 'text', disabled: true },
    { label: 'Lệ phí thi', key: 'LePhiThi', type: 'number' },
    { label: 'Ngày thi', key: 'NgayThi', type: 'date' },
    {
      label: 'Buổi',
      key: 'Buoi',
      type: 'select',
      options: [
        { value: 'Sáng', label: 'Sáng' },
        { value: 'Chiều', label: 'Chiều' }
      ]
    },
    { label: 'Sĩ số tối đa', key: 'SiSoToiDa', type: 'number' },
    { label: 'Sĩ số hiện tại', key: 'SiSoHienTai', type: 'number' }
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