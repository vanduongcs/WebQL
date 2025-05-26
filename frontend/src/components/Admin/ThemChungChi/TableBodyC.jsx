import { useState, useEffect } from 'react'

// MUI
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// Extend
import axios from 'axios'

const changeTimeType = (timeStr) => {
  return new Date(timeStr).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

function TableBodyC({ onEdit }) {

  const handleDelete = async (id) => {
  if (!window.confirm('Bạn có chắc muốn xóa chứng chỉ này?')) return;

  try {
    await axios.delete(`http://localhost:2025/api/certificate/xoa-chung-chi/${id}`);

    // Sau khi xóa, gọi lại hàm lấy danh sách chứng chỉ để refresh bảng
    // fetchCertificates();

  } catch (error) {
    console.error('Lỗi khi xóa chứng chỉ:', error.response?.data || error.message);
  }
}

  const iconStyle = {
    color: (theme) => theme.palette.text.primary,
    cursor: 'pointer'
  }

  const [certificate, SetCertificate] = useState([])

  useEffect(() => {
    axios.get('http://localhost:2025/api/certificate/lay-tat-ca-chung-chi')
      .then(res => SetCertificate(res.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <TableBody>
      {certificate.map((row, index) => (
        <TableRow
          key={row._id}
        >
          <TableCell>{row.TenChungChi}</TableCell>
          <TableCell>{row.Loai}</TableCell>
          <TableCell>{row.LePhiThi}</TableCell>
          <TableCell>{row.CapDo}</TableCell>
          <TableCell>{changeTimeType(row.createdAt)}</TableCell>
          <TableCell>{changeTimeType(row.updatedAt)}</TableCell>
          <TableCell><EditIcon sx={iconStyle} onClick={() => onEdit(row)}/></TableCell>
          <TableCell><DeleteIcon sx={iconStyle} onClick={() => handleDelete(row._id)}/></TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TableBodyC
