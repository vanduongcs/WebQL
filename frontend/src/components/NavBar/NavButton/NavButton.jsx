import Button from '@mui/material/Button'
import React from 'react'

function NavButton({ content, icon, onClick }) {
  return (
    <Button 
      variant='outlined'
      onClick={onClick}
      sx={{
        color: '#f5f6fa',
        borderColor: '#f5f6fa',
        height: '35px',
        fontWeight: 'bold',
        '&:hover': {
        borderColor: '#f5f6fa'
        }
      }}>
      { content || icon }
    </Button>
  )
}

export default NavButton
