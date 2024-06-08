import React, { useEffect, useState } from 'react'
import {TextField,Button, Grid,Card,CardActions,CardContent,Typography,} from '@mui/material'
import TopMarginSpace from './TopSpace'
import WidthSpace from './WidthSpace'
import { API_URL } from '../api/Endpoints'
export default function EmployeeRegistration() {

    const [employeeFirstName,setTitleF] = useState();
    const [employeeLastName,setTitleL] = useState();
    const [employeeId,setId] = useState();
    const [employeeEmail,setEmployeeEmail] = useState();

    const [password,setPasssword] = useState();

    
    return (
        <Grid container  sx={{flex:1,flexDirection:'column',padding:10,}} >

           <Grid container1  sx={{flex:1,flexDirection:'row',padding:5,marginLeft:16}} >
           <TextField id="outlined-basic" value={employeeFirstName} label="First Name" variant="outlined" onChange={(e)=>setTitleF(e.target.value)}/>
           <WidthSpace/>
           <TextField id="outlined-basic" value={employeeLastName} label="Last Name" variant="outlined" onChange={(e)=>setTitleL(e.target.value)}/>
           </Grid>

        <TextField id="outlined-basic" value={employeeId} label="ID" variant="outlined" onChange={(e)=>setId(e.target.value)}/>
        <TopMarginSpace/>
        <TextField id="outlined-basic" value={employeeEmail} type='email' label="Employee Email" variant="outlined" onChange={(e)=>setEmployeeEmail(e.target.value)}/>
        <TopMarginSpace/>
        <TextField id="outlined-basic" value={password} label="Password" variant="outlined" onChange={(e)=>setPasssword(e.target.value)}/>
        <TopMarginSpace/>
        <TopMarginSpace/>
      
        <Button variant="contained" disableElevation onClick={async ()=>{


    
        }}>Submit</Button>
    
        <TopMarginSpace/>
    
        </Grid>
      )



}
