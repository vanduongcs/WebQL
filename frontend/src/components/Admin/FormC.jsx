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
import FieldC from './FieldC.jsx'

function FormC({ editingItem, clearEditing, fetchFunc, pageContent, funcAdd, funcEdit, routeAddress }) {


  const [Loai, SetLoai] = useState('')
  const [TenChungChi, SetTenChungChi] = useState('')
  const [LePhiThi, SetLePhiThi] = useState('')
  const [CapDo, SetCapDo] = useState('')

  useEffect(() => {
    if (editingItem) {
      SetLoai(editingItem.Loai || '')
      SetTenChungChi(editingItem.TenChungChi || '')
      SetLePhiThi(editingItem.LePhiThi || '')
      SetCapDo(editingItem.CapDo || '')
    } else {
      SetLoai('')
      SetTenChungChi('')
      SetLePhiThi('')
      SetCapDo('')
    }
  }, [editingItem])

  const handleChange = (event) => {
    SetLoai(event.target.value) 
  }

  const handleEdit = async () => {
    const data = { Loai, TenChungChi, LePhiThi: Number(LePhiThi), CapDo }
    
    try {
      await axios.put(`http://localhost:2025/api/${ routeAddress }/${ funcEdit }/${ editingItem._id }`, data)
      clearEditing()
      fetchFunc()
      SetLoai('')
      SetTenChungChi('')
      SetLePhiThi('')
      SetCapDo('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleAdd = async () => {
    const data = { Loai, TenChungChi, LePhiThi: Number(LePhiThi), CapDo }
    try {
      await axios.post(`http://localhost:2025/api/${ routeAddress }/${ funcAdd }/`, data)
      fetchFunc()

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
          <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 'bold', cursor: 'default' }}>
            {editingItem ? `Chỉnh sửa ${ pageContent }` : `Quản lý ${ pageContent }`}
          </Typography>
          <FieldC val={ TenChungChi } func={ SetTenChungChi } label={ `Tên ${ pageContent }` }/>   
          <FormControl fullWidth>
            <InputLabel  id='cer-type'>Loại</InputLabel>
            <Select
              labelId='cer-type'
              label='Loai'
              value={ Loai }
              onChange={handleChange}
              MenuProps={{ disableScrollLock: true }}
              >
                <MenuItem value={'Tin học'}>Tin học</MenuItem>
                <MenuItem value={'Ngoại ngữ'}>Ngoại ngữ</MenuItem>
            </Select>
          </FormControl>
          <FieldC val={ LePhiThi } func={ SetLePhiThi } label={ 'Lệ phí thi' }/>          
          <FieldC val={ CapDo } func={ SetCapDo } label={ 'Cấp bậc' }/>
          <Button variant='contained' onClick={handleAdd}>Thêm</Button>
          <Button variant='contained' onClick={handleEdit}>Sửa</Button>
        </Box>
  )
}

export default FormC
