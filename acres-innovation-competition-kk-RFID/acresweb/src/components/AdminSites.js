import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react'
import HomeButton from './HomeButton';
import AddButton from './AddButton';
import CreateNewSite from './CreateNewSite';
import PopupForm from './PopupForm';
import { API_URL } from '../api/Endpoints';

export default function AdminSites() {
    const [sites,setSites] = useState([])
    const [newSite,setNewSite] = useState()



    useEffect(()=>{
        getSites().then((data)=>setSites([...data])).catch()

    },[newSite])


    useEffect(()=>{
        getSites().then((data)=>setSites([...data])).catch()
    },[])


    async function getSites(){
        const response = await fetch(`${API_URL}/list-sites`)
        const json = await response.json()
        const {data} =  json
        console.log('sites =====',data)
        return data
    }
  return (
   <Grid container>
   
   <CreateNewSite onSiteAdded={(site)=>setNewSite(site)}/>
    {sites.map((data)=>{
        return <Grid container sx={{padding:5,borderBottom:1}}>
            <Typography>{data.name}</Typography>
        </Grid>
    })}
   </Grid>
  )
}


