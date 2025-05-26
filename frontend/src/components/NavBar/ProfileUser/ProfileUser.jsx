import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'

function ProfileUser() {

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const open = Boolean(anchorEl)

  const navigate = useNavigate()

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('account')
    navigate('/');
  }

  const testName = 'Zen'
  const testAccount = 'test'
  const testRole = 'user'
  
  return (
    <Box>
      <IconButton
      id='profile-button'
      aria-controls ={ open ? 'profile-menu': undefined }
      aria-haspopup = 'true'
      aria-expanded = { open ? 'true' : undefined }
      onClick={ handleClick }
      >
        <AccountCircleIcon sx={{color: '#f5f6fa'}}/>
      </IconButton>
      <Menu
        id='profile-menu'
        anchorEl={ anchorEl }
        open = { open }
        onClose={ handleClose }
        sx={{
          mt: 1.25
        }}
        >
          <MenuItem onClick={ handleClose } >
            <Typography variant="subtitle1">Tên người dùng: {testName}</Typography>
          </MenuItem>

          <MenuItem onClick={ handleClose } >
            <Typography variant="subtitle1">Tài khoản: {testAccount}</Typography>
          </MenuItem>

          <MenuItem onClick={ handleClose } >
            <Typography variant="subtitle1">Vai trò: {testRole}</Typography>
          </MenuItem>

           <MenuItem onClick={ handleLogOut } >
            <Typography variant="subtitle1">Đăng xuất</Typography>
          </MenuItem>
      </Menu>
    </Box>
  )
}

export default ProfileUser
