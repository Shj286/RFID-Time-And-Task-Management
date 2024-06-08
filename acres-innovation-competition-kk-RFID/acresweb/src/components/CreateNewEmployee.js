import React, { useEffect, useState } from 'react'
import {TextField,Button, Grid,Card,CardActions,CardContent,Typography,} from '@mui/material'
import TopMarginSpace from './TopSpace'
import { API_URL } from '../api/Endpoints'
import PopupForm from './PopupForm';
import HomeButton from './HomeButton';
import AddButton from './AddButton';
export default function CreateNewEmployee({
  onEmployeeAdded=()=>{},
  onBackHome = ()=>{}
}) {

    const [FirstName,setFirstName] = useState();
    const [LastName,setLastName] = useState();
    const [employeeEmail,setEmployeeEmail] = useState();
    const [Password,setPassword] = useState();
    const [EmployeeID,setEmployeeID] = useState();
    const [EmployeeIDDescription,setEmployeeIDDescription] = useState();
    const [workType,setWorkType] = useState();

    const [openAddNewEmployeePopup,setOpenAddNewEmployeePopup] = useState(false)

    const handleNewEmployeePopup = ()=>{
        setOpenAddNewEmployeePopup(!openAddNewEmployeePopup)
    }

    async function addNewEmployeeID(){
      const employee = {
        email:employeeEmail,
        firstName:FirstName,
        description:EmployeeIDDescription,
        password:Password,
        employeeID:EmployeeID,
        lastName:LastName,
        workType:workType
    }
       await fetch(`${API_URL}/add-EmployeeID`,{
            method:"POST",
            body:JSON.stringify(employee),
            headers:{
                "content-type":"application/json"
            }
        })
        setFirstName('')
        setEmployeeEmail('')
        setPassword('')
        setEmployeeID('')
        setEmployeeIDDescription('')
      
        onEmployeeAdded(employee)

    }
 /**
     * 
     * @param {object} newUser 
     * @param {string} newUser.firstName
     * @param {string} newUser.lastName
     * @param {string} newUser.email
     * @param {string} newUser.password
     * @param {string} newUser.employeeID
     */
  return (
    <Grid container>
       <Grid item> <HomeButton sx={{color:'green',fontSize:30,position:'relative',top:10}} onPress={()=>onBackHome(null)}/></Grid>
    <Grid item><AddButton onPress={()=>handleNewEmployeePopup()}/> </Grid>
      <PopupForm title={"Add New Employee"} openForm={openAddNewEmployeePopup} onClose={handleNewEmployeePopup} onSubmit={async ()=>await addNewEmployeeID()}>
    <TextField sx={styles.textField} id="outlined-basic"  value={FirstName} label="First Name" variant="outlined" onChange={(e)=>setFirstName(e.target.value)}/>
    <TopMarginSpace/>
    <TextField sx={styles.textField} id="outlined-basic"  value={LastName} label="Last Name" variant="outlined" onChange={(e)=>setLastName(e.target.value)}/>
    <TopMarginSpace/>
    <TextField sx={styles.textField} id="outlined-basic" value={employeeEmail} type='email' label="Employee Email" variant="outlined" onChange={(e)=>setEmployeeEmail(e.target.value)}/>
    <TopMarginSpace/>
    <TextField sx={styles.textField} id="outlined-basic" value={EmployeeID} label="EmployeeID" variant="outlined" onChange={(e)=>setEmployeeID(e.target.value)}/>
    <TopMarginSpace/>
    <TextField sx={styles.textField} id="outlined-basic" value={Password} type='password' label="Password" variant="outlined" onChange={(e)=>setPassword(e.target.value)}/>
    <TopMarginSpace/>
    <TextField sx={styles.textField} id="outlined-basic" value={workType} type='text' label="Work Type" variant="outlined" onChange={(e)=>setWorkType(e.target.value)}/>
    <TopMarginSpace/>
   
   
    </PopupForm>
    </Grid>
  )
}

const styles = {
  textField:{
    width:'90%'
  }
}
