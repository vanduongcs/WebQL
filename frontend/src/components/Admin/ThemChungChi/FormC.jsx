import { useState, useEffect } from 'react'
import axios from 'axios'

// MUI
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'

// Custome
import FieldC from './FieldC/FieldC.jsx'

function FormC({ editingCertificate, clearEditing }) {

  const [Loai, SetLoai] = useState('')
  const [TenChungChi, SetTenChungChi] = useState('')
  const [LePhiThi, SetLePhiThi] = useState('')
  const [CapDo, SetCapDo] = useState('')

  useEffect(() => {
    if (editingCertificate) {
      SetLoai(editingCertificate.Loai || '')
      SetTenChungChi(editingCertificate.TenChungChi || '')
      SetLePhiThi(editingCertificate.LePhiThi || '')
      SetCapDo(editingCertificate.CapDo || '')
    } else {
      // Nếu ko có certificate nào thì reset form
      SetLoai('')
      SetTenChungChi('')
      SetLePhiThi('')
      SetCapDo('')
    }
  }, [editingCertificate])

  const handleChange = (event) => {
    SetLoai(event.target.value) 
  }

  const handleSubmit = async () => {
    const data = { Loai, TenChungChi, LePhiThi: Number(LePhiThi), CapDo }

    try {
      if (editingCertificate) {
        // Gọi API sửa
        await axios.put(`http://localhost:2025/api/certificate/cap-nhat-chung-chi/${ editingCertificate._id }`, data)
        clearEditing()
      } else {
        // Gọi API thêm mới
        await axios.post(`http://localhost:2025/api/certificate/them-chung-chi/`, data)
      }

      // Reset form sau khi submit
      SetLoai('')
      SetTenChungChi('')
      SetLePhiThi('')
      SetCapDo('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
          <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Thêm chứng chỉ mới
          </Typography>
          <FieldC val={ TenChungChi } func={ SetTenChungChi } label={ 'Tên chứng chỉ' }/>   
          <FormControl fullWidth>
            <InputLabel id='cer-type'>Loại</InputLabel>
            <Select
              labelId='cer-type'
              label='Loai'
              value={ Loai }
              onChange={handleChange}
              >
              <MenuItem value={'Tin học'}>Tin học</MenuItem>
              <MenuItem value={'Ngoại ngữ'}>Ngoại ngữ</MenuItem>
            </Select>
          </FormControl>
          <FieldC val={ LePhiThi } func={ SetLePhiThi } label={ 'Lệ phí thi' }/>          
          <FieldC val={ CapDo } func={ SetCapDo } label={ 'Cấp bậc' }/>
          <Button variant='contained' onClick={handleSubmit}>{ editingCertificate ? 'Sửa' : 'Thêm' }</Button>
        </Box>
  )
}

export default FormC
