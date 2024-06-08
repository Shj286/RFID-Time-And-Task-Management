import { Grid, Typography } from '@mui/material'
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
export default function AdminEmployee() {
    const [employees,setEmployees] = useState([])
    const [openAddNewEmployeePopup,setOpenAddNewEmployeePopup] = useState(false)
    const [selectedEmployee,setSelectedEmployee] = useState(null)
    const [createdEmployees,setCreatedEmployees] = useState()
    const [newEmplopyee,setNewEmployee] = useState()



    const handleNewEmployeePopup = ()=>{
        setOpenAddNewEmployeePopup(!openAddNewEmployeePopup)
    }

    useEffect(()=>{
        getEmployeeIDs().then((data)=>setEmployees([...data])).catch()

    },[newEmplopyee])


    useEffect(()=>{
        getEmployeeIDs().then((data)=>setEmployees([...data])).catch()
    },[])

    async function getEmployeeIDs(){
        const response = await fetch(`${API_URL}/list-Employees`)
        const json = await response.json()
        const {data} =  json
        return data
    }
    
  return (
   <Grid container>
  
    <CreateNewEmployee onEmployeeAdded={(createdEmployee)=>setNewEmployee(createdEmployee)} onBackHome={()=>setSelectedEmployee(null)}/>

    {selectedEmployee?<Grid container sx={styles.page}>
        <EmployeeDetails 
        employeeEmail={selectedEmployee.email} 
        employeeID={selectedEmployee.employeeID}
        firstName={selectedEmployee.firstName}
        lastName={selectedEmployee.lastName}
        workType={selectedEmployee.workType}/>
        </Grid>:<></>}
    {!selectedEmployee && employees.map((data)=>{
        const {firstName,lastName} = data
        return <Grid container sx={styles.page} onClick={()=>setSelectedEmployee(data)}>
            <Typography >{firstName} {lastName} </Typography>
        </Grid>
    })}
   </Grid>
  )
}

const styles = {
    page:{padding:5,borderBottom:1}
}


