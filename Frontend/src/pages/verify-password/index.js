import Link from 'next/link'

// ** MUI Components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import { useSettings } from 'src/@core/hooks/useSettings'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Demo Components Imports
import StepPersonalDetails from 'src/views/pages/auth/register'

// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 550,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12)
}))

const LeftWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12),
  '& .img-mask': {
    left: 0
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 800
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12),
  '& .img-mask': {
    left: 0
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 800
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginLeft: theme.spacing(2),
  color: theme.palette.primary.main
}))

const VerifyEmail = () => {
  // ** Hooks
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings
  const imageSource = skin === 'Rectangle 822'

  return (
    <Box className='content-right' sx={{ backgroundColor: 'customColors.bodyBg' }}>
      {!hidden ? (
        <LeftWrapper>
          <RegisterIllustration
            alt='register-illustration'
            src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
          />
        </LeftWrapper>
      ) : null}
      <RightWrapper>
        <Box sx={{ maxWidth: 550, mb: 12 }}>
          <Grid sx={{ marginX: 'auto', maxWidth: '600px', mb: 12 }}>
            <Box sx={{ mb: 8 }}>
              <Typography variant='h5' sx={{ mb: 1.5 }}>
                Verifica tu correo electrónico ✉️
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
                Hemos enviado un enlace a su dirección de correo electrónico: xxxxxx@gmail.com
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
                Siga el enlace que se encuentra dentro para continuar
              </Typography>
            </Box>
            <Button fullWidth variant='contained'>
              Saltar por ahora
            </Button>
            <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ color: 'text.secondary', fontSize: '1rem' }}>
                ¿No recibiste un correo electrónico?
              </Typography>
              <LinkStyled href='/' onClick={e => e.preventDefault()}>
                Reenviar
              </LinkStyled>
            </Box>
          </Grid>
        </Box>
      </RightWrapper>
    </Box>
  )
}
VerifyEmail.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default VerifyEmail
