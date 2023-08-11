// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const Alert = () => {
  return {
    MuiAlert: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 500,
          fontSize: '1rem',
          lineHeight: 1.375,
          alignItems: 'flex-start',
          padding: theme.spacing(1.25, 3.5),
          '& .MuiAlertTitle-root': {
            marginBottom: theme.spacing(2.5)
          },
          '& a': {
            fontWeight: 700,
            color: 'inherit'
          }
        }),
        icon: ({ theme }) => ({
          opacity: 1,
          fontSize: '1.125rem',
          padding: theme.spacing(1),
          borderRadius: theme.shape.borderRadius,
          margin: theme.spacing(1.75, 2.5, 1.75, 0),
          backgroundColor: theme.palette.common.white,
          '& + .MuiAlert-message': {
            padding: theme.spacing(2.25, 0)
          },
          '& ~ .MuiAlert-action': {
            paddingTop: theme.spacing(1.25)
          }
        }),
        message: ({ theme }) => ({
          padding: theme.spacing(1.75, 0)
        }),
        action: ({ theme }) => ({
          paddingTop: theme.spacing(0.75)
        }),
        standardSuccess: ({ theme }) => ({
          color: theme.palette.success.main,
          backgroundColor: hexToRGBA(theme.palette.success.main, 0.16),
          '& .MuiAlertTitle-root': {
            color: theme.palette.success.main
          },
          '& .MuiAlert-icon': {
            color: theme.palette.success.main
          }
        }),
        standardInfo: ({ theme }) => ({
          color: theme.palette.info.main,
          backgroundColor: hexToRGBA(theme.palette.info.main, 0.16),
          '& .MuiAlertTitle-root': {
            color: theme.palette.info.main
          },
          '& .MuiAlert-icon': {
            color: theme.palette.info.main
          }
        }),
        standardWarning: ({ theme }) => ({
          color: theme.palette.warning.main,
          backgroundColor: hexToRGBA(theme.palette.warning.main, 0.16),
          '& .MuiAlertTitle-root': {
            color: theme.palette.warning.main
          },
          '& .MuiAlert-icon': {
            color: theme.palette.warning.main
          }
        }),
        standardError: ({ theme }) => ({
          color: theme.palette.error.main,
          backgroundColor: hexToRGBA(theme.palette.error.main, 0.16),
          '& .MuiAlertTitle-root': {
            color: theme.palette.error.main
          },
          '& .MuiAlert-icon': {
            color: theme.palette.error.main
          }
        }),
        outlined: ({ theme }) => ({
          padding: theme.spacing(1, 3.25)
        }),
        outlinedSuccess: ({ theme }) => ({
          borderColor: theme.palette.success.main,
          color: theme.palette.success.main,
          '& .MuiAlertTitle-root': {
            color: theme.palette.success.main
          },
          '& .MuiAlert-icon': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.success.main
          }
        }),
        outlinedInfo: ({ theme }) => ({
          borderColor: theme.palette.info.main,
          color: theme.palette.info.main,
          '& .MuiAlertTitle-root': {
            color: theme.palette.info.main
          },
          '& .MuiAlert-icon': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.info.main
          }
        }),
        outlinedWarning: ({ theme }) => ({
          borderColor: theme.palette.warning.main,
          color: theme.palette.warning.main,
          '& .MuiAlertTitle-root': {
            color: theme.palette.warning.main
          },
          '& .MuiAlert-icon': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.warning.main
          }
        }),
        outlinedError: ({ theme }) => ({
          borderColor: theme.palette.error.main,
          color: theme.palette.error.main,
          '& .MuiAlertTitle-root': {
            color: theme.palette.error.main
          },
          '& .MuiAlert-icon': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.error.main
          }
        }),
        filled: ({ theme }) => ({
          color: theme.palette.common.white
        }),
        filledSuccess: ({ theme }) => ({
          '& .MuiAlert-icon': {
            color: theme.palette.success.main
          }
        }),
        filledInfo: ({ theme }) => ({
          '& .MuiAlert-icon': {
            color: theme.palette.info.main
          }
        }),
        filledWarning: ({ theme }) => ({
          '& .MuiAlert-icon': {
            color: theme.palette.warning.main
          }
        }),
        filledError: ({ theme }) => ({
          '& .MuiAlert-icon': {
            color: theme.palette.error.main
          }
        })
      }
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          marginTop: '-1px',
          lineHeight: 1.33333,
          fontSize: '1.125rem'
        }
      }
    }
  }
}

export default Alert
