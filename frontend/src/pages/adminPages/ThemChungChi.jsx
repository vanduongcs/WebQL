import React, { useState } from 'react'

// MUI
import Box from '@mui/material/Box'
import Table from '@mui/material/Table' 
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import TableContainer from '@mui/material/TableContainer' 

// Custome
import TableBodyC from '../../components/Admin/ThemChungChi/TableBodyC.jsx'
import TableHeaderC from '../../components/Admin/ThemChungChi/TableHeaderC.jsx'

function ThemChungChi() {

  const [Loai, SetLoai] = useState('')
  const [TenChungChi, SetTenChungChi] = useState('')
  const [LePhiThi, SetLePhiThi] = useState()
  const [CapDo, SetCapDo] = useState('')

  const handleChange = (event) => {
    SetLoai(event.target.value) 
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
      <Box sx={{height: '100%', width: '60%', p: '20px',}}>
        <TableContainer sx={{ boxShadow: 4, borderRadius: '4px', maxHeight: 'calc(100%)' }}>
          <Table sx={{ width: '100%', bgcolor: (theme) => theme.palette.background.paper}}>  
            <TableHeaderC />
            <TableBodyC />
          </Table>
        </TableContainer>
      </Box>

      {/* Right Form */}
      <Box
        sx={{
          width: '33%',
          height: 'calc(100% - 36px)',
          mt: '20px',
          boxShadow: 4,
          borderRadius: '4px',
          backgroundColor: (theme) => theme.palette.background.paper,
          p: '18px'
        }}>
          
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
          <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Thêm chứng chỉ mới
          </Typography>
          <TextField
            id='cer-name'
            value={ TenChungChi }
            onChange={(e) => SetTenChungChi(e.target.value)}
            label='Tên chứng chỉ'
            variant='outlined' 
            sx={{ width: '100%'}}
          />
          <FormControl fullWidth>
            <InputLabel id='cer-type'>Loại</InputLabel>
            <Select
              labelId='cer-type'
              id='cer-type-select'
              value={ Loai }
              label='Loai'
              onChange={handleChange}
              >
              <MenuItem value={'Tin học'}>Tin học</MenuItem>
              <MenuItem value={'Ngoại ngữ'}>Ngoại ngữ</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id='cer-fee'
            value={ LePhiThi }
            onChange={(e) => SetLePhiThi(e.target.value)}
            label='Lệ Phí Thi'
            variant='outlined' 
            sx={{ width: '100%'}}
            />
          <TextField
            id='cer-level'
            value={ CapDo }
            onChange={(e) => SetCapDo(e.target.value)}
            label='Cấp bậc'
            variant='outlined' 
            sx={{ width: '100%'}}
            />
          <Button variant='contained'>Thêm</Button>
        </Box>
      </Box>
      
    </Box>
  ) 
}

export default ThemChungChi