import React,{useState} from 'react'
import WorkHeader from '../../components/WorkHeader'
import StateContext from '../../context/StateContext'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import WorkAnswersSingle from '../../components/WorkAnswersTypes/WorkAnswersSingle'

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
     <Grid container style={{margin:20}}>
      
       <Grid item xs={12}>{actionTask.question}</Grid>
       <Grid item xs={12}>
        { 
          actionTask.type == 'Одиночный выбор'? <WorkAnswersSingle/>:
          actionTask.type == 'Множественный выбор'? <div>Множественный выбор</div>:
          <div>Ввод текста</div>
        }
       </Grid>
       <Grid item xs={12}>        
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