// ** MUI Components
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'



import { useSettings } from 'src/@core/hooks/useSettings'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'


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

const RegisterMultiSteps = () => {
  // ** Hooks
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))
  const { settings } = useSettings()

    // ** Vars
    const { skin } = settings
    // const imageSource = skin === 'Rectangle 822'

  return (
    <Box className='content-right' sx={{ backgroundColor: 'customColors.bodyBg' }}>
      {!hidden ? (
        <LeftWrapper>
          <RegisterIllustration
            alt='register-illustration'
            // src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
          />
        </LeftWrapper>
      ) : null}
      <RightWrapper>
        <Box sx={{ maxWidth: 700 }}>
          <StepPersonalDetails />
        </Box>
      </RightWrapper>
    </Box>
  )
}
RegisterMultiSteps.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterMultiSteps
