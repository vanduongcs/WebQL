import TextField from '@mui/material/TextField'

function FieldC({ val, func, label }) {
  return (
    <TextField
      value={ val }
      onChange={(e) => func(e.target.value)}
      label={ label }
      variant='outlined' 
      sx={{ width: '100%'}}
      autoComplete="off"
    />
  )
}

export default FieldC
