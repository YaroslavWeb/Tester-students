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
        <Toolbar style = {{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant='h5'>
            Тестирование студентов
          </Typography>
        {props.exitVisible ? 
          <LogoutDialog 
            exitVisible={props.exitVisible} 
            setExitVisible={props.setExitVisible} 
            setStud={props.setStud} 
            setAuthVisible={props.setAuthVisible}
            setCurTest={props.setCurTest}
            logoutStudent = {logoutStudent}
            style={{background:'#006F51'}} 
            color="primary" aria-label="add">
          </LogoutDialog>
          :false
        }
        </Toolbar>
     </AppBar>
   </div>
  );
}