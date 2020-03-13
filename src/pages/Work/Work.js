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
import styles from './Work.style'
import DescriptionIcon from '@material-ui/icons/Description';
const Work = () =>{
  const {tests, students} = React.useContext(StateContext)
  // Получение id теста и id студента из url,  который проходит студент
  const link = window.location.href
  let indexes = link.split("?")
  indexes = indexes[1].split("&")
  const testId = indexes[0].split('test=')
  const studId = indexes[1].split('student=')
  
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

  let [taskCounter, setTaskCounter] = useState(1);
  
  return (
    <div>
     <WorkHeader taskCounter = {taskCounter} maxSteps = {maxSteps} workTestTheme={workTest[0].theme} workTestTime={workTest[0].time} workStudent ={workStudent[0]}/>
     <Grid container style={{padding:20, height:'90vh'}}>
      {/* <webview style={{width:'500px', height:'500px'}} src="file://D:/Diplom_2.0/Tester-students/public/assets/doc/док.pdf" plugins="true"></webview> */}
      {/* src="file://E:/programming/Tester-students/public/assets/doc/док.pdf" */}
        <Grid item xs={12}  style = {styles.question}>
        <Grid container  justify="flex-end" alignItems="flex-end" >  
          <Button>
          <DescriptionIcon style = {{color :'#006F51'}}/>
        </Button>
        </Grid>
        <div>
         {actionTask.question}
        </div>
        
      
      
        <div id="image_container">
          <div id="imageMin" onClick={()=>{
            window.open('file://D:/Diplom_2.0/Tester-students/public/assets/img/scr1.png', 'Изображение')
            //file://E:/programming/Tester-students/public/assets/img/scr1.png
          }}>
            <img style={{width:'100%'}} src='file://D:/Diplom_2.0/Tester-students/public/assets/img/scr1.png'/>
            {/* file://E:/programming/Tester-students/public/assets/img/scr1.png */}
          </div>
        </div>
       </Grid>
       <Grid item xs={12} style = {styles.workAnswers}>
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
              {taskCounter == maxSteps
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