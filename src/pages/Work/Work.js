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
     <Grid container style={{padding:20, height:'90vh'}}>
       
       <Grid item xs={12} style = {{height:'45vh', backgroundColor: 'rgba(0,113,83, 0.1)'}}>{actionTask.question}</Grid>
       
       <Grid item xs={12} style = {{ backgroundColor: 'rgba(0,113,83, 0.1)'}}>
        { 
          actionTask.type == 'Одиночный выбор'? 
          <WorkAnswersSingle actionTask={actionTask} />:
          actionTask.type == 'Множественный выбор'? 
          <WorkAnswersMulti actionTask={actionTask}/>:
          <WorkAnswersText actionTask={actionTask}/>
        }
        
        </Grid>
       
       <Grid item xs={12} > 
       <Grid container  direction="row" justify="flex-end" alignItems="flex-end" style={{height:'100%'}}>   
        <Button variant="contained" size="large" color="primary" style={{alignSelf: 'flex-end'}} onClick={()=>{
            counterTask++;
            setActionTask(workTest[0].tasks[counterTask])
          }} 
          disabled={counterTask === maxSteps-1}>
          Следующий
        </Button>
        </Grid>    
       </Grid>
       </Grid>
    </div>
  )
} 
export default Work;