// MUI
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function GTRButton({ content, onClick }) {
  return (
    <Button variant='outlined' sx={{ opacity: 1, width: '50%' }} onClick={ onClick }>
      <Typography sx={{ px: 2, py: 0.25, m: 0, fontWeight: 'bold' }} variant='button' gutterBottom>
        { content }
      </Typography>
    </Button>
  )
}

export default GTRButton
