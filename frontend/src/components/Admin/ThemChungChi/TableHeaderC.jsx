import React from 'react'

// MUI
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

function TableHeaderC(){
  const ListItems =
    [
    'Tên chứng chỉ',
    'Loại',
    'Lệ phí thi',
    'Cấp bậc',
    'Thời gian khởi tạo',
    'Lần sửa cuối',
    'Sửa',
    'Xóa'
    ]
  return (
    <TableHead>
      <TableRow>
        {ListItems.map((col) => (
          <TableCell sx={{ fontWeight: 'bold' }}>{col}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeaderC
