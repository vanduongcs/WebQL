import Box from '@mui/material/Box'
import React from 'react'
import { useTheme } from '@mui/material/styles'

// Custome style import
import NavButton from './NavButton/NavButton.jsx'
import ModeSelector from './ModeSelector/ModeSelector.jsx'
import ExtendMenu from './ExtendMenu/ExtendMenu.jsx'


function NavBar() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        alignItems: 'center',
        height: '60px',
        width: '100vw',
      }}>
      {/* NavBar background */}
      <Box
      sx={{
        bgcolor: (theme) => (theme.palette.primary.dark),
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Button system */}
        {/* Left */}
        <Box
          sx={{
            mx: 2,
            display: 'flex',
            alignItems: 'center'
          }}>
          <ExtendMenu />
        </Box>
        {/* Right */}
        <Box
          sx={{
            mx: 2,
            display: 'flex',
            alignItems: 'center'
          }}>
            <ModeSelector Input={theme.palette.mode} />
        </Box>
      </Box>
    </Box>
  )
}

export default NavBar
