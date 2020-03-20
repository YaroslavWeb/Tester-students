import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitWorkDialog from './ExitWorkDialog'
import LinearProgress from "@material-ui/core/LinearProgress";
// import WorkManualDialog from '../../components/WorkManualDialog'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DoneAllIcon from '@material-ui/icons/DoneAll';
function LinearDeterminate(props) {

  const [completedTime, setCompletedTime] = React.useState(0);
  const [completedTask, setCompletedTask] = React.useState((props.taskCounter/props.maxSteps)*100);
  let timerSec = props.workTestTime * 60;
  let curentTimerSec = 0;
  React.useEffect(() => { 
    function progressTime() {
      setCompletedTime(() => {
      if(timerSec == curentTimerSec){
          clearInterval(timer);
          props.setOpenCompleteDialog(true);
          return 100
      }
      else {
          curentTimerSec++;
          const progressTimer = (timerSec + curentTimerSec - timerSec)/timerSec * 100;
          return progressTimer;
      }
      });
    }

    const timer = setInterval(progressTime, 1000);
    
  }, []);
    React.useEffect(() => {
      setCompletedTask((props.taskCounter/props.maxSteps)*100)
    },[props.taskCounter])
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

  let [timerText, setTimerText] = React.useState({min: props.workTestTime-1, sec: 59 })

  React.useEffect(() => {
    function timerTextValue (props) {
      if (timerText.sec == 0 && timerText.min == 0 ) {
        setTimerText({min:timerText.min, sec: '0' + timerText.sec})
        clearInterval(timer);
    }
    else if (timerText.sec == 0) {
      setTimerText({min:--timerText.min, sec: timerText.sec = 59})
  }   else if ( timerText.sec < 10) {
    setTimerText({min:timerText.min, sec: '0' + timerText.sec--})
  } else 
      {
      setTimerText({min: timerText.min , sec: timerText.sec--})}
      
  }  
  const timer = setInterval(timerTextValue, 1000);
    
}, []);
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
                 {/* <DoneAllIcon style = {{position: 'absolute', paddingLeft: '5px'}}
                 />  */}
                </div>
                <div style = {{paddingLeft:'10px'}}>
                {timerText.min}:{timerText.sec}
                {/* <AccessTimeIcon style = {{position: 'absolute', paddingLeft: '3px'}}
                /> */}
                </div>
              </div>
            </div>
            <div style={{display:'flex' ,flexDirection:'row'}}>
              {/* <WorkManualDialog/> */}
              <ExitWorkDialog workStudent = {props.workStudent}/>
            </div>
        </Toolbar>
     </AppBar>
   </div>
  );
}