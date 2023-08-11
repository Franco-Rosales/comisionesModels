
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Icon from 'src/@core/components/icon'
import { fontWeight } from '@mui/system';

const style = {
  position: 'absolute',
  width: '40rem',
  height: '25rem',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 30,
  borderRadius: '2%',
  p: 1
};



export default function BasicModal({open, setOpen}) {
    
    const handleClose = () => {
        setOpen(false)
      }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
            ...style,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',   
        }}>
          {/* <CheckCircleOutlineIcon fontSize="large" sx={{ fontSize: 140, color: '#5FB4E6' }}/> */}
          <Box sx={{color: theme => theme.palette.primary.main}}>
          <Icon fontSize={148} icon='tabler:circle-check' />
          </Box>
          <Typography id="modal-modal-title" variant="h4" component="h2" color={'#434343'}>
            Se importó exitosamente
          </Typography>
          <Button
          variant='contained'
          onClick={handleClose}
          type='submit'
          sx={{
            mt: 1,
            mb: 4,
            width: '10rem',
            backgroundColor: '#3A6DB3',
            '&:hover': { backgroundColor: '#5a7396' },
            fontSize: '1.2rem',
          }}
        >
          Volver
        </Button>
        </Box>
      </Modal>
    </div>
  );
}
