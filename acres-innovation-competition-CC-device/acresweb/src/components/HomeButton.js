import React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';

const HomeButton = ({
    onPress=()=>{}
}) => {
    return (
      <IconButton onClick={onPress}>
        <Avatar>
          <OtherHousesIcon sx={{color:'green'}}/>
        </Avatar>
      </IconButton>
    );
  };
  
  export default HomeButton;