import React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddButton = ({
    onPress=()=>{}
}) => {
    return (
      <IconButton onClick={onPress}>
        <Avatar>
          <AddCircleIcon sx={{color:'green'}}/>
        </Avatar>
      </IconButton>
    );
  };
  
  export default AddButton;