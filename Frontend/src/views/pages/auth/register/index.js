/* eslint-disable react/jsx-no-undef */

import { useState } from 'react'
import { useTheme } from '@emotion/react'
import { useSettings } from 'src/@core/hooks/useSettings'
import { useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

// ** Next Imports
import { useRouter } from 'next/router'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// **YUP Imports
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Auth
// import { register } from 'src/services/auth'

const defaultValues = {
  usr_email: '',
  usr_password: '',
  confirm_usr_password: '',
  usr_name: '',
  usr_lastname: '',
  usr_enabled: false
}

const formSchema = yup.object({
  usr_email: yup.string().trim().min(3, 'Ingresar al menos 3 caracteres').required('Campo Obligatorio'),
  usr_password: yup
    .string()
    .trim()
    .min(4, 'La contraseña debe tener al menos 4 caracteres')
    .required('Campo Obligatorio'),
  confirm_usr_password: yup
    .string()
    .trim()
    .oneOf([yup.ref('usr_password'), null], 'Las contraseñas deben coincidir') //método oneOf para verificar que la confirmación de contraseña coincida con la contraseña ingresada en el campo usr_password.
    .required('Campo Obligatorio'),
  usr_name: yup 
  .string()
  .trim()
  .min(3, 'Ingresar al menos 3 caracteres'),
  usr_lastname: yup 
  .string()
  .trim()
  .min(3, 'Ingresar al menos 3 caracteres')
})

const StepPersonalDetails = () => {
  const { register } = useContext(AuthContext)

  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false
  })

  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'all',
    resolver: yupResolver(formSchema)
  })

  const onSubmit = async data => {
    try {
      await register(data)
      console.log('Registro exitoso')
      router.replace('/import')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        console.log('Error:', error.response.data.detail)
      } else {
        console.log('Error desconocido:', error)
      }
    }
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
  }

  return (
    <>
      <Box sx={{ mb: 18 }}>
        <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
          <Box sx={{ mb: 12 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant='h5' sx={{ mb: 1.5, fontSize: '2rem' }}>
                Información sobre la cuenta
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
                Introduzca su nombre y contraseña
              </Typography>
            </Grid>
          </Box>

          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>Nombre</Typography>
              <Controller
                name='usr_name'
                control={control}
                render={({ field }) => (
                  <TextField fullWidth placeholder='john Doe' type='text' sx={{ margin: 1 }} {...field} />
                )}
              />
              {errors.usr_name && (
                <Grid>
                  <Typography variant='caption'>{errors.usr_name.message}</Typography>
                </Grid>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>Email</Typography>
            <Controller
              name='usr_email'
              control={control}
              render={({ field }) => (
                <TextField fullWidth placeholder='john Doe' type='text' sx={{ margin: 1 }} {...field} />
              )}
            />
            {errors.usr_email && (
              <Grid>
                <Typography variant='caption'>{errors.usr_email.message}</Typography>
              </Grid>
            )}
          </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>Apellido</Typography>
              <Controller
                name='usr_lastname'
                control={control}
                render={({ field }) => (
                  <TextField fullWidth placeholder='Doe' type='text' sx={{ margin: 1 }} {...field} />
                )}
              />
              {errors.usr_lastname && (
                <Grid>
                  <Typography variant='caption'>{errors.usr_lastname.message}</Typography>
                </Grid>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>Contraseña</Typography>
              <Controller
                name='usr_password'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <OutlinedInput
                      placeholder='Contraseña'
                      id='usr_password'
                      sx={{ margin: 1 }}
                      {...field}
                      type={values.showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <Icon icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
              />
              {errors.usr_password && (
                <Grid>
                  <Typography variant='caption'>{errors.usr_password.message}</Typography>
                </Grid>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: 'text.secondary', fontSize: '1.2rem' }}>Confirma contraseña</Typography>
              <Controller
                name='confirm_usr_password'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth label='johndoe@gmail.com'>
                    <OutlinedInput
                      placeholder='Confirma contraseña'
                      id='confirm_usr_password'
                      type={values.showConfirmPassword ? 'text' : 'password'}
                      {...field}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={handleClickShowConfirmPassword}
                          >
                            <Icon icon={values.showConfirmPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
              />
              {errors.confirm_usr_password && (
                <Grid>
                  <Typography variant='caption'>{errors.confirm_usr_password.message}</Typography>
                </Grid>
              )}
            </Grid>

            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(12)} !important` }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type='submit' variant='contained' sx={{ '& svg': { ml: 2 } }}>
                  Registrarme
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}

export default StepPersonalDetails
