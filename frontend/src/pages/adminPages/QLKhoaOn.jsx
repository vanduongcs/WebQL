import { useState, useEffect } from 'react';
import axios from 'axios';
import PageComponent from '../../components/Admin/pageComponent/PageComponent.jsx';
import CourseForm from '../../components/Form/CourseForm.jsx';

function QLKhoaOn() {
  const FormName = CourseForm;
  const [EditingCourse, SetEditingCourse] = useState(null);
  const [Courses, SetCourses] = useState([]);
  const [Certificates, SetCertificates] = useState([]);

  const [TenChungChi, SetTenChungChi] = useState('');
  const [Loai, SetLoai] = useState('');
  const [HocPhi, SetHocPhi] = useState('');
  const [LichHoc, SetLichHoc] = useState('');
  const [NgayKhaiGiang, SetNgayKhaiGiang] = useState('');
  const [NgayKetThuc, SetNgayKetThuc] = useState('');
  const [Buoi, SetBuoi] = useState('');
  const [SiSoToiDa, SetSiSoToiDa] = useState('');
  const [SiSoHienTai, SetSiSoHienTai] = useState('');

  const formStates = {
    TenChungChi, SetTenChungChi,
    Loai, SetLoai,
    HocPhi, SetHocPhi,
    LichHoc, SetLichHoc,
    NgayKhaiGiang, SetNgayKhaiGiang,
    NgayKetThuc, SetNgayKetThuc,
    Buoi, SetBuoi,
    SiSoToiDa, SetSiSoToiDa,
    SiSoHienTai, SetSiSoHienTai,
  };

  const routeAddress = 'course';
  const pageContent = 'khóa ôn';
  const funcAdd = 'them-khoa-on';
  const funcFindAll = 'tat-ca-khoa-on';
  const funcEdit = 'cap-nhat-khoa-on';
  const funcDelete = 'xoa-khoa-on';

  // Lấy danh sách khóa ôn
  const fetchCourses = () => {
    axios.get(`http://localhost:2025/api/${routeAddress}/${funcFindAll}`)
      .then(res => SetCourses(res.data))
      .catch(err => console.error(err));
  };

  // Lấy danh sách chứng chỉ
  const fetchCertificates = () => {
    axios.get(`http://localhost:2025/api/certificate/tat-ca-chung-chi`)
      .then(res => SetCertificates(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCourses();
    fetchCertificates();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2025/api/${routeAddress}/${funcDelete}/${id}`);
      fetchCourses();
    } catch (err) {
      console.error('Lỗi xóa:', err);
    }
  };

  const handleEdit = (row) => {
    const selectedCertificate = Certificates.find(cert => cert.TenChungChi === row.TenChungChi);
    SetTenChungChi(selectedCertificate ? selectedCertificate._id : '');
    SetLoai(row.Loai || '');
    SetHocPhi(row.HocPhi?.toString() || '');
    SetLichHoc(row.LichHoc || '');
    SetNgayKhaiGiang(row.NgayKhaiGiang ? new Date(row.NgayKhaiGiang).toISOString().slice(0, 10) : '');
    SetNgayKetThuc(row.NgayKetThuc ? new Date(row.NgayKetThuc).toISOString().slice(0, 10) : '');
    SetBuoi(row.Buoi || '');
    SetSiSoToiDa(row.SiSoToiDa?.toString() || '');
    SetSiSoHienTai(row.SiSoHienTai?.toString() || '');
    SetEditingCourse(row._id);
  };

  const handleCertificateSelect = (certificateId) => {
    const selectedCertificate = Certificates.find(cert => cert._id === certificateId);
    if (selectedCertificate) {
      SetTenChungChi(certificateId);
      SetLoai(selectedCertificate.Loai || '');
    } else {
      SetTenChungChi('');
      SetLoai('');
    }
  };

  const handleAdd = () => {
    const selectedCertificate = Certificates.find(cert => cert._id === TenChungChi);
    if (!selectedCertificate || !NgayKhaiGiang || !NgayKetThuc || !Buoi || !SiSoToiDa || !LichHoc) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc!');
      return;
    }

    const siSoToiDaNum = Number(SiSoToiDa);
    const siSoHienTaiNum = Number(SiSoHienTai) || 0;

    if (siSoToiDaNum < 1 || siSoToiDaNum > 40 || siSoHienTaiNum < 0 || siSoHienTaiNum > 40) {
      alert('Sĩ số tối đa và hiện tại phải nằm trong khoảng từ 0 đến 40!');
      return;
    }

    const newCourse = {
      TenChungChi: selectedCertificate.TenChungChi,
      Loai: selectedCertificate.Loai,
      HocPhi: Number(HocPhi) || 0,
      LichHoc,
      NgayKhaiGiang: new Date(NgayKhaiGiang),
      NgayKetThuc: new Date(NgayKetThuc),
      Buoi,
      SiSoToiDa: siSoToiDaNum,
      SiSoHienTai: siSoHienTaiNum,
    };

    console.log('Dữ liệu gửi:', newCourse); // Ghi log để kiểm tra

    axios.post(`http://localhost:2025/api/${routeAddress}/${funcAdd}`, newCourse)
      .then(() => {
        fetchCourses();
        resetForm();
      })
      .catch(err => console.error('Lỗi thêm khóa ôn:', err));
  };

  const handleUpdate = () => {
    if (!EditingCourse) return;

    const selectedCertificate = Certificates.find(cert => cert._id === TenChungChi);
    if (!selectedCertificate || !NgayKhaiGiang || !NgayKetThuc || !Buoi || !SiSoToiDa || !LichHoc) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc!');
      return;
    }

    const siSoToiDaNum = Number(SiSoToiDa);
    const siSoHienTaiNum = Number(SiSoHienTai) || 0;

    if (siSoToiDaNum < 1 || siSoToiDaNum > 40 || siSoHienTaiNum < 0 || siSoHienTaiNum > 40) {
      alert('Sĩ số tối đa và hiện tại phải nằm trong khoảng từ 0 đến 40!');
      return;
    }

    const updated = {
      TenChungChi: selectedCertificate.TenChungChi,
      Loai: selectedCertificate.Loai,
      HocPhi: Number(HocPhi) || 0,
      LichHoc,
      NgayKhaiGiang: new Date(NgayKhaiGiang),
      NgayKetThuc: new Date(NgayKetThuc),
      Buoi,
      SiSoToiDa: siSoToiDaNum,
      SiSoHienTai: siSoHienTaiNum,
    };

    axios.put(`http://localhost:2025/api/${routeAddress}/${funcEdit}/${EditingCourse}`, updated)
      .then(() => {
        fetchCourses();
        resetForm();
      })
      .catch(err => console.error(err));
  };

  const resetForm = () => {
    SetTenChungChi('');
    SetLoai('');
    SetHocPhi('');
    SetLichHoc('');
    SetNgayKhaiGiang('');
    SetNgayKetThuc('');
    SetBuoi('');
    SetSiSoToiDa('');
    SetSiSoHienTai('');
    SetEditingCourse(null);
  };

  const columns = [
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
    { label: 'Xóa', key: 'deleteButton', isAction: 'delete' },
  ];

  const columnsCanEdit = [
    {
      label: 'Tên chứng chỉ',
      key: 'TenChungChi',
      type: 'select',
      options: Certificates.map(cert => ({
        value: cert._id,
        label: cert.TenChungChi,
        Loai: cert.Loai,
      })),
      onChange: handleCertificateSelect,
      multiple: false,
    },
    {
      label: 'Loại',
      key: 'Loai',
      type: 'text'
    },
    { label: 'Học phí', key: 'HocPhi', type: 'number' }, // Đổi thành type number để phù hợp
    {
      label: 'Lịch học',
      key: 'LichHoc',
      type: 'select',
      options: [
        { value: 'T2 - T4 - T6', label: 'T2 - T4 - T6' },
        { value: 'T3 - T5 - T7', label: 'T3 - T5 - T7' },
      ],
      multiple: false,
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
        { value: 'Tối', label: 'Tối' },
      ],
      multiple: false,
    },
    { label: 'Sĩ số tối đa', key: 'SiSoToiDa', type: 'number' },
    { label: 'Sĩ số hiện tại', key: 'SiSoHienTai', type: 'number' },
  ];

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
  );
}

export default QLKhoaOn;