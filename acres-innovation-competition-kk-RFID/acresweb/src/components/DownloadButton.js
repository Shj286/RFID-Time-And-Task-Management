import React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
const DownloadButton = ({
    onPress=()=>{}
}) => {
    return (
      <IconButton onClick={onPress}>
        <Avatar>
          <DownloadIcon sx={{color:'green'}}/>
        </Avatar>
      </IconButton>
    );
  };
  
  export default DownloadButton;