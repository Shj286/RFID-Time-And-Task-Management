import React, { useEffect, useState } from 'react'
import {TextField,Button, Grid,Card,CardActions,CardContent,Typography,} from '@mui/material'
import TopMarginSpace from './TopSpace'
import { API_URL } from '../api/Endpoints'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import HomeButton from './HomeButton';
import AddButton from './AddButton';
import PopupForm from './PopupForm';
export default function CreateNewSite({
  onSiteAdded=()=>{},
  onBackHome = ()=>{}
}) {

    const [Name,setName] = useState();
    const [openCreateNewSitePopup,setopenCreateNewSitePopup] = useState(false)
    const [selectedProject,setSelectedSites] = useState(null)


    

    async function addNewSite(){
      const newSite = {
        name:Name,
    }
       await fetch(`${API_URL}/add-site`,{
            method:"POST",
            body:JSON.stringify(newSite),
            headers:{
                "content-type":"application/json"
            }
        })
        setName('')
        onSiteAdded(newSite)
        onBackHome()
       
    }

  const handleCreateNewSitePopup = ()=>{
    setopenCreateNewSitePopup(!openCreateNewSitePopup)
}


  return (
    <Grid container  >
       <Grid item> <HomeButton sx={{color:'green',fontSize:30,position:'relative',top:10}} onPress={()=>setSelectedSites(null)}/></Grid>

       <Grid item><AddButton onPress={()=>handleCreateNewSitePopup()}/> </Grid>
        <PopupForm title={"Add New Site"} openForm={openCreateNewSitePopup} onClose={handleCreateNewSitePopup} onSubmit={async ()=>await addNewSite()}>
        <TextField sx={styles.textField} id="outlined-basic"  value={Name} label="Site Name" variant="outlined" onChange={(e)=>setName(e.target.value)}/>
        </PopupForm>
      <TopMarginSpace/>
    </Grid>
  )
}


const styles = {
  textField:{
    width:'90%'
  }
}
