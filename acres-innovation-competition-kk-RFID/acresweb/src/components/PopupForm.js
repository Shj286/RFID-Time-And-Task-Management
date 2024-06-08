import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const PopupForm = ({ openForm,children,onClose=()=>{},onSubmit=()=>{},title  }) => {
    const [open,setOpen] = useState(openForm)
    const [close,setClose] = useState(true)

    useEffect(()=>{
        setOpen(openForm)
    },[openForm])

    const handleClose = ()=>{
        setClose(true);
        setOpen(false)
        onClose()
    }
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{fontSize:50}}>{title}</DialogTitle>
        <DialogContent sx={{width:'100%'}}>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{
            onSubmit()
            onClose()
          }}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default PopupForm;
  