import { useTheme } from '@mui/material/styles'

// MUI
import Box from '@mui/material/Box'

// Custome
import ModeSelector from './ModeSelector/ModeSelector.jsx'
import ExtendMenu from './ExtendMenu/ExtendMenu.jsx'
import IconButton from '@mui/material/IconButton'
import NavButton from './NavButton/NavButton.jsx'
import ProfileUser from './ProfileUser/ProfileUser.jsx'




function NavBar() {
  const theme = useTheme()
  
  return (
    <Box
      sx={{
        alignItems: 'center',
        height: (theme) => theme.nlcs.navBarHeight,
        width: '100%',
      }}
    >
      {/* NavBar background */}
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.primary.dark),
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Button system */}
        {/* Left */}
        <Box
          sx={{
            mx: 2,
            display: 'flex',
            alignItems: 'center',
            height: '100%'
          }}>
          <IconButton
            disableRipple
            sx={{
              height: '100%',
              '&:hover': {
                bgcolor: 'transparent'
              },
            }}>
            <img 
              src='/Logo.svg' 
              alt='logo' 
              style={{ height: '100%' }}
            />
          </IconButton>

            <Box
              sx={{
                display: {
                  xs: 'inline-flex',
                  sm: 'inline-flex',
                  md: 'inline-flex',
                  lg: 'none'
                },
                alignItems: 'center'
              }}>
            <ExtendMenu />
          </Box>

          {/* List Button */}
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'none',
                lg: 'flex',
              },
              alignItems: 'center',
              gap: 2,
              ml: 2
            }}
          >
            <NavButton content='Trang Chủ' path='/trang-chu'/>
            <NavButton content='Thông Tin' children1='Ngoại ngữ' children2='Tin học' childrenPath1='/chung-chi-ngoai-ngu' childrenPath2='/chung-chi-tin-hoc'/>
            <NavButton content='Ghi Danh' children1='Ghi danh thi' children2='Đăng ký ôn' childrenPath1='/dang-ky-thi' childrenPath2='/dang-ky-khoa-on'/>
            <NavButton content='Kết Quả' path='/ket-qua'/>
            <NavButton content='Xác Thực' path='/xac-thuc-chung-chi'/>
          </Box>
        </Box>

        {/* Right */}
        <Box
          sx={{
            mx: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: '#f5f6fa'
          }}>
            <ModeSelector Input={theme.palette.mode} />
            <ProfileUser />
        </Box>
      </Box>
    </Box>
  )
}

export default NavBar
