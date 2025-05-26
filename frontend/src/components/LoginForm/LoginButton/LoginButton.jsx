// MUI
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function LoginButton({ content, onClick }) {
  return (
    <Button variant="contained" sx={{ opacity: 1, width: '30%', mt: 2 }} onClick={onClick}>
      <Typography sx={{ px: 2, py: 0.25, m: 0, fontWeight: 'bold', color: '#f5f6fa' }} variant="button" gutterBottom>
        { content }
      </Typography>
    </Button>
  )
}

export default LoginButton
