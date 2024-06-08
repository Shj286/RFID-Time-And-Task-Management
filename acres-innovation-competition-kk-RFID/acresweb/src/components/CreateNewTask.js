import React, { useEffect, useState } from 'react'
import {TextField,Button, Grid,Card,CardActions,CardContent,Typography, FormControl, Select, InputLabel, MenuItem,} from '@mui/material'
import TopMarginSpace from './TopSpace'
import { API_URL } from '../api/Endpoints'
import PopupForm from './PopupForm';
import HomeButton from './HomeButton';
import AddButton from './AddButton';
import DownloadButton from './DownloadButton';
import { ReportGenerator } from '../model/ReportGenerator';
export default function CreateNewTask({
  onTaskAdded=()=>{},
  onBackHome = ()=>{}
}) {


    const [title,setTitle] = useState();
    const [employeeEmail,setEmployeeEmail] = useState();
    const [managerEmail,setManagerEmail] = useState();
    const [task,setTask] = useState();
    const [taskDescription,setTaskDescription] = useState();
    const [selectedProject,setSelectedProject] = useState()

    const [openAddNewEmployeePopup,setOpenAddNewEmployeePopup] = useState(false)

    const handleNewEmployeePopup = ()=>{
        setOpenAddNewEmployeePopup(!openAddNewEmployeePopup)
    }

 

    async function addNewtask(){
      const newTask = {
        email:employeeEmail,
        title:title,
        description:taskDescription,
        managerEmail:managerEmail,
        task:task,
        project:selectedProject
    }
      await fetch(`${API_URL}/add-task`,{
           method:"POST",
           body:JSON.stringify(newTask),
           headers:{
               "content-type":"application/json"
           }
       })
       setTitle('')
       setEmployeeEmail('')
       setManagerEmail('')
       setTask('')
       setTaskDescription('')
       onTaskAdded(newTask)
      
   }

  return (
    <Grid container>
       <Grid item> <HomeButton sx={{color:'green',fontSize:30,position:'relative',top:10}} onPress={()=>onBackHome(null)}/></Grid>
    <Grid item><AddButton onPress={()=>handleNewEmployeePopup()}/> </Grid>
    <Grid item><DownloadButton onPress={async ()=>{
      await ReportGenerator.generateReport()
    }}/> </Grid>
      <PopupForm title={"Add New Task"} openForm={openAddNewEmployeePopup} onClose={handleNewEmployeePopup} onSubmit={async ()=>{
        await addNewtask();
    }}>
      <Grid container   >

    <TextField sx={styles.textField} id="outlined-basic" value={managerEmail} type='email' label="Manager Name" variant="outlined" onChange={(e)=>setManagerEmail(e.target.value)}/>
    <TopMarginSpace/>
    <AcresEmployees onCurrentEmployee={(employee)=>setEmployeeEmail(employee.email)}/>
    <TopMarginSpace/>
    <AcresProjects onCurrentProject={(project)=>setSelectedProject(project)}/>
    <TopMarginSpace/>
    <TextField sx={styles.textField} id="outlined-basic" value={title} label="Title" variant="outlined" onChange={(e)=>setTitle(e.target.value)}/>
    <TopMarginSpace/>
    <TextField sx={styles.textField} id="outlined-basic" value={task} label="Task" variant="outlined" onChange={(e)=>setTask(e.target.value)}/>
    <TopMarginSpace/>
    <TextField 
    sx={styles.textField}
        value={taskDescription}
        onChange={(e)=>setTaskDescription(e.target.value)}
          id="outlined-multiline-static"
          label="Task description"
          multiline
          rows={4}
        />
    <TopMarginSpace/>
    <TopMarginSpace/>
   </Grid>
    </PopupForm>
    </Grid>
  )
}

function AcresEmployees({onCurrentEmployee = ()=>{}}){
  const [selectedEmployee,setSelectedEmployee] = useState()
  const [employees,setEmployees] = useState([])
  useEffect(()=>{
    getEmployees().then((data)=>setEmployees([...data])).catch()
},[])


async function getEmployees(){
    const response = await fetch(`${API_URL}/list-Employees`)
    const json = await response.json()
    const {data} =  json
    return data
}
  return (
    <FormControl sx={{width:'90%'}}>
  <InputLabel id="demo-simple-select-label">Select employee</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectedEmployee}
    label="Sites"
    onChange={(e)=>{
      setSelectedEmployee(e.target.value)
      onCurrentEmployee(e.target.value)
    }}
  >
    {employees.map((employee)=>{
      return (<MenuItem value={employee}>{employee.firstName} {employee.lastName}</MenuItem>)
    })}

  </Select>
</FormControl>
  )
}

function AcresProjects({onCurrentProject = ()=>{}}){
  const [selectedProjects,setSelectedProjects] = useState([])
  const [projects,setProjects] = useState([])
  useEffect(()=>{
    getProjects().then((data)=>setProjects([...data])).catch()
},[])


async function getProjects(){
    const response = await fetch(`${API_URL}/list-projects`)
    const json = await response.json()
    const {data} =  json
    return data
}
  return (
    <FormControl sx={{width:'90%'}}>
  <InputLabel id="demo-simple-select-label">Company Projects</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectedProjects}
    label="Sites"
    onChange={(e)=>{
      setSelectedProjects(e.target.value)
      onCurrentProject(e.target.value)
    }}
  >
    {projects.map((project)=>{
      return (<MenuItem value={project}>{project.name}</MenuItem>)
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
