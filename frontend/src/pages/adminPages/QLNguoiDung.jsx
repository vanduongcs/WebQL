import { useState, useEffect } from 'react';
import axios from 'axios';
import PageComponent from '../../components/Admin/pageComponent/PageComponent.jsx';
import AccountForm from '../../components/Form/AccountForm.jsx';

function QLNguoiDung() {
  const FormName = AccountForm;

  // State cho dữ liệu edit
  const [editingAccount, setEditingAccount] = useState(null);

  // State cho các trường form
  const [TenHienThi, SetTenHienThi] = useState('');
  const [TenTaiKhoan, SetTenTaiKhoan] = useState('');
  const [Loai, SetLoai] = useState('');
  const [MatKhau, SetMatKhau] = useState('');
  const [KhoaHocDangHoc, SetKhoaHocDangHoc] = useState([]);
  const [KhoaHocDaHT, SetKhoaHocDaHT] = useState([]);
  const [KhoaThi, SetKhoaThi] = useState([]);
  const [ChungChiDaNhan, SetChungChiDaNhan] = useState([]);

  // State cho danh sách dữ liệu từ các collection
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const formStates = {
    TenHienThi, SetTenHienThi,
    TenTaiKhoan, SetTenTaiKhoan,
    Loai, SetLoai,
    MatKhau, SetMatKhau,
    KhoaHocDangHoc, SetKhoaHocDangHoc,
    KhoaHocDaHT, SetKhoaHocDaHT,
    KhoaThi, SetKhoaThi,
    ChungChiDaNhan, SetChungChiDaNhan,
  };

  const [Accounts, SetAccounts] = useState([]);

  const routeAddress = 'account';
  const pageContent = 'tài khoản';
  const funcAdd = 'dang-ky';
  const funcFindAll = 'tat-ca-tai-khoan';
  const funcEdit = 'cap-nhat-tai-khoan';
  const funcDelete = 'xoa-tai-khoan';

  const fetchAccounts = () => {
    axios.get(`http://localhost:2025/api/${routeAddress}/${funcFindAll}`)
      .then(res => SetAccounts(res.data))
      .catch(err => console.error(`Lỗi khi lấy danh sách tài khoản:`, err.response?.data || err.message));
  };

  const fetchCourses = () => {
    axios.get(`http://localhost:2025/api/course/tat-ca-khoa-on`)
      .then(res => setCourses(res.data))
      .catch(err => console.error(`Lỗi khi lấy danh sách khóa học:`, err.response?.data || err.message));
  };

  const fetchExams = () => {
    axios.get(`http://localhost:2025/api/exam/tat-ca-dot-thi`)
      .then(res => setExams(res.data))
      .catch(err => console.error(`Lỗi khi lấy danh sách đợt thi:`, err.response?.data || err.message));
  };

  const fetchCertificates = () => {
    axios.get(`http://localhost:2025/api/certificate/tat-ca-chung-chi`)
      .then(res => setCertificates(res.data))
      .catch(err => console.error(`Lỗi khi lấy danh sách chứng chỉ:`, err.response?.data || err.message));
  };

  useEffect(() => {
    fetchAccounts();
    fetchCourses();
    fetchExams();
    fetchCertificates();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2025/api/${routeAddress}/${funcDelete}/${id}`);
      fetchAccounts();
    } catch (error) {
      console.error(`Lỗi khi xóa ${pageContent}:`, error.response?.data || error.message);
    }
  };

  const handleEdit = (row) => {
    SetTenHienThi(row.TenHienThi || '');
    SetTenTaiKhoan(row.TenTaiKhoan || '');
    SetLoai(row.Loai || '');
    SetMatKhau(row.MatKhau || '');
    SetKhoaHocDangHoc(row.KhoaHocDangHoc || []);
    SetKhoaHocDaHT(row.KhoaHocDaHT || []);
    SetKhoaThi(row.KhoaThi || []);
    SetChungChiDaNhan(row.KetQua || []);
    setEditingAccount({ _id: row._id, TenTaiKhoan: row.TenTaiKhoan });
  };

  const handleAdd = async () => {
    const newAccount = {
      TenHienThi,
      TenTaiKhoan,
      Loai,
      MatKhau,
      KhoaHocDangHoc,
      KhoaHocDaHT,
      KhoaThi,
      KetQua: ChungChiDaNhan,
    };

    try {
      // Tạo bản ghi Result cho mỗi Certificate được chọn
      const resultPromises = ChungChiDaNhan.map(async (certificateId) => {
        const result = await axios.post(`http://localhost:2025/api/result/them-ket-qua`, {
          IDNguoiDung: null, // Sẽ cập nhật sau
          IDChungChi: certificateId,
          Diem1: 0,
          Diem2: 0,
          NgayCap: new Date(),
          TrangThai: 'Chưa lấy',
        });
        return result.data.data._id;
      });

      const resultIds = await Promise.all(resultPromises);
      newAccount.KetQua = resultIds;

      const response = await axios.post(`http://localhost:2025/api/${routeAddress}/${funcAdd}`, newAccount);
      const accountId = response.data.data._id;

      // Cập nhật IDNguoiDung trong Result
      await Promise.all(
        resultIds.map((resultId) =>
          axios.put(`http://localhost:2025/api/result/cap-nhat-ket-qua/${resultId}`, { IDNguoiDung: accountId })
        )
      );

      fetchAccounts();
      resetForm();
    } catch (err) {
      console.error(`Lỗi khi thêm tài khoản:`, err.response?.data || err.message);
    }
  };

  const handleUpdate = async () => {
    if (!editingAccount) {
      console.error(`Không có ${pageContent} nào đang được chỉnh sửa`);
      return;
    }

    const updatedAccount = {
      TenHienThi,
      TenTaiKhoan,
      Loai,
      MatKhau,
      KhoaHocDangHoc,
      KhoaHocDaHT,
      KhoaThi,
      KetQua: ChungChiDaNhan,
    };

    try {
      // Tạo hoặc cập nhật bản ghi Result cho mỗi Certificate được chọn
      const resultPromises = ChungChiDaNhan.map(async (certificateId) => {
        const existingResult = await axios.get(`http://localhost:2025/api/result/tat-ca-ket-qua`);
        const matchingResult = existingResult.data.find(
          (result) => result.IDNguoiDung?.toString() === editingAccount._id && result.IDChungChi.toString() === certificateId
        );

        if (matchingResult) {
          return matchingResult._id;
        } else {
          const result = await axios.post(`http://localhost:2025/api/result/them-ket-qua`, {
            IDNguoiDung: editingAccount._id,
            IDChungChi: certificateId,
            Diem1: 0,
            Diem2: 0,
            NgayCap: new Date(),
            TrangThai: 'Chưa lấy',
          });
          return result.data.data._id;
        }
      });

      const resultIds = await Promise.all(resultPromises);
      updatedAccount.KetQua = resultIds;

      await axios.put(`http://localhost:2025/api/${routeAddress}/${funcEdit}/${editingAccount.TenTaiKhoan}`, updatedAccount);
      fetchAccounts();
      resetForm();
    } catch (err) {
      console.error(`Lỗi khi cập nhật tài khoản Say:`, err.response?.data || err.message);
    }
  };

  const resetForm = () => {
    SetTenHienThi('');
    SetTenTaiKhoan('');
    SetLoai('');
    SetMatKhau('');
    SetKhoaHocDangHoc([]);
    SetKhoaHocDaHT([]);
    SetKhoaThi([]);
    SetChungChiDaNhan([]);
    setEditingAccount(null);
  };

  const columns = [
    { label: 'Tên người dùng', key: 'TenHienThi' },
    { label: 'Tên tài khoản', key: 'TenTaiKhoan' },
    { label: 'Vai trò', key: 'Loai' },
    { label: 'Mật khẩu', key: 'MatKhau' },
    { label: 'Khóa học đang học', key: 'KhoaHocDangHoc' },
    { label: 'Khóa học đã hoàn thành', key: 'KhoaHocDaHT' },
    { label: 'Khóa thi', key: 'KhoaThi' },
    { label: 'Chứng chỉ đã nhận', key: 'KetQua' },
    { label: 'Thời gian khởi tạo', key: 'createdAt', isDate: true },
    { label: 'Lần sửa cuối', key: 'updatedAt', isDate: true },
    { label: 'Sửa', key: 'editButton', isAction: 'edit' },
    { label: 'Xóa', key: 'deleteButton', isAction: 'delete' },
  ];

  const columnsCanEdit = [
    { key: 'TenHienThi', label: 'Tên người dùng', type: 'text' },
    { key: 'TenTaiKhoan', label: 'Tên tài khoản', type: 'text' },
    {
      key: 'Loai',
      label: 'Vai trò',
      type: 'select',
      options: [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
      ],
      multiple: false,
    },
    { key: 'MatKhau', label: 'Mật khẩu', type: 'text' },
    {
      key: 'KhoaHocDangHoc',
      label: 'Khóa học đang học',
      type: 'select',
      options: courses.map(course => ({
        value: course._id || '',
        label: course.TenChungChi || 'Không xác định',
      })),
      multiple: true,
    },
    {
      key: 'KhoaHocDaHT',
      label: 'Khóa học đã hoàn thành',
      type: 'select',
      options: courses.map(course => ({
        value: course._id || '',
        label: course.TenChungChi || 'Không xác định',
      })),
      multiple: true,
    },
    {
      key: 'KhoaThi',
      label: 'Khóa thi',
      type: 'select',
      options: exams.map(exam => ({
        value: exam._id || '',
        label: exam.TenChungChi || 'Không xác định',
      })),
      multiple: true,
    },
    {
      key: 'ChungChiDaNhan',
      label: 'Chứng chỉ đã nhận',
      type: 'select',
      options: certificates.map(certificate => ({
        value: certificate._id || '',
        label: certificate.TenChungChi || 'Không xác định',
      })),
      multiple: true,
    },
  ];

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
  );
}

export default QLNguoiDung;