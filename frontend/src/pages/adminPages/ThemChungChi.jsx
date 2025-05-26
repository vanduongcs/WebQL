import React, { useState } from 'react'

// MUI
import Box from '@mui/material/Box'
import Table from '@mui/material/Table' 
import TableContainer from '@mui/material/TableContainer' 

// Custome
import FormC from '../../components/Admin/ThemChungChi/FormC.jsx'
import TableBodyC from '../../components/Admin/ThemChungChi/TableBodyC.jsx'
import TableHeaderC from '../../components/Admin/ThemChungChi/TableHeaderC.jsx'

function ThemChungChi() {

  const [editingCertificate, setEditingCertificate] = useState(null)

  const handleEdit = (certificate) => {
    setEditingCertificate(certificate)
  }

  const clearEditing = () => {
    setEditingCertificate(null)
  }

  return (
    <Box 
      sx={{
        width: '100vw',
        height: '1200px',
        bgcolor: (theme) => theme.palette.background.default,
        display: 'flex',
        gap: '5%',
        px: '2%'
      }}
    >
      {/* Left table */}
      <Box sx={{height: 'calc(100% - 40px)', width: '80%', m: '20px 20px 20px -12px'}}>
        <TableContainer sx={{ boxShadow: 4, borderRadius: '4px', maxHeight: 'calc(100% - 40px)' }}>
          <Table sx={{ width: '100%', bgcolor: (theme) => theme.palette.background.paper}}>  
            <TableHeaderC />
            <TableBodyC onEdit={handleEdit} />
          </Table>
        </TableContainer>
      </Box>

      {/* Right Form */}
      <Box
        sx={{
          minWidth: '300px',
          width: '20%',
          height: 'calc(100% - 36px)',
          mt: '20px',
          boxShadow: 4,
          borderRadius: '4px',
          backgroundColor: (theme) => theme.palette.background.paper,
          p: '18px'
        }}>
        <FormC 
          editingCertificate={editingCertificate} 
          clearEditing={clearEditing} 
        />
      </Box>
      
    </Box>
  ) 
}

export default ThemChungChi