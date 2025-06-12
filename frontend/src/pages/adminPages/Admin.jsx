import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function Admin() {
  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: (theme) => theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      
      <Box
        sx={{
          height: '80%',
          width: '80%',
          boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 4px 10px rgba(243, 243, 243, 0.31)' : 12,
          borderRadius: 2,
          p: 10,
          bgcolor: (theme) => theme.palette.background.paper,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly'
        }}>

        <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
            <Box>
              <Box
                component="img"
                src="/cert_link.jpg"
                sx={{
                  height: { xs: 80, sm: 120 },
                  borderRadius: 1,
                }}
              />
            </Box>
            <Box>
              <Box
                component="img"
                src="/cert_link.jpg"
                sx={{
                  height: { xs: 80, sm: 120 },
                  borderRadius: 1,
                }}
              />
            </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
            <Box>
              <Box
                component="img"
                src="/cert_link.jpg"
                sx={{
                  height: { xs: 80, sm: 120 },
                  borderRadius: 1,
                }}
              />
            </Box>
            <Box>
              <Box
                component="img"
                src="/cert_link.jpg"
                sx={{
                  height: { xs: 80, sm: 120 },
                  borderRadius: 1,
                }}
              />
            </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
            <Box>
              <Box
                component="img"
                src="/cert_link.jpg"
                sx={{
                  height: { xs: 80, sm: 120 },
                  borderRadius: 1,
                }}
              />
            </Box>
            <Box>
              <Box
                component="img"
                src="/cert_link.jpg"
                sx={{
                  height: { xs: 80, sm: 120 },
                  borderRadius: 1,
                }}
              />
            </Box>
        </Box>

      </Box>

    </Box>
  )
}

export default Admin
