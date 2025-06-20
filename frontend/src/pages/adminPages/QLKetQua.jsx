import { useState, useEffect } from 'react'
import API from '../../api.jsx'
import PageComponent from '../../components/Admin/pageComponent/PageComponent.jsx'
import ResultForm from '../../components/Form/ResultForm.jsx'
import Swal from 'sweetalert2'

function QLKetQua() {
  const FormName = ResultForm

  const [editingResult, setEditingResult] = useState(null)
  const [results, setResults] = useState([])
  const [accounts, setAccounts] = useState([])
  const [certificates, setCertificates] = useState([])
  
  const [IDNguoiDung, SetIDNguoiDung] = useState('')
  const [IDChungChi, SetIDChungChi] = useState('')
  const [Diem1, SetDiem1] = useState('')
  const [Diem2, SetDiem2] = useState('')
  const [Diem3, SetDiem3] = useState('')
  const [Diem4, SetDiem4] = useState('')
  const [NgayCap, SetNgayCap] = useState('')
  const [NgayHetHan, SetNgayHetHan] = useState('')
  const [TrangThai, SetTrangThai] = useState('')

  const formStates = {
    IDNguoiDung, SetIDNguoiDung,
    IDChungChi, SetIDChungChi,
    Diem1, SetDiem1,
    Diem2, SetDiem2,
    Diem3, SetDiem3,
    Diem4, SetDiem4,
    NgayCap, SetNgayCap,
    NgayHetHan, SetNgayHetHan,
    TrangThai, SetTrangThai
  }

  const routeAddress = 'result'
  const pageContent = 'kết quả'
  const funcAdd = 'them-ket-qua'
  const funcFindAll = 'tat-ca-ket-qua'
  const funcUpdate = 'cap-nhat-ket-qua'
  const funcDelete = 'xoa-ket-qua'

  const fetchAccounts = () => {
    API.get('/account/tat-ca-tai-khoan')
      .then(res => {
        setAccounts(res.data)
      })
      .catch(err => console.error('Lỗi khi lấy danh sách tài khoản:', err))
  }

  const fetchCertificates = () => {
    API.get('/certificate/tat-ca-chung-chi')
      .then(res => {
        setCertificates(res.data)
      })
      .catch(err => console.error('Lỗi khi lấy danh sách chứng chỉ:', err))
  }

  const fetchResults = () => {
    API.get(`/${routeAddress}/${funcFindAll}`)
      .then(res => {
        setResults(res.data)
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchAccounts()
    fetchCertificates()
    fetchResults()
  }, [])

  const handleDelete = async (id) => {
    try {
      await API.delete(`/${routeAddress}/${funcDelete}/${id}`)
      fetchResults()
    } catch (error) {
      console.error(`Lỗi khi xóa ${pageContent}:`, error.response?.data || error.message)
    }
  }

  const handleEdit = (row) => {
    SetIDNguoiDung(row.IDNguoiDung || '')
    SetIDChungChi(row.IDChungChi || '')
    SetDiem1(row.Diem1?.toString() || '')
    SetDiem2(row.Diem2?.toString() || '')
    SetDiem3(row.Diem3?.toString() || '')
    SetDiem4(row.Diem4?.toString() || '')
    SetNgayCap(row.NgayCap ? new Date(row.NgayCap).toISOString().slice(0, 10) : '')
    SetNgayHetHan(row.NgayHetHan ? new Date(row.NgayHetHan).toISOString().slice(0, 10) : '')
    SetTrangThai(row.TrangThai || '')
    setEditingResult(row._id)
  }

  const handleAdd = () => {
    const diem1Num = Number(Diem1)
    const diem2Num = Number(Diem2)
    const diem3Num = Diem3 ? Number(Diem3) : undefined
    const diem4Num = Diem4 ? Number(Diem4) : undefined
    const newResult = {
      IDNguoiDung,
      IDChungChi,
      Diem1: diem1Num,
      Diem2: diem2Num,
      Diem3: diem3Num,
      Diem4: diem4Num,
      NgayCap: new Date(NgayCap),
      NgayHetHan: NgayHetHan ? new Date(NgayHetHan) : undefined,
      TrangThai: TrangThai || 'Chưa lấy'
    }
    API.post(`/${routeAddress}/${funcAdd}`, newResult)
      .then(() => {
        fetchResults()
        resetForm()
      })
      .catch(err => console.error('Lỗi thêm kết quả:', err))
  }

  const handleUpdate = () => {
    const diem1Num = Number(Diem1)
    const diem2Num = Number(Diem2)
    const diem3Num = Diem3 ? Number(Diem3) : undefined
    const diem4Num = Diem4 ? Number(Diem4) : undefined
    const updatedResult = {
      IDNguoiDung,
      IDChungChi,
      Diem1: diem1Num,
      Diem2: diem2Num,
      Diem3: diem3Num,
      Diem4: diem4Num,
      NgayCap: new Date(NgayCap),
      NgayHetHan: NgayHetHan ? new Date(NgayHetHan) : undefined,
      TrangThai: TrangThai || 'Chưa lấy'
    }
    API.put(`/${routeAddress}/${funcUpdate}/${editingResult}`, updatedResult)
      .then(() => {
        fetchResults()
        resetForm()
      })
      .catch(err => console.error('Lỗi cập nhật kết quả:', err))
  }

  const resetForm = () => {
    SetIDNguoiDung('')
    SetIDChungChi('')
    SetDiem1('')
    SetDiem2('')
    SetDiem3('')
    SetDiem4('')
    SetNgayCap('')
    SetNgayHetHan('')
    SetTrangThai('')
    setEditingResult(null)
  }

  const columns = [
    {
      label: 'Người dùng',
      key: 'IDNguoiDung',
      render: (row) => {
        const account = accounts.find(acc => String(acc._id) === String(row.IDNguoiDung))
        return account ? account.TenHienThi : ''
      }
    },
    {
      label: 'Chứng chỉ',
      key: 'IDChungChi',
      render: (row) => {
        const cert = certificates.find(cert => String(cert._id) === String(row.IDChungChi))
        return cert ? cert.TenChungChi : ''
      }
    },
    { label: 'Điểm 1', key: 'Diem1' },
    { label: 'Điểm 2', key: 'Diem2' },
    { label: 'Điểm 3', key: 'Diem3' },
    { label: 'Điểm 4', key: 'Diem4' },
    { label: 'Điểm tổng kết', key: 'DiemTK' },
    { label: 'Ngày cấp', key: 'NgayCap', isDate: true },
    { label: 'Ngày hết hạn', key: 'NgayHetHan', isDate: true },
    { label: 'Trạng thái', key: 'TrangThai' },
    { label: 'Thời gian khởi tạo', key: 'createdAt', isDate: true },
    { label: 'Lần sửa cuối', key: 'updatedAt', isDate: true },
    { label: 'Sửa', key: 'editButton', isAction: 'edit' },
    { label: 'Xóa', key: 'deleteButton', isAction: 'delete' }
  ]

  const columnsCanEdit = [
    {
      label: 'Người dùng',
      key: 'IDNguoiDung',
      type: 'select',
      options: accounts.map(acc => ({
        value: acc._id,
        label: acc.TenHienThi || ''
      }))
    },
    {
      label: 'Chứng chỉ',
      key: 'IDChungChi',
      type: 'select',
      options: certificates.map(cert => ({
        value: cert._id,
        label: cert.TenChungChi
      }))
    },
    { label: 'Điểm 1', key: 'Diem1', type: 'number' },
    { label: 'Điểm 2', key: 'Diem2', type: 'number' },
    { label: 'Điểm 3', key: 'Diem3', type: 'number' },
    { label: 'Điểm 4', key: 'Diem4', type: 'number' },
    { label: 'Ngày cấp', key: 'NgayCap', type: 'date' },
    { label: 'Ngày hết hạn', key: 'NgayHetHan', type: 'date' },
    {
      label: 'Trạng thái',
      key: 'TrangThai',
      type: 'select',
      options: [
        { value: 'Chưa lấy', label: 'Chưa lấy' },
        { value: 'Đã lấy', label: 'Đã lấy' }
      ]
    }
  ]

  return (
    <PageComponent
      columns={columns}
      columnsCanEdit={columnsCanEdit}
      rows={results}
      formStates={formStates}
      pageContent={pageContent}
      handleAdd={handleAdd}
      handleEdit={handleEdit}
      isEditing={!!editingResult}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      resetForm={resetForm}
      FormName={FormName}
    />
  )
}

export default QLKetQua