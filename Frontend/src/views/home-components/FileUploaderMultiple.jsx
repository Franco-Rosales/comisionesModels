// ** React Imports

import { Fragment, useState } from 'react'

// ** MUI Imports

import Box from '@mui/material/Box'
//import List from '@mui/material/List'
import Button from '@mui/material/Button'
//import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
//import IconButton from '@mui/material/IconButton'
import { styled, useTheme } from '@mui/material/styles'
import { TextField } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
//import { red } from '@mui/material/colors'
import BasicModal from './ModalHome'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  marginBottom: theme.spacing(8.75)
}))

const FileUploaderMultiple = () => {
  // ** State
  const [files, setFiles] = useState([])
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  // ** Hooks
  const theme = useTheme()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()
    setOpen(true)
  }



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
          sx={{
            width: '80%',
            textAlign: 'left',
            fontWeight: 'light',
            fontSize: '1.2rem',
            mt: '1rem'
          }}
        >
          Nombre del Documento
        </Typography>
        <TextField
          id='outlined'
          placeholder='Nombre del documento'
          size='small'
          sx={{ width: '80%' }}
        />
      </Box>
    )
  }

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
      <TextArea />
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box
          sx={{
            width: '100%',
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
              border: '.15rem dashed #D8D6DE',
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
                pt: '7rem'
              }}
            >
              <Box
                sx={{
                  color: '#ffff',
                  backgroundColor: '#3A6DB3',
                  borderRadius: '14%',
                  p: 3.1,
                  pl: 3.5,
                  pr: 3.5,
                  widht: '4rem',
                  height: '4rem',
                  textAlign: 'center',
                 
                }}
              >
                <Icon icon='tabler:upload' fontSize={40} />
              </Box>
              <Typography variant='h5' sx={{ mb: 30, mt: 5 }}>
                Cargar Archivo
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '.5rem'
        }}
      >
        
        <Button
          variant='contained'
          type='submit'
          sx={{
            mt: 10,
            backgroundColor: '#3A6DB3',
            '&:hover': { backgroundColor: '#5a7396' }
          }}
        >
          Importar Archivo
        </Button>
        <BasicModal open={open} setOpen={setOpen} />
      </Box>
      
      
      </form>
    </Fragment>
  )
}

export default FileUploaderMultiple
