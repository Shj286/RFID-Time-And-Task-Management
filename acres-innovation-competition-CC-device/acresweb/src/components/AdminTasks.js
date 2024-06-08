import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react'
import AddButton from './AddButton';
import PopupForm from './PopupForm';
import TaskManagement from './TaskManagement';
import CreateNewEmployee from './CreateNewEmployee';
import HomeButton from './HomeButton';
import { API_URL } from '../api/Endpoints';
import EmployeeDetails from './EmployeeDetails';
import TopMarginSpace from './TopSpace';
import CreateNewTask from './CreateNewTask';
export default function AdminTasks() {
    const [employees,setEmployees] = useState([])
    const [openAddNewEmployeePopup,setOpenAddNewEmployeePopup] = useState(false)
    const [selectedEmployee,setSelectedEmployee] = useState(null)
    const [createdEmployees,setCreatedEmployees] = useState()
    const [newTask,setNewTask] = useState()
    const [tasks,setTasks] = useState([])

    useEffect(()=>{
        getTasks().then((data)=>setTasks([...data])).catch()
    },[])

    async function getTasks(){
        const response = await fetch(`${API_URL}/tasks`)
        const json = await response.json()
        const {data} =  json
        return data
    }



    const handleNewEmployeePopup = ()=>{
        setOpenAddNewEmployeePopup(!openAddNewEmployeePopup)
    }

    useEffect(()=>{
        getTasks().then((data)=>setTasks([...data])).catch()

    },[newTask])


    useEffect(()=>{
        getTasks().then((data)=>setTasks([...data])).catch()
    },[])

    async function getTasks(){
        const response = await fetch(`${API_URL}/tasks`)
        const json = await response.json()
        const {data} =  json
        return data
    }
    
  return (
   <Grid container>
  
    <CreateNewTask onTaskAdded={(newTask)=>setNewTask(newTask)} onBackHome={()=>setSelectedEmployee(null)}/>

    {tasks.map((task)=>{
        return <React.Fragment key={JSON.stringify(task)}>
        <TopMarginSpace/>
    <Card sx={{ width:'80%' }}>
 <CardContent>
   <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
     Assigned By: {task.managerEmail}
   </Typography>
   <Typography variant="h5" component="div">
     {task.title}
   </Typography>
   <Typography sx={{ mb: 1.5 }} color="text.secondary">
     Assigned To: {task.email}
   </Typography>
   <Typography variant="body2">
    {task.descripton}
   </Typography>
 </CardContent>

</Card>
   </React.Fragment>
    })}
   </Grid>
  )
}

const styles = {
    page:{padding:5,borderBottom:1}
}


