// ** MUI Imports
import { Box, Divider } from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Views Imports
import FileUploaderMultiple from 'src/views/home-components/FileUploaderMultiple'
import ImageHero from 'src/views/home-components/ImageHeroTurboLab'



// ** Views Import
const Import = ()  => {
 return (
    <Grid>
      <Card  > 
        <ImageHero />
      </Card>

      <Typography variant="h6" component="h1" sx={{mt: "6rem"}}>
        Importa aquí el listado de cobranzas
      </Typography>

      <Box sx={{mt: 2}}>
      <Divider variant="fullWidth"  sx={{ width: '100%', mb: "3rem" }} color="#F44336" />
      </Box>

      <Grid>
          <FileUploaderMultiple />
      </Grid>
    </Grid>
 )
}
export default Import
