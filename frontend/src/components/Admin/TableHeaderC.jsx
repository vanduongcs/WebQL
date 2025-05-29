import React from 'react'

// MUI
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

function TableHeaderC({ header }) {
  return (
    <TableHead>
      <TableRow>
        {header.map((col) => (
          <TableCell key={col.key} sx={{ fontWeight: 'bold' }}>
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeaderC
