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

const Work = () =>{
  const [openCompleteDialog, setOpenCompleteDialog] = React.useState(false);
  let {tests, students, setMarkStudent} = React.useContext(StateContext)

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
  Стейт хранит актуальное задание
  По умолчанию берётся первое задание
  */
  let [actionTask, setActionTask]= useState(workTest[0].tasks[0])

  // Максимальное количество заданий
  let maxSteps = workTest[0].tasks.length
  // Максимальное кол-во баллов
  let maxScore = 0;
  workTest[0].tasks.forEach(item => maxScore+=Number(item.score))

  // Счётчик актуального задания
  let [taskCounter, setTaskCounter] = useState(1)

  // Баллы за правильный ответ
  let [correctAnswerCounter, setCorrectAnswerCounter] = useState(0)
  // Ответ студента
  let [answerStudent, setAnswerStudent] = React.useState([]);

  // Проверка ответа студента и внесение баллов
  let checkAnswer = () => {
    if(actionTask.type == 'Одиночный выбор'){
      actionTask.answers.forEach(answer => {
          if(answer.correct){
            // провека id правильного ответа с ответом студента
            answerStudent[0] == answer.id
            ? setCorrectAnswerCounter(correctAnswerCounter + Number(actionTask.score))
            : setCorrectAnswerCounter(correctAnswerCounter)
          }
      });
    }
    else if (actionTask.type == 'Множественный выбор'){
      // Массив с правильными ответами
      let arrayMarkCorrect = []
      actionTask.answers.forEach(answer => answer.correct?arrayMarkCorrect.push(String(answer.id)):false)
      // Массив с совпалдениями
      let correctChoise = answerStudent.filter(i => {return arrayMarkCorrect.indexOf(i) < 0;});
      correctChoise.length === 0 
      ? setCorrectAnswerCounter(correctAnswerCounter + Number(actionTask.score))
      : setCorrectAnswerCounter(correctAnswerCounter)
    }
    else if (actionTask.type == 'Ввод текста'){
      actionTask.answers.forEach(answer => {
        if(answer.correct){
          answer.answer.toUpperCase() == answerStudent
           ? setCorrectAnswerCounter(correctAnswerCounter + Number(actionTask.score))
           : setCorrectAnswerCounter(correctAnswerCounter)
        }
      })
    }
  }

  let setAnswerStudentText = (inputValue) => {setAnswerStudent(inputValue)}
  console.log(`текущие баллы: ${correctAnswerCounter}, максимум баллов:${maxScore}`);
  
  React.useEffect(()=>{
    setAnswerStudent([])
  }, [taskCounter])

  return (
    <div>
     <WorkHeader
      setOpenCompleteDialog = {setOpenCompleteDialog}
      taskCounter = {taskCounter}
      maxSteps = {maxSteps}
      workTestTheme={workTest[0].theme}
      workTestTime={workTest[0].time}
      workStudent ={workStudent[0]}
     />
     <Grid container style={{padding:20, height:'90vh'}}>
        <Grid item xs={12}  style = {styles.question}>
          <div>
            {actionTask.question}
          </div>
          <div id="image_container">
            <div id="imageMin" onClick={()=>{
              window.open('file://E:/programming/Tester-students/public/assets/img/scr1.png', 'Изображение')
              //file://E:/programming/Tester-students/public/assets/img/scr1.png
              //file://D:/Diplom_2.0/Tester-students/public/assets/img/scr1.png
            }}>
              {/* <img style={{width:'100%'}} src='file://E:/programming/Tester-students/public/assets/img/scr1.png'/> */}
            </div>
          </div>
       </Grid>
       <Grid item xs={12} style = {styles.workAnswers}>
        { 
        // Отрисовка ответов по типу задания
          actionTask.type == 'Одиночный выбор'
          ? <WorkAnswersSingle 
              answerStudent={answerStudent}
              setAnswerStudent={setAnswerStudent} 
              actionTask={actionTask} 
            />
          :actionTask.type == 'Множественный выбор'
          ? <WorkAnswersMulti
              answerStudent={answerStudent}
              setAnswerStudent={setAnswerStudent} 
              actionTask={actionTask}
            />
          : <WorkAnswersText
              setAnswerStudentText={setAnswerStudentText} 
              actionTask={actionTask}
            />
        }
        </Grid>
        <Grid item xs={12} > 
          <Grid container direction="row" justify="flex-end" alignItems="flex-end" style={{height:'100%'}}>   
              {taskCounter == maxSteps
                ? <Button 
                    variant="contained" size="large" 
                    onClick={()=>{
                      setOpenCompleteDialog(true)
                    }}
                    style={{marginBottom:'15px',alignSelf: 'flex-end', color:'white',backgroundColor:'rgba(0,113,83)'}} 
                  >
                    Завершить тест
                  </Button>
                : <Button variant="contained" size="large" style={{alignSelf: 'flex-end', color:'white',backgroundColor:'rgba(0,113,83)'}}
                    onClick={()=>{
                      checkAnswer()
                      taskCounter++
                      setTaskCounter(taskCounter)
                      setActionTask(workTest[0].tasks[--taskCounter])
                    }}>
                    <NavigateNextIcon/>
                 </Button>}
          </Grid>    
        </Grid>
       </Grid>
       <CompleteTestDialog 
        openCompleteDialog = {openCompleteDialog} 
        setOpenCompleteDialog = {setOpenCompleteDialog} 
        workStudent ={workStudent[0]}
        maxScore={maxScore}
        correctAnswerCounter = {correctAnswerCounter}
       />
    </div>
  )
} 
export default Work;

