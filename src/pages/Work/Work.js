import React,{useState} from 'react'
import WorkHeader from '../../components/WorkHeader'
import StateContext from '../../context/StateContext'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import WorkAnswersSingle from '../../components/WorkAnswersTypes/WorkAnswersSingle'
import WorkAnswersMulti from '../../components/WorkAnswersTypes/WorkAnswersMulti'
import WorkAnswersText from '../../components/WorkAnswersTypes/WorkAnswersText'


let counterTask = 0

const Work = () =>{
  const link = window.location.href;
  const index = parseInt(link.split("test=")[1].split("")[0], 10);

  const {tests} = React.useContext(StateContext)
  const workTest = tests.filter(test => test.id == index)
  const [actionTask, setActionTask]= useState(workTest[0].tasks[0])
  const maxSteps = workTest[0].tasks.length;

  return (
    <div>
     <WorkHeader workTestTheme={workTest[0].theme} workTestTime={workTest[0].time}/>
     <Grid container direction="column" justify="space-around" alignItems="stretch" style={{padding:20}}>
       <Grid item xs={12} >{actionTask.question}</Grid>
        { 
          actionTask.type == 'Одиночный выбор'? 
          <Grid item xs={12} style={{padding:'center'}}>
          <WorkAnswersSingle actionTask={actionTask} />
          </Grid>:
          actionTask.type == 'Множественный выбор'?  
          <Grid item xs={12} style={{padding:'center'}}>
            <WorkAnswersMulti actionTask={actionTask}/>
            </Grid>:
             <Grid item xs={12} style={{padding:'center'}}>
          <WorkAnswersText actionTask={actionTask}/>
          </Grid>
        }
       
       <Grid item xs={12} style = {{marginTop:'auto'}}>        
        <Button variant="contained" size="large" color="primary" onClick={()=>{
            counterTask++;
            setActionTask(workTest[0].tasks[counterTask])
          }} 
          disabled={counterTask === maxSteps-1}>
          Следующий
        </Button>
       </Grid>
       </Grid>
    </div>
  )
} 
export default Work;