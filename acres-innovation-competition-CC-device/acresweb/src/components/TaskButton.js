import React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AssignmentIcon from '@mui/icons-material/Assignment';

const TaskButton = ({
    onPress=()=>{}
}) => {
    return (
      <IconButton onClick={onPress}>
        <Avatar>
          <AssignmentIcon sx={{color:'green'}}/>
        </Avatar>
      </IconButton>
    );
  };
  
  export default TaskButton;
