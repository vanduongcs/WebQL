import { useState, useEffect } from 'react'
import API from '../../api.jsx'
import PageComponent from '../../components/Admin/pageComponent/PageComponent.jsx'
import CourseForm from '../../components/Form/CourseForm.jsx'

function QLKhoaOn() {
  const FormName = CourseForm

  const [EditingCourse, SetEditingCourse] = useState(null)
  const [Courses, SetCourses] = useState([])
  const [Certificates, SetCertificates] = useState([])
  const [CertificateID, SetCertificateID] = useState('')

  const [TenKhoaHoc, SetTenKhoaHoc] = useState('')
  const [Loai, SetLoai] = useState('')
  const [HocPhi, SetHocPhi] = useState('')
  const [LichHoc, SetLichHoc] = useState('')
  const [NgayKhaiGiang, SetNgayKhaiGiang] = useState('')
  const [NgayKetThuc, SetNgayKetThuc] = useState('')
  const [Buoi, SetBuoi] = useState('')
  const [SiSoToiDa, SetSiSoToiDa] = useState('')
  const [SiSoHienTai, SetSiSoHienTai] = useState('')

  const formStates = {
    CertificateID, SetCertificateID,
    TenKhoaHoc, SetTenKhoaHoc,
    Loai, SetLoai,
    HocPhi, SetHocPhi,
    LichHoc, SetLichHoc,
    NgayKhaiGiang, SetNgayKhaiGiang,
    NgayKetThuc, SetNgayKetThuc,
    Buoi, SetBuoi,
    SiSoToiDa, SetSiSoToiDa,
    SiSoHienTai, SetSiSoHienTai
  }

  const routeAddress = 'course'
  const pageContent = 'khóa ôn'
  const funcAdd = 'them-khoa-on'
  const funcFindAll = 'tat-ca-khoa-on'
  const funcUpdate = 'cap-nhat-khoa-on'
  const funcDelete = 'xoa-khoa-on'

  const fetchCourses = () => {
    API.get(`/${routeAddress}/${funcFindAll}`)
      .then(res => SetCourses(res.data))
      .catch(err => console.error('Lỗi khi lấy danh sách khóa ôn:', err))
  }

  const fetchCertificates = () => {
    API.get(`/certificate/tat-ca-chung-chi`)
      .then(res => SetCertificates(res.data))
      .catch(err => console.error('Lỗi khi lấy danh sách chứng chỉ:', err))
  }

  useEffect(() => {
    fetchCourses()
    fetchCertificates()
  }, [])

  const handleDelete = async (id) => {
    try {
      await API.delete(`/${routeAddress}/${funcDelete}/${id}`)
      fetchCourses()
    } catch (err) {
      console.error(`Lỗi khi xóa ${pageContent}:`, err)
    }
  }

  const handleEdit = (row) => {
    const selectedCertificate = Certificates.find(cert => cert.TenChungChi === row.TenChungChi)
    SetCertificateID(selectedCertificate._id)
    SetTenKhoaHoc(row.TenKhoaHoc)
    SetLoai(row.Loai)
    SetHocPhi(row.HocPhi?.toString())
    SetLichHoc(row.LichHoc)
    SetNgayKhaiGiang(new Date(row.NgayKhaiGiang).toISOString().slice(0, 10))
    SetNgayKetThuc(new Date(row.NgayKetThuc).toISOString().slice(0, 10))
    SetBuoi(row.Buoi)
    SetSiSoToiDa(row.SiSoToiDa?.toString())
    SetSiSoHienTai(row.SiSoHienTai?.toString())
    SetEditingCourse(row._id)
  }

  const handleCertificateSelect = (certificateId) => {
    const selectedCertificate = Certificates.find(cert => cert._id === certificateId)
      SetCertificateID(certificateId)
      SetLoai(selectedCertificate.Loai || '')
  }

  const handleAdd = () => {
    const selectedCertificate = Certificates.find(cert => cert._id === CertificateID)
    const newCourse = {
      TenKhoaHoc,
      TenChungChi: selectedCertificate.TenChungChi,
      Loai: selectedCertificate.Loai,
      HocPhi: Number(HocPhi) || 0,
      LichHoc,
      NgayKhaiGiang: new Date(NgayKhaiGiang),
      NgayKetThuc: new Date(NgayKetThuc),
      Buoi,
      SiSoToiDa: Number(SiSoToiDa),
      SiSoHienTai: Number(SiSoHienTai)
    }
    API.post(`/${routeAddress}/${funcAdd}`, newCourse)
      .then(() => {
        fetchCourses()
        resetForm()
      })
      .catch(err => console.error('Lỗi thêm khóa ôn:', err))
  }

  const handleUpdate = () => {
    const selectedCertificate = Certificates.find(cert => cert._id === CertificateID)

    const updated = {
      TenKhoaHoc,
      TenChungChi: selectedCertificate.TenChungChi,
      Loai: selectedCertificate.Loai,
      HocPhi: Number(HocPhi) || 0,
      LichHoc,
      NgayKhaiGiang: new Date(NgayKhaiGiang),
      NgayKetThuc: new Date(NgayKetThuc),
      Buoi,
      SiSoToiDa: Number(SiSoToiDa),
      SiSoHienTai: Number(SiSoHienTai) || 0
    }
    API.put(`/${routeAddress}/${funcUpdate}/${EditingCourse}`, updated)
      .then(() => {
        fetchCourses()
        resetForm()
      })
      .catch(err => console.error(err))
  }

  const resetForm = () => {
    SetCertificateID('')
    SetTenKhoaHoc('')
    SetLoai('')
    SetHocPhi('')
    SetLichHoc('')
    SetNgayKhaiGiang('')
    SetNgayKetThuc('')
    SetBuoi('')
    SetSiSoToiDa('')
    SetSiSoHienTai('')
    SetEditingCourse(null)
  }

  const columns = [
    { label: 'Tên khóa học', key: 'TenKhoaHoc' },
    { label: 'Tên chứng chỉ', key: 'TenChungChi' },
    { label: 'Loại', key: 'Loai' },
    { label: 'Học phí', key: 'HocPhi' },
    { label: 'Lịch học', key: 'LichHoc' },
    { label: 'Ngày khai giảng', key: 'NgayKhaiGiang', isDate: true },
    { label: 'Ngày kết thúc', key: 'NgayKetThuc', isDate: true },
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
      label: 'Tên chứng chỉ',
      key: 'CertificateID',
      type: 'select',
      options: Certificates.map(cert => ({
        value: cert._id,
        label: cert.TenChungChi,
        Loai: cert.Loai
      })),
      onChange: handleCertificateSelect
    },
    {
      label: 'Tên khóa học',
      key: 'TenKhoaHoc',
      type: 'text'
    },
    {
      label: 'Loại',
      key: 'Loai',
      type: 'text'
    },
    { label: 'Học phí', key: 'HocPhi', type: 'number' },
    {
      label: 'Lịch học',
      key: 'LichHoc',
      type: 'select',
      options: [
        { value: 'T2 - T4 - T6', label: 'T2 - T4 - T6' },
        { value: 'T3 - T5 - T7', label: 'T3 - T5 - T7' }
      ]
    },
    { label: 'Ngày khai giảng', key: 'NgayKhaiGiang', type: 'date' },
    { label: 'Ngày kết thúc', key: 'NgayKetThuc', type: 'date' },
    {
      label: 'Buổi',
      key: 'Buoi',
      type: 'select',
      options: [
        { value: 'Sáng', label: 'Sáng' },
        { value: 'Chiều', label: 'Chiều' },
        { value: 'Tối', label: 'Tối' }
      ]
    },
    { label: 'Sĩ số tối đa', key: 'SiSoToiDa', type: 'number' },
    { label: 'Sĩ số hiện tại', key: 'SiSoHienTai', type: 'number' }
  ]

  return (
    <PageComponent
      columns={columns}
      columnsCanEdit={columnsCanEdit}
      rows={Courses}
      formStates={formStates}
      pageContent={pageContent}
      handleAdd={handleAdd}
      handleEdit={handleEdit}
      isEditing={!!EditingCourse}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      resetForm={resetForm}
      FormName={FormName}
    />
  )
}

export default QLKhoaOn