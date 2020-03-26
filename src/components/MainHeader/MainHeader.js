import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LogoutDialog from '../LogoutDialog/LogoutDialog';


export default function MainHeader(props) {
  const [logoutStudent, setLogoutStudent] = useState(true)

  return (
    <div>
      <AppBar position="static" style = {{background:'#006F51'}}>
        
        {props.authVisible === false
        ? 
         <Toolbar style = {{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <Typography variant='h5'>
              {props.stud[0].name} 
              <span style ={{marginLeft:'5px',backgroundColor:'#006F51',fontSize:'0.9rem', color:'white', padding:'5px', boxShadow:'-1px -1px 6px #002c20,1px 1px 6px #00b282' }}>
                {props.stud[0].group}
              </span>
            </Typography>
          </div>
            <LogoutDialog 
              setStud={props.setStud} 
              setAuthVisible={props.setAuthVisible}
              setCurTest={props.setCurTest}
              logoutStudent = {logoutStudent}
              style={{background:'#006F51'}} 
              color="primary" aria-label="add">
            </LogoutDialog>
          </Toolbar>
          :
          <Toolbar style = {{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant='h5'>
            Тестирование студентов
            </Typography>
          </Toolbar>
        }
       
     </AppBar>
   </div>
  );
}