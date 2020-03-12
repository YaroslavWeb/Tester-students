import React,{useState} from 'react'
import StateContext from '../../context/StateContext'
import WorkHeader from '../../components/WorkHeader'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import WorkAnswersSingle from '../../components/WorkAnswersTypes/WorkAnswersSingle'
import WorkAnswersMulti from '../../components/WorkAnswersTypes/WorkAnswersMulti'
import WorkAnswersText from '../../components/WorkAnswersTypes/WorkAnswersText'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import CompleteTestDialog from '../../components/CompleteTestDialog'

const Work = () =>{
  // Получение id теста и id студента из url,  который проходит студент
  const link = window.location.href
  let indexes = link.split("?")
  indexes = indexes[1].split("&")
  const testId = indexes[0].split('test=')
  const studId = indexes[1].split('student=')
  const {tests, students} = React.useContext(StateContext)
  // Запись актуального теста
  const workTest = tests.filter(test => test._id == testId[1])
  // Запись актуального студента
  const workStudent = students.filter(student => student._id == studId[1])
  /* 
  Стейт хранит список всех заданий теста 
  По умолчанию берётся первое задание
  */
  const [actionTask, setActionTask]= useState(workTest[0].tasks[0])
 
  // Максимальное количество заданий
  let maxSteps = workTest[0].tasks.length;

  let [taskCounter, setTaskCounter] = useState(0);
  
  return (
    <div>
     <WorkHeader workTestTheme={workTest[0].theme} workTestTime={workTest[0].time} workStudent ={workStudent[0]}/>
     <Grid container style={{padding:20, height:'90vh'}}>
       
       <Grid item xs={12} 
       style = {{height:'45vh', backgroundColor: 'rgba(0,113,83, 0.1)',
       border:'1px solid rgba(0,113,83)', borderRadius:'3px',
       padding:'20px',boxShadow: '0.4em 0.4em 5px rgba(122,122,122,0.5)'}}>
         {actionTask.question}
         <img src='file://E:/programming/Tester-students/public/icon.png' />
       </Grid>
       
       <Grid item xs={12} style = {{ backgroundColor: 'rgba(0,113,83, 0.1)', border:'1px solid rgba(0,113,83)',borderRadius:'3px',boxShadow: '0.4em 0.4em 5px rgba(122,122,122,0.5)'}}>
        { 
          actionTask.type == 'Одиночный выбор'? 
          <WorkAnswersSingle actionTask={actionTask} />:
          actionTask.type == 'Множественный выбор'? 
          <WorkAnswersMulti actionTask={actionTask}/>:
          <WorkAnswersText actionTask={actionTask}/>
        }
        </Grid>
       
        <Grid item xs={12} > 
          <Grid container direction="row" justify="flex-end" alignItems="flex-end" style={{height:'100%'}}>   
              {taskCounter == maxSteps-1 
                ?<CompleteTestDialog  workStudent ={workStudent[0]}/>
                :<Button variant="contained" size="large" style={{alignSelf: 'flex-end', color:'white',backgroundColor:'rgba(0,113,83)'}}
                    onClick={()=>{
                      taskCounter++
                      setTaskCounter(taskCounter)
                      setActionTask(workTest[0].tasks[taskCounter])
                      
                    }}>
                    <NavigateNextIcon/>
                 </Button>}
          </Grid>    
        </Grid>
       </Grid>
    </div>
  )
} 
export default Work;