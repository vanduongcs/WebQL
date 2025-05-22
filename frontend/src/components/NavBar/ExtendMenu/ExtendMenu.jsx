import React from 'react'
import Box from '@mui/material/Box'
import ReorderIcon from '@mui/icons-material/Reorder'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'

function ExtendMenu() {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  const hoverColor = isDarkMode ? '#3d4d682b' : '#0f154263'

  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  const openDrawer = (newOpen) => () => {
    setOpen(newOpen);
  }

  const Items = [
    {text: 'Trang chủ', path: '/trang-chu'},
    {text: 'Đợt thi', path: 'dot-thi'},
    {text: 'Lịch khai giảng', path: 'lich-khai-giang'},
    {text: 'Đăng ký khóa ôn', path: 'dang-ky-khoa-on'},
    {text: 'Đăng ký thi', path: 'dang-ky-thi'},
    {text: 'Kết quả', path: 'ket-qua'},
    {text: 'Xác thực chứng chỉ', path: 'xac-thuc-chung-chi'},
    {text: 'Thông tin chung', path: 'thong-tin-chung'}
  ]

  const ItemList = (
    <Box
      role="presentation"
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
          color: '#f5f6fa',
          '&:hover': {
            bgcolor: hoverColor
          }
        }}>
            <ReorderIcon />
        </IconButton>
        <Drawer
          open={ open }
          onClose={ openDrawer(false) }>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <IconButton
                  onClick={openDrawer(false)}
                  sx={{
                    borderRadius: '5px'
                  }}>
                  <CloseIcon />
                </IconButton>
            </Box>
          { ItemList }
        </Drawer>
    </Box>
  )
}

export default ExtendMenu
