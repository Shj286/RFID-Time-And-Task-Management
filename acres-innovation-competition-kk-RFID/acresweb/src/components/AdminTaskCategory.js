import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function AdminTaskCategory({
    title = "",
    bgColor = "blue",
    textColor = "white",
    selected = false,
    onPress = ()=>{}
}) {
  return (
    <Card sx={{ width:'100%',backgroundColor:selected?bgColor:'black' }}>
      <CardActionArea onClick={onPress}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color={selected?textColor:'white'}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}