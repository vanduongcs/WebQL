import React from 'react'

// MUI
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

function TableHeaderC() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Tên chứng chỉ</TableCell>
        <TableCell>Loại</TableCell>
        <TableCell>Lệ phí thi</TableCell>
        <TableCell>Cấp bậc</TableCell>
        <TableCell>Sửa</TableCell>
        <TableCell>Xóa</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default TableHeaderC
