import { useState, useEffect } from 'react'

// Custom
import API from '../../api.jsx'
import PageComponent from '../../components/Admin/pageComponent/PageComponent.jsx'
import AccountForm from '../../components/Form/AccountForm.jsx'

function QLNguoiDung() {
  const FormName = AccountForm

  const [editingAccount, setEditingAccount] = useState(null)

  const [TenHienThi, SetTenHienThi] = useState('')
  const [TenTaiKhoan, SetTenTaiKhoan] = useState('')
  const [Loai, SetLoai] = useState('')
  const [MatKhau, SetMatKhau] = useState('')
  const [KhoaHocDaThamGia, SetKhoaHocDaThamGia] = useState([])
  const [KhoaThi, SetKhoaThi] = useState([])
  const [ChungChiDaNhan, SetChungChiDaNhan] = useState([])
  const [courses, setCourses] = useState([])
  const [exams, setExams] = useState([])
  const [certificates, setCertificates] = useState([])
  const [results, setResults] = useState([])

  const [oldGetCerts, setOldGetCerts] = useState([])
  const [oldGetExams, setOldGetExams] = useState([])
  const [oldGetCompleteCourses, setOldGetCompleteCourses] = useState([])
  const [oldGetCourses, setOuldGetCourses] = useState([])

  const formStates = {
    TenHienThi, SetTenHienThi,
    TenTaiKhoan, SetTenTaiKhoan,
    Loai, SetLoai,
    MatKhau, SetMatKhau,
    KhoaHocDaThamGia, SetKhoaHocDaThamGia,
    KhoaThi, SetKhoaThi,
    ChungChiDaNhan, SetChungChiDaNhan
  }

  const [Accounts, SetAccounts] = useState([])
  const routeAddress = 'account'
  const pageContent = 'tài khoản'
  const funcAdd = 'dang-ky'
  const funcFindAll = 'tat-ca-tai-khoan'
  const funcUpdate = 'cap-nhat-tai-khoan'
  const funcDelete = 'xoa-tai-khoan'

  const fetchAccounts = () => {
    API.get(`/${routeAddress}/${funcFindAll}`)
      .then(res => SetAccounts(res.data))
      .catch(err => console.error('Lỗi khi lấy danh sách tài khoản:', err.response?.data || err.message))
  }

  const fetchCourses = () => {
    API.get(`/course/tat-ca-khoa-on`)
      .then(res => setCourses(res.data))
      .catch(err => console.error('Lỗi khi lấy danh sách khóa học:', err.response?.data || err.message))
  }

  const fetchExams = () => {
    API.get(`/exam/tat-ca-dot-thi`)
      .then(res => setExams(res.data))
      .catch(err => console.error('Lỗi khi lấy danh sách đợt thi:', err.response?.data || err.message))
  }

  const fetchCertificates = () => {
    API.get(`/certificate/tat-ca-chung-chi`)
      .then(res => setCertificates(res.data))
      .catch(err => console.error('Lỗi khi lấy danh sách chứng chỉ:', err.response?.data || err.message))
  }

  const fetchResults = () => {
    API.get('/result/tat-ca-ket-qua')
      .then(res => setResults(res.data))
      .catch(err => console.error('Lỗi khi lấy danh sách kết quả:', err.response?.data || err.message))
  }

  useEffect(() => {
    fetchAccounts()
    fetchCourses()
    fetchExams()
    fetchResults()
    fetchCertificates()
  }, [])

  const handleDelete = async (id) => {
    try {
      await API.delete(`/${routeAddress}/${funcDelete}/${id}`)
      fetchAccounts()
    } catch (error) {
      console.error('Lỗi khi xóa tài khoản:', error.response?.data || error.message)
    }
  }

  const handleEdit = (row) => {
    SetTenHienThi(row.TenHienThi || '')
    SetTenTaiKhoan(row.TenTaiKhoan || '')
    SetLoai(row.Loai || '')
    SetMatKhau(row.MatKhau || '')
    SetKhoaHocDaThamGia(row.KhoaHocDaThamGia || [])
    SetKhoaThi(row.KhoaThi || [])
    SetChungChiDaNhan(row.ChungChiDaNhan || [])
    setOldGetCerts(row.ChungChiDaNhan || [])
    setOldGetExams(row.KhoaThi || [])
    setOuldGetCourses(row.KhoaHocDaThamGia || [])
    setEditingAccount({ _id: row._id, TenTaiKhoan: row.TenTaiKhoan })
  }

  const handleAdd = async () => {
    const newAccount = {
      TenHienThi,
      TenTaiKhoan,
      MatKhau,
      Loai
    }

    try {
      await API.post(`/${routeAddress}/${funcAdd}`, newAccount)
      fetchAccounts()
      resetForm()
    } catch (err) {
      console.error('Lỗi khi tạo tài khoản:', err.response?.data || err.message)
    }
  }

  const handleUpdate = async () => {
  const updatedAccount = {
    TenHienThi,
    TenTaiKhoan,
    Loai,
    MatKhau,
    KhoaHocDaThamGia,
    KhoaThi,
    ChungChiDaNhan
  }

  try {
    await API.put(`/${routeAddress}/${funcUpdate}/${editingAccount.TenTaiKhoan}`, updatedAccount)

    const addedCertificates = ChungChiDaNhan.filter(
      id => !oldGetCerts.includes(id)
    )

    const addedExams = KhoaThi.filter(
      id => !oldGetExams.includes(id)
    )

    const removedCertificates = oldGetCerts.filter(
      id => !ChungChiDaNhan.includes(id)
    )

    const removedExams = oldGetExams.filter(
      id => !KhoaThi.includes(id)
    )

    const updateResultStatusPromises = [
      ...addedCertificates.map(id =>
        API.put(`/result/cap-nhat-ket-qua/${id}`, { TrangThai: 'Đã lấy' })
      ),
      ...removedCertificates.map(id =>
        API.put(`/result/cap-nhat-ket-qua/${id}`, { TrangThai: 'Chưa lấy' })
      )
    ]

    const updateExamStatusPromises = [
      ...addedExams.map(id => {
        const exam = exams.find(e => String(e._id) === String(id))
        const current = exam?.SiSoHienTai || 0
        return API.put(`/exam/cap-nhat-dot-thi/${id}`, { SiSoHienTai: current + 1 })
      }),
      ...removedExams.map(id => {
        const exam = exams.find(e => String(e._id) === String(id))
        const current = exam?.SiSoHienTai || 0
        return API.put(`/exam/cap-nhat-dot-thi/${id}`, { SiSoHienTai: current - 1 })  
      })
    ]

    await Promise.all(updateResultStatusPromises, updateExamStatusPromises)

    fetchAccounts()
    fetchResults()
    resetForm()
  } catch (err) {
    console.error('Lỗi khi cập nhật tài khoản:', err.response?.data || err.message)
  }
}

  const resetForm = () => {
    SetTenHienThi('')
    SetTenTaiKhoan('')
    SetLoai('')
    SetMatKhau('')
    SetKhoaHocDaThamGia([])
    SetKhoaThi([])
    SetChungChiDaNhan([])
    setEditingAccount(null)
    setOldGetCerts([])
  }

  const columns = [
    { label: 'Tên', key: 'TenHienThi' },
    { label: 'Tài khoản', key: 'TenTaiKhoan' },
    { label: 'Vai trò', key: 'Loai' },
    { label: 'Mật khẩu', key: 'MatKhau' },
    {
      label: 'Khóa học đã từng tham gia',
      key: 'KhoaHocDaThamGia',
      render: (row) => {
        if (!Array.isArray(row.KhoaHocDaThamGia)) return ''
        const names = row.KhoaHocDaThamGia.map(id => {
          const course = courses.find(c => String(c._id) === String(id))
          return course ? course.TenKhoaHoc || course.TenChungChi || '' : ''
        })
        return names.filter(name => name).join(', ') || ''
      }
    },
    {
      label: 'Khóa thi',
      key: 'KhoaThi',
      render: (row) => {
        if (!Array.isArray(row.KhoaThi)) return ''
        const names = row.KhoaThi.map(id => {
          const exam = exams.find(e => String(e._id) === String(id))
          return exam ? exam.TenKhoaThi || exam.TenChungChi || '' : ''
        })
        return names.filter(name => name).join(', ') || ''
      }
    },
    {
      label: 'Chứng chỉ',
      key: 'ChungChiDaNhan',
      render: (row) => {
        if (!Array.isArray(row.ChungChiDaNhan)) return ''
        const names = row.ChungChiDaNhan.map(id => {
          const result = results.find(c => String(c._id) === String(id))
          return result ? result.TenChungChi || '' : ''
        })
        return names.filter(name => name).join(', ') || ''
      }
    },
    { label: 'Ngày tạo', key: 'createdAt', isDate: true },
    { label: 'Cập nhật', key: 'updatedAt', isDate: true },
    { label: 'Sửa', key: 'editButton', isAction: 'edit' },
    { label: 'Xóa', key: 'deleteButton', isAction: 'delete' }
  ]

  const columnsCanEdit = [
    { key: 'TenHienThi', label: 'Tên người dùng', type: 'text' },
    { key: 'TenTaiKhoan', label: 'Tên tài khoản', type: 'text' },
    {
      key: 'Loai',
      label: 'Vai trò',
      type: 'select',
      options: [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' }
      ]
    },
    { key: 'MatKhau', label: 'Mật khẩu', type: 'text' },
    {
      key: 'KhoaHocDaThamGia',
      label: 'Khóa học đã từng tham gia',
      type: 'select',
      options: courses.map(course => ({
        value: course._id || '',
        label: course.TenKhoaHoc || course.TenChungChi || 'Không xác định'
      })),
      multiple: true
    },
    {
      label: 'Khóa thi',
      key: 'KhoaThi',
      type: 'select',
      multiple: true,
      options: exams.map(exam => ({
        value: exam._id,
        label: exam.TenKhoaThi || exam.TenChungChi || ''
      }))
    },
    {
      label: 'Chứng chỉ',
      key: 'ChungChiDaNhan',
      type: 'select',
      multiple: true,
      options: results.map(c => ({
        value: c._id,
        label: c.TenChungChi || c._id
      }))
    }
  ]

  return (
    <PageComponent
      columns={columns}
      columnsCanEdit={columnsCanEdit}
      rows={Accounts}
      formStates={formStates}
      pageContent={pageContent}
      handleAdd={handleAdd}
      handleEdit={handleEdit}
      isEditing={!!editingAccount}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      resetForm={resetForm}
      FormName={FormName}
    />
  )
}

export default QLNguoiDung
