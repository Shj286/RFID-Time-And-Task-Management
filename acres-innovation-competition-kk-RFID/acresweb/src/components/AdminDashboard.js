import React, { useState } from 'react';
import { Grid, Typography, Box, Slide } from '@mui/material';
import AdminTaskCategory from './AdminTaskCategory';
import AdminProjects from './AdminProjects';
import AdminSites from './AdminSites';
import AdminEmployee from './AdminEmployee';
import AdminTasks from './AdminTasks';
import { AcresColors } from '../assets/colors';
import adminImage from './acresLogo.png'; // Import the image

const PROJECTS_CATEGORY = 'Projects';
const EMPLOYEE_CATEGORY = 'Employees';
const SITE_CATEGORY = 'Sites';
const TASKS_CATEGORY = 'Tasks';

const footerStyle = {
    backgroundColor: '#015958',
    color: 'white',
    padding: '20px',
    borderRadius: '10px',
  };

export default function AdminDashboard() {
  const [selected, setSelected] = useState(PROJECTS_CATEGORY);

  const category = [
    { name: 'Sites', bgColor: '#103778', color: 'white', onPress: () => setSelected(SITE_CATEGORY) },
    { name: 'Projects', bgColor: '#015958', color: 'white', onPress: () => setSelected(PROJECTS_CATEGORY) },
    { name: 'Employees', bgColor: '#D94F04', color: 'white', onPress: () => setSelected(EMPLOYEE_CATEGORY) },
    { name: 'Tasks', bgColor: AcresColors.headingColor, color: 'white', onPress: () => setSelected(TASKS_CATEGORY) },
  ];

  return (
         <Grid container spacing={4} justifyContent="center" sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 10 }}>
     <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4,marginLeft:50 }}>
        {/* Display the image */}
        <img src={adminImage} alt="Admin" style={{ width: '130%', borderRadius: 10, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}/>
      <Grid item xs={12}>
        </Grid>
      </Grid>
      {category.map(({ color, name, bgColor, onPress }) => (
        <Grid item key={name}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={500}>
            <div style={{ cursor: 'pointer' }} onClick={onPress}>
              <AdminTaskCategory selected={name === selected} title={name} bgColor={bgColor} textColor={color} />
            </div>
          </Slide>
        </Grid>
      ))}
      <Grid item xs={12} sx={{ backgroundColor: 'lightgrey',width:'100%',borderRadius:'2px' }}>
        <Box mt={4}>
          <Typography variant="h5" align="center">
            {selected}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} >
        {selected === PROJECTS_CATEGORY && <AdminProjects />}
        {selected === SITE_CATEGORY && <AdminSites />}
        {selected === EMPLOYEE_CATEGORY && <AdminEmployee />}
        {selected === TASKS_CATEGORY && <AdminTasks />}
      </Grid>
      
      <Grid item xs={12} sx={{ backgroundColor: 'black', color: 'white', padding: '20px', borderRadius: '10px',width:'50%' }}>
        <Typography variant="body1" align="center">
          ■ general contracting    ■ industrial contracting    ■ civil contracting
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ ...footerStyle, flexDirection: 'column', alignItems: 'center',backgroundColor:'#00703b' }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item > 
            <Typography variant="h6" align="center">
              HEAD OFFICE:
            </Typography>
            <Typography variant="body1" align="center">
              971 CAMOSUN CRESCENT
              <br />
              KAMLOOPS, BC V2C 6G1
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center">
              KELOWNA OFFICE:
            </Typography>
            <Typography variant="body1" align="center">
              102 – 546 LEON AVENUE
              <br />
              KELOWNA, BC V1Y 6J6
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center">
              PRINCE GEORGE OFFICE:
            </Typography>
            <Typography variant="body1" align="center">
              1558 Quinn Street
              <br />
              Prince George, BC V2N 1X3
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center">
              PHONE:
              <br />
              OFFICE: 250-372-7456
              <br />
              FAX: 250-372-7300
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center">
              OFFICE HOURS:
              <br />
              MON – FRI
              <br />
              8:00 AM – 4:30 PM
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}