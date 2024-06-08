import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HomeButton from './HomeButton';
import AddButton from './AddButton';
import PopupForm from './PopupForm';
import CreateNewProject from './CreateNewProject';
import TaskButton from './TaskButton';
import TaskManagement from './TaskManagement';
import { API_URL } from '../api/Endpoints';

export default function AdminProjects() {
    const [projects,setProjects] = useState([])
    const [openCreateNewProjectPopup,setopenCreateNewProjectPopup] = useState(false)
    const [openCreateNewTaskPopup,setopenCreateNewTaskPopup] = useState(false)
    const [selectedProject,setSelectedProject] = useState(null)
    const [newProject,setNewProject] = useState()

    useEffect(()=>{
        getProjects().then((data)=>setProjects([...data])).catch()

    },[newProject])


    useEffect(()=>{
        getProjects().then((data)=>setProjects([...data])).catch()
    },[])
    
    async function getProjects(){
        const response = await fetch(`${API_URL}/list-projects`)
        const json = await response.json()
        const {data} =  json
        return data
    }
    const handleCreateNewProjectPopup = ()=>{
        setopenCreateNewProjectPopup(!openCreateNewProjectPopup)
    }
    const handleCreateNewTaskPopup = ()=>{
        setopenCreateNewTaskPopup(!openCreateNewTaskPopup)
    }
  return ( 
   <Grid container>


    <CreateNewProject onNewProject={(project)=>setNewProject(project)}/>
    <PopupForm title={"Create New Task"} openForm={openCreateNewTaskPopup} onClose={handleCreateNewTaskPopup}><TaskManagement/> </PopupForm>

     {selectedProject?<Grid container sx={styles.page}><Typography >Projects Details goes here</Typography></Grid>:<></>}
    {!selectedProject && projects.map((data)=>{
        return <Grid container sx={{padding:5,borderBottom:1}}>
            <Typography>{data.name}</Typography>
        </Grid>
    })}
   </Grid>
  )
}

const styles = {
    page:{padding:5,borderBottom:1}
}


