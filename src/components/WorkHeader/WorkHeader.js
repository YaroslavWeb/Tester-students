import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitWorkDialog from './ExitWorkDialog'
import LinearProgress from "@material-ui/core/LinearProgress";
import CompleteTestDialog from '../CompleteTestDialog/CompleteTestDialog'

function LinearDeterminate(props) {

  const [completedTime, setCompletedTime] = React.useState(0);
  const [completedTask, setCompletedTask] = React.useState((props.taskCounter/props.maxSteps)*100);
  React.useEffect(() => { 
    function progress() {
      setCompletedTime(oldCompletedTime => {
      if   (oldCompletedTime === 100) 
      {return 0}
        const diff = props.workTestTime /1000; //передавать время теста делить на 10000
        return Math.min(oldCompletedTime + diff, 100);
      });
    }

    const timer = setInterval(progress, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={{marginTop:'10px', width:'55vw'}}>
      <LinearProgress  
        style = {{height:'10px', marginBottom:'10px' }}
        variant="determinate" 
        value={completedTask}/>
      <LinearProgress
        style = {{height:'10px'}}
        variant="determinate"
        value={completedTime}
        color="secondary"
      />

    </div>
  );
}
export default function MainHeader(props) {
  return (
    <div >
      <AppBar position="static" style = {{background:'#006F51'}}>
        <Toolbar style = {{ display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant='h5' style ={{paddingRight:'5px'}} >
            {props.workTestTheme}
          </Typography>
            <div style={{display:'flex', flexDirection:'row'}}>
                {LinearDeterminate(props)}
              <div>
                <div style = {{paddingLeft:'10px'}}>
                  {props.taskCounter}/{props.maxSteps}
                </div>
                <div style = {{paddingLeft:'10px'}}>
                  15:00
                </div>
              </div>
            </div>
           <ExitWorkDialog workStudent = {props.workStudent}/>
        </Toolbar>
     </AppBar>
   </div>
  );
}