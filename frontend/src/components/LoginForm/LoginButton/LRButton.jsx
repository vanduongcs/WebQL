// MUI
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function LRButton({ content, onClick }) {
  return (
    <Button variant='contained' sx={{ opacity: 1, width: '30%' }} onClick={onClick}>
      <Typography sx={{ px: 2, py: 0.25, fontWeight: 'bold' }} variant='button' gutterBottom>
        { content }
      </Typography>
    </Button>
  )
}

export default LRButton
