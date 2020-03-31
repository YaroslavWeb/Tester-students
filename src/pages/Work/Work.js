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

const db = window.require('electron').remote.getGlobal('database');

const Work = () =>{
  const [openCompleteDialog, setOpenCompleteDialog] = React.useState(false)
  
  let {tests, students, setStudents} = React.useContext(StateContext)

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
  
  // Стейт хранит актуальное задание
  // По умолчанию берётся первое задание
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

  // Таймер текста
  let [timerText, setTimerText] = React.useState({min: workTest[0].time-1, sec: 59 })
  // Массив, в котором хранятся абзацы вопроса
  let questionText = actionTask.question.split('\n')

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
      answerStudent.sort((a,b)=>Number(a)-Number(b))
      
      JSON.stringify(answerStudent) === JSON.stringify(arrayMarkCorrect)
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
  
  React.useEffect(()=>{
    console.log(`текущие баллы: ${correctAnswerCounter}, максимум баллов:${maxScore}`);
    setAnswerStudent([])
  }, [taskCounter])

  let finalMarkStudnet = Math.round(correctAnswerCounter * 100 / maxScore)

  let setMarkStudent = () =>{
    // Ищем нужну оценку у студента
      workStudent[0].marks.forEach(mark =>{
        // Находим
        if (mark.id_test == workTest[0]._id){
          // Если оценка больше оценки, которая уже имеется
          // ТО заносим новую оценку в БД
            if(finalMarkStudnet > Number(mark.mark)){
            let newMark = {
              ...mark,
              attempts:Number(mark.attempts),
              mark:finalMarkStudnet
            }
            let newMarks = workStudent[0].marks.map(mark=>{
              if(mark.id == newMark.id) 
                return (newMark) 
              else 
                return (mark)
            })

            let newStudent = {
              ...workStudent[0],
              marks: newMarks
            }
            db.students.update({_id:workStudent[0]._id}, newStudent)
            db.students.find({}, (err, docs)=>{setStudents(docs)})
          }
        }
      })
  }

  return (
    <div>
     <WorkHeader
      maxSteps = {maxSteps}
      taskCounter = {taskCounter}
      workStudent = {workStudent[0]}
      workTestTime = {workTest[0].time}
      workTestTheme = {workTest[0].theme}
      setOpenCompleteDialog = {setOpenCompleteDialog}
      openCompleteDialog = {openCompleteDialog}
      pathManual = {workTest[0].manualSrc}
      setTimerText = {setTimerText}
      timerText = {timerText}
     />
     {/* workTest[0].manualSrc */}

     <Grid container style={{padding:20, height:'90vh'}}>

        <Grid item xs={12} style = {styles.question}>
          <div>
            {questionText.map((item, index) => {
              return (<p key = {`itemQuestion${index}`} style ={{margin:'0px'}}>{item}</p>);
            })
            }
          </div>
          <div id="image_container">
            <div id="imageMin" onClick={()=>{
              window.open(actionTask.imgSrc, 'Изображение')
            }}>
              <img style={{width:'100%'}} src={actionTask.imgSrc}/>
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
                      setMarkStudent()
                      setOpenCompleteDialog(true)
                    }}
                    style={{marginBottom:'15px',alignSelf: 'flex-end', color:'white',backgroundColor:'rgba(0,113,83)'}} 
                  >
                    Завершить тест
                  </Button>
                : <Button 
                    variant="contained" 
                    size="large" 
                    style={{alignSelf: 'flex-end', color:'white',backgroundColor:'rgba(0,113,83)'}}
                    onClick={()=>{
                      checkAnswer()
                      taskCounter++
                      setTaskCounter(taskCounter)
                      setActionTask(workTest[0].tasks[--taskCounter])
                    }}
                  >
                    <NavigateNextIcon/>
                 </Button>}
          </Grid>    
        </Grid>
       </Grid>
       <CompleteTestDialog 
          maxScore = {maxScore}
          workStudent = {workStudent[0]}
          finalMarkStudnet = {finalMarkStudnet}
          openCompleteDialog = {openCompleteDialog} 
          correctAnswerCounter = {correctAnswerCounter}
          setOpenCompleteDialog = {setOpenCompleteDialog} 
          timerText = {timerText}
          workTestTime = {workTest[0].time}
       />
    </div>
  )
} 
export default Work;

