import { useState, useEffect } from 'react'

// MUI
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// Extend
import axios from 'axios'

function TableBodyC() {

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
          <TableCell><EditIcon sx={iconStyle} /></TableCell>
          <TableCell><DeleteIcon sx={iconStyle} /></TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TableBodyC
