import React, { useEffect, useState } from 'react'
import {TextField,Button, Grid,Card,CardActions,CardContent,Typography,} from '@mui/material'
import TopMarginSpace from './TopSpace'
import { API_URL } from '../api/Endpoints'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PopupForm from './PopupForm';
import HomeButton from './HomeButton';
import AddButton from './AddButton';
import TaskButton from './TaskButton';
export default function CreateNewProject({
  onNewProject = ()=>{}
}) {

    const [ProjectName,setProjectName] = useState();
    const [SelectedSites,setSelectedSites] = useState();
    const [LastName,setLastName] = useState();
    const [employeeEmail,setEmployeeEmail] = useState();
    const [Password,setPassword] = useState();
    const [EmployeeID,setEmployeeID] = useState();
    const [EmployeeIDDescription,setEmployeeIDDescription] = useState();
    const [openCreateNewProjectPopup,setopenCreateNewProjectPopup] = useState(false)
    const [selectedProject,setSelectedProject] = useState(null)


    const [EmployeeIDs,setEmployeeIDs] = useState([])

    useEffect(()=>{
        getEmployeeIDs().then((data)=>setEmployeeIDs([...data])).catch()
    },[])

    async function getEmployeeIDs(){
        const response = await fetch(`${API_URL}/EmployeeIDs`)
        const json = await response.json()
        const {data} =  json
        return data
    }

    async function addNewProject(){
      const newProject = {
        name:ProjectName,
        site:SelectedSites
    }
       await fetch(`${API_URL}/add-project`,{
            method:"POST",
            body:JSON.stringify(newProject),
            headers:{
                "content-type":"application/json"
            }
        })
        onNewProject(newProject)
       
    }
    const handleCreateNewProjectPopup = ()=>{
      setopenCreateNewProjectPopup(!openCreateNewProjectPopup)
  }


  return (
    <Grid container  >
       <Grid item> <HomeButton sx={{color:'green',fontSize:30,position:'relative',top:10}} onPress={()=>setSelectedProject(null)}/></Grid>
    <Grid item><AddButton onPress={()=>handleCreateNewProjectPopup()}/> </Grid>
    {/* <Grid item><TaskButton onPress={()=>handleCreateNewTaskPopup()}/> </Grid> */}
      <PopupForm title={"Create New Project"} openForm={openCreateNewProjectPopup} onClose={handleCreateNewProjectPopup} onSubmit={async ()=>await addNewProject()}>
    <TextField sx={styles.textField} id="outlined-basic"  value={ProjectName} label="Project Name" variant="outlined" onChange={(e)=>setProjectName(e.target.value)}/>
    <TopMarginSpace/>
    <AcresSites onCurrentSite={(site)=>setSelectedSites(site)}/>
    </PopupForm>
    </Grid>
  )
}


function AcresSites({onCurrentSite = ()=>{}}){
  const [selectedSites,setSelectedSites] = useState([])
  const [sites,setSites] = useState([])
  useEffect(()=>{
    getSites().then((data)=>setSites([...data])).catch()
},[])


async function getSites(){
    const response = await fetch(`${API_URL}/list-sites`)
    const json = await response.json()
    const {data} =  json
    return data
}
  return (
    <FormControl sx={{width:'90%'}}>
  <InputLabel id="demo-simple-select-label">Company Sites</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectedSites}
    label="Sites"
    onChange={(e)=>{
      setSelectedSites(e.target.value)
      onCurrentSite(e.target.value)
    }}
  >
    {sites.map(({name})=>{
      return (<MenuItem value={name}>{name}</MenuItem>)
    })}

  </Select>
</FormControl>
  )
}
const styles = {
  textField:{
    width:'90%'
  }
}
