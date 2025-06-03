import { useState } from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'

// Custom
import TableHeaderCustome from './TableHeaderCustome.jsx'
import TableBodyCustome from './TableBodyCustome.jsx'

function TableCustome({ columns, rows, handleDelete, handleEdit }) {
  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage)
  const totalPages = Math.ceil(rows.length / rowsPerPage)

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <Box>
      <TableContainer
        sx={{
          bgcolor: (theme) => theme.palette.background.paper,
          boxShadow: (theme) => (theme.palette.mode === 'dark' ? '0 4px 10px rgba(243, 243, 243, 0.31)' : 12),
          borderRadius: 2
        }}
      >
        <Table>
          <TableHeaderCustome columns={columns} />
          <TableBodyCustome
            rows={paginatedRows}
            columns={columns}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color='primary'
        />
      </Box>
    </Box>
  )
}

export default TableCustome