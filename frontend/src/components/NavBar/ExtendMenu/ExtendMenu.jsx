import React from 'react'
import ReorderIcon from '@mui/icons-material/Reorder'
import { useNavigate } from 'react-router-dom'

// MUI
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

function ExtendMenu() {

  const navigate = useNavigate()

  const [open, setOpen] = React.useState(false)

  const openDrawer = (newOpen) => () => {
    setOpen(newOpen);
  }

  const Items = [
    {text: 'Trang chủ', path: '/trang-chu'},
    {text: 'Đợt thi', path: '/dot-thi'},
    {text: 'Lịch khai giảng', path: '/lich-khai-giang'},
    {text: 'Đăng ký khóa ôn', path: '/dang-ky-khoa-on'},
    {text: 'Đăng ký thi', path: '/dang-ky-thi'},
    {text: 'Kết quả', path: '/ket-qua'},
    {text: 'Xác thực chứng chỉ', path: '/xac-thuc-chung-chi'},
    {text: 'Chứng chỉ ngoại ngữ', path: '/chung-chi-ngoai-ngu'},
    {text: 'Chứng chỉ tin học', path: '/chung-chi-tin-hoc'}
  ]

  const ItemList = (
    <Box
      role='presentation'
      onClick={ openDrawer(false) }
      sx={{
        width: '250px'
      }}>
      <List>
        {Items.map(({ text, path }) => (
          <ListItem key={ text } disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(path)
                setOpen(false)
              }}>
              <ListItemText primary={ text }/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box>
      <IconButton
        onClick={openDrawer(true)}
        sx={{
          borderRadius: '8px',
          color: '#f5f6fa'
        }}>
            <ReorderIcon />
        </IconButton>
        <Drawer
          open={ open }
          onClose={ openDrawer(false) }>
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton 
                  onClick={openDrawer(false)} 
                  sx={{ borderRadius: '5px' }}
                >
                  <CloseIcon />
                </IconButton>
            </Box>
            { ItemList }
        </Drawer>
    </Box>
  )
}

export default ExtendMenu
