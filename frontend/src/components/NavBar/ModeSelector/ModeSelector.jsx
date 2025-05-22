import React from 'react'
import NavButton from '../NavButton/NavButton'
import { useColorScheme } from '@mui/material'

function ModeSelector({ Input }) {
  const { mode, setMode } = useColorScheme()
  const handleChangeMode = () => {
    mode == 'light' ? setMode('dark') : setMode('light')
  }
  return (
    <NavButton
      content={ Input }
      value={ mode }
      onClick={ handleChangeMode }></NavButton>
  )
}

export default ModeSelector
