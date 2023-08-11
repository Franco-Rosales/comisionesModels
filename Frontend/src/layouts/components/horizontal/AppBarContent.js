// ** MUI Imports
import Box from '@mui/material/Box'

// ** Components
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

const AppBarContent = props => {
  // ** Props
  const { settings, saveSettings } = props

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <UserDropdown settings={settings} />
    </Box>
  )
}

export default AppBarContent
