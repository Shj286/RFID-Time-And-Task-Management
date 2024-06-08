import React, { useEffect, useState } from 'react'
import {TextField,Button, Grid,Card,CardActions,CardContent,Typography,} from '@mui/material'
import TopMarginSpace from './TopSpace'
import WidthSpace from './WidthSpace'
import { API_URL } from '../api/Endpoints'
export default function EmployeeRegistration() {

    const [employeeId,setId] = useState();

    const [password,setPasssword] = useState();

    
    return (
        
        <Grid container  sx={{flex:1,flexDirection:'column',padding:10,}} >

        <TopMarginSpace/>
        <TopMarginSpace/>
        <TopMarginSpace/>
        <TextField id="outlined-basic" value={employeeId} label="ID" variant="outlined" onChange={(e)=>setId(e.target.value)}/>
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
