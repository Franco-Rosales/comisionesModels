import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const DividerUpload = () => {
  return (
    <Box>
      <Typography variant='h6' component='h1' sx={{ mt: 5 }}>
        Importa aquí el listado de cobranzas
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Divider variant='fullWidth' sx={{ width: '100%' }} color='#F44336' />
      </Box>
    </Box>
  )
}

export default DividerUpload
