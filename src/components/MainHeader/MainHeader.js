import React from 'react';
import Fab from '@material-ui/core/Fab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export default function MainHeader(props) {
  return (
    <div>
      <AppBar position="static" style = {{background:'#006F51'}}>
        <Toolbar style = {{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant='h5'>
            Тестирование студентов
          </Typography>
        {props.exitVisible ? 
          <Fab style={{background:'#006F51'}} onClick={
            ()=>{
              props.setExitVisible(false)
              props.setCurTest([])
              props.setStud(null)
              props.setAuthVisible(true)
            }}
              color="primary" aria-label="add">
            <ExitToAppIcon />
          </Fab>
          :false
        }
        </Toolbar>
     </AppBar>
   </div>
  );
}