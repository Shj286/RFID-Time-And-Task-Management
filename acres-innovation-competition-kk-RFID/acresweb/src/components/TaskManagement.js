import React, { useEffect, useState } from 'react'
import {TextField,Button, Grid,Card,CardActions,CardContent,Typography,} from '@mui/material'
import TopMarginSpace from './TopSpace'
import { API_URL } from '../api/Endpoints'
export default function TaskManagement() {

    const [title,setTitle] = useState();
    const [employeeEmail,setEmployeeEmail] = useState();
    const [managerEmail,setManagerEmail] = useState();
    const [task,setTask] = useState();
    const [taskDescription,setTaskDescription] = useState();

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

    async function addNewtask(){
       await fetch(`${API_URL}/add-task`,{
            method:"POST",
            body:JSON.stringify({
                email:employeeEmail,
                title:title,
                description:taskDescription,
                managerEmail:managerEmail,
                task:task
            }),
            headers:{
                "content-type":"application/json"
            }
        })
        setTitle('')
        setEmployeeEmail('')
        setManagerEmail('')
        setTask('')
        setTaskDescription('')
       
    }

  return (
    <Grid container  sx={{flex:1,flexDirection:'column',padding:10,}} >
    <TextField id="outlined-basic" value={title} label="Title" variant="outlined" onChange={(e)=>setTitle(e.target.value)}/>
    <TopMarginSpace/>
    <TextField id="outlined-basic" value={employeeEmail} type='email' label="Employee Email" variant="outlined" onChange={(e)=>setEmployeeEmail(e.target.value)}/>
    <TopMarginSpace/>
    <TextField id="outlined-basic" value={managerEmail} type='email' label="Managers Email" variant="outlined" onChange={(e)=>setManagerEmail(e.target.value)}/>
    <TopMarginSpace/>
    <TextField id="outlined-basic" value={task} label="Task" variant="outlined" onChange={(e)=>setTask(e.target.value)}/>
    <TopMarginSpace/>
    <TextField
        value={taskDescription}
        onChange={(e)=>setTaskDescription(e.target.value)}
          id="outlined-multiline-static"
          label="Task Description"
          multiline
          rows={4}
        />
    <TopMarginSpace/>
    <Button variant="contained" disableElevation onClick={async ()=>{
        await addNewtask();
       const newTasks =  await getTasks()
       console.log('newTasks',newTasks)
       setTasks([...newTasks])
        

    }}>Add Task</Button>

    <TopMarginSpace/>


    {tasks.map((task)=>{
       return(
        <React.Fragment key={JSON.stringify(task)}>
            <TopMarginSpace/>
        <Card sx={{ minWidth: 275 }}>
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
     <CardActions>
       <Button size="small">More task By {task.email}</Button>
     </CardActions>
   </Card>
       </React.Fragment>
       )
    })}
    </Grid>
  )
}
