// ** React Imports

import { Fragment, useState } from 'react'

// ** MUI Imports

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import { TextField } from '@mui/material'


// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  marginBottom: theme.spacing(8.75)
}))

const FileUploaderMultiple = () => {
  // ** State
  const [files, setFiles] = useState([])

  // ** Hooks
  const theme = useTheme()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const TextArea = () => {
    return (
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '.5rem'
        }}
        container
        autoComplete='off'
      >
        <Typography
          variant='h6'
          component='h2'
          sx={{ width: '80%', textAlign: 'left', fontWeight: 'light', fontSize: '1.2rem', mt: '1rem' }}
        >
          Nombre del Documento
        </Typography>
        <TextField
          id='outlined'
          defaultValue='Nombre del documento'
          placeholder='Nombre del documento'
          size='small'
          sx={{ width: '80%' }}
        />
      </Box>
    )
  }


  return (
    <Fragment>
      <TextArea />
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box
          sx={{
            width: '100%',
            height: '75vh',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            mt: '.5rem'
          }}
        >
          <Box
            sx={{
              mt: '3rem',
              border: '.15rem dotted #D8D6DE',
              width: '80%',
              height: '20rem'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                pb: '3rem'
              }}
            >
              <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} sx={{ mt: 25, color: '#3A6DB3' }}  />
              <Typography variant='h5' sx={{ mb: 30 }}>
                Cargar Archivo
              </Typography>
              <Button variant='contained'>Importar Archivo</Button>
            </Box>
          </Box>
        </Box>
      </div>
    </Fragment>
  )
}

export default FileUploaderMultiple
