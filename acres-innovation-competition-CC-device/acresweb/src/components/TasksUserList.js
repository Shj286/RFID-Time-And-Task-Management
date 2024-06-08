import React, { useEffect, useState } from 'react'
import {TextField,Button, Grid,Card,CardActions,CardContent,Typography,} from '@mui/material'
import TopMarginSpace from './TopSpace'
import { API_URL } from '../api/Endpoints'
export default function TasksUserList({email = ''}) {

    const [tasks,setTasks] = useState([])

    useEffect(()=>{
      if(email)
          getTasksByEmail(email).then((data)=>setTasks([...data])).catch()
    },[email])

    useEffect(()=>{
      if(email){
        getTasksByEmail(email).then((data)=>setTasks([...data])).catch()
      }
    },[])

   
    async function getTasks(){
      const response = await fetch(`${API_URL}/tasks-by-email`)
      const json = await response.json()
      const {data} =  json
      return data
  }

    async function getTasksByEmail(email){
       const response = await fetch(`${API_URL}/tasks-by-email`,{
            method:"POST",
            body:JSON.stringify({
                email:email,
            }),
            headers:{
                "content-type":"application/json"
            }
        })

        const json = await response.json()
        const {data} =  json
        return data
    }

  return (
    <Grid container  sx={{flex:1,flexDirection:'column',padding:10,}} >

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
