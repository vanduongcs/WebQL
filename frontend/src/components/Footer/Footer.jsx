// MUI
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <Box
      sx={{
        height: (theme) => theme.nlcs.footerHeight,
        backgroundColor: (theme) => (theme.palette.info.dark),
        color: '#f5f6fa'
      }}>
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: '40px'
          }}>
          {/* Left Box */}
          <Box
            sx={{
              width: 'calc(100%/3)',
              '@media (max-width:1111px)': {
                width: '100%',
                px: '20px',
                textAlign: 'center',
              }
            }}
          >
            <Box>
              <img style={{ height: '60px' }} src='/footer_logo.png' alt='' />
            </Box>
            <Box>
              <Typography sx={{ my: 2}} variant='h6'><LocationOnIcon /> Khu 2, Đ. 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. CT</Typography>
              <Typography sx={{ my: 2}} variant='h6'><EmailIcon /> vanb2207577@student.ctu.edu.vn</Typography>
              <Typography sx={{ my: 2}} variant='h6'><LocalPhoneIcon /> 0813 536 314</Typography>
            </Box>
          </Box>

          {/* Center Box */}
          <Box
            sx={{
              width: 'calc(100%/3)',
              '@media (max-width:1111px)': {
                width: '100%',
                p: '20px 0',
                textAlign: 'center',
              }
            }}>
            <Typography sx={{ my: 2}} variant='h5'>Lịch làm việc</Typography>
            <Typography sx={{ my: 2}} variant='h6'>Từ thứ hai - thứ sáu:</Typography>
            <Typography sx={{ my: 2}} variant='body1'>- Sáng: từ 07:30 đến 11:30</Typography>
            <Typography sx={{ my: 2}} variant='body1'>- Chiều: từ 13:30 đến 17:30</Typography>
            <Typography sx={{ my: 2}} variant='body1'>- Tối: từ 17:45 đến 20:45</Typography>
          </Box>

          {/* Right Box */}
          <Box
            sx={{
              width: 'calc(100%/3)',
              '@media (max-width:1111px)': {
                width: '100%',
                p: '20px 0',
                textAlign: 'center',
              }
            }}>
            <Typography sx={{ my: 2}} variant='h5'>Lịch làm việc</Typography>
            <Typography sx={{ my: 2}} variant='h6'>Từ thứ bảy, chủ nhật:</Typography>
            <Typography sx={{ my: 2}} variant='body1'>- Sáng: từ 06:45 đến 11:45</Typography>
            <Typography sx={{ my: 2}} variant='body1'>- Chiều: từ 13:30 đến 16:30</Typography>
            <Typography sx={{ my: 2}} variant='body1'>- Tối: từ 17:30 đến 20:30</Typography>
            <Typography sx={{ my: 2}} variant='body1'>(Lưu ý tối chủ nhật không làm việc)</Typography>
          </Box>
        </Box>
    </Box>
  )
}

export default Footer
