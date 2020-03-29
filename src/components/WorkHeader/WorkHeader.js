import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitWorkDialog from './ExitWorkDialog'
import LinearProgress from "@material-ui/core/LinearProgress";
// import WorkManualDialog from '../../components/WorkManualDialog'

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
 function timerTextValue () {
      if (props.timerText.sec == 0 && props.timerText.min == 0 ) {
        props.setTimerText({min:props.timerText.min, sec: '0' + props.timerText.sec})
        clearInterval(props.intervalTimer);
    }
    else if (props.timerText.sec == 0) {
      props.setTimerText({min:--props.timerText.min, sec: props.timerText.sec = 59})
  } else if ( props.timerText.sec < 10) {
    props.setTimerText({min:props.timerText.min, sec: '0' + props.timerText.sec--})
  } else 
      {
        props.setTimerText({min: props.timerText.min , sec: props.timerText.sec--})}
      
  }  
  React.useEffect(() => {
   props.intervalTimer = props.timer(timerTextValue, true);
    
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
                {props.timerText.min}:{props.timerText.sec}
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