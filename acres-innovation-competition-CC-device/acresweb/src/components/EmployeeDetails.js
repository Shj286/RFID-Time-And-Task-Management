import * as React from 'react';
import {useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WidthSpace from './WidthSpace';
import TasksUserList from './TasksUserList';
import EmployeeHistogram from './EmployeeHistogram';
import { API_URL } from '../api/Endpoints';

export default function EmployeeDetails({
  firstName='',
  lastName = '',
  employeeID = '',
  workType = '',
  employeeEmail = ''
}) {
  const [histogramData,setHistogramData] = useState(null)

  React.useEffect(()=>{
    getHistData().then().catch()
  },[employeeEmail])

  async function getHistData(){
   
     const response = await fetch(`${API_URL}/tasks-histogram-by-email`,{
          method:"POST",
          body:JSON.stringify({email:employeeEmail}),
          headers:{
              "content-type":"application/json"
          }
      })
      const json = await response.json()
      const {data} = json
      setHistogramData(data)

  }

  return (

    
    <Box sx={{ width: '100%',  }}>

     <Box sx={{ width: '100%', }}>
            </Box>

        <Typography variant="h3" gutterBottom>
       Employee Details 
      </Typography>

      <Box sx={{ width: '100%', height:70}}>
            </Box>
      


        <Typography variant="h5" gutterBottom>
        {firstName}
      </Typography>
      <WidthSpace/>

      <Typography variant="h5" gutterBottom>
        {lastName}
      </Typography>
      <WidthSpace/>
      

      <Typography variant="h5" gutterBottom>
        {employeeEmail}
      </Typography>
      <WidthSpace/>

      <Typography variant="h5" gutterBottom>
        {employeeID}
      </Typography>
      <WidthSpace/>

      <Typography variant="h5" gutterBottom>
        {workType}
      </Typography>
      <WidthSpace/>
      {histogramData && <EmployeeHistogram employeeData={histogramData}/>}
    {employeeEmail?<TasksUserList email={employeeEmail}/>:<></>}
    </Box>
    );
  }