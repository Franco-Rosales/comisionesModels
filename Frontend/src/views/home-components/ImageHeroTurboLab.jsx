// ** MUI Imports
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const ImageHero = () => {
  return (
    <Card>
        <CardMedia
          component="img"
          sx={{
            height:"25rem",
            width:"100%",
           }}
          image="/images/cards/TURBOLAB.svg"
          alt="turbolab"
        />
    </Card>
  );

}

export default ImageHero;