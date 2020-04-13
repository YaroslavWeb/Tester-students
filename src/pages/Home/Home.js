import React, {useEffect} from 'react'
import MainHeader from '../../components/MainHeader'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Authorization from '../../components/Authorization'
import StateContext from '../../context/StateContext'

const db = window.require('electron').remote.getGlobal('database');

const Home =() => {
  const [authVisible, setAuthVisible] = React.useState(true)
  const [stud, setStud] = React.useState()
  const [curTest, setCurTest] = React.useState([])
  const {tests, students, setStudents} = React.useContext(StateContext)
  const link = window.location.href
  const index = link.split("student_id=")


  useEffect(()=>{
    if (index[1]){
      setStud(students.filter(student => student._id == index[1]))
      setCurTest(tests)
      setAuthVisible(false)
    }
  },[])
  
  let markStyle = (markObj)=>{
    if(markObj.value >= 90) return markObj.card ? 'greenShadowMark' : 'greenMark'
    if(markObj.value >= 75) return markObj.card ? 'salatShadowMark' : 'salatMark'
    if(markObj.value >= 60) return markObj.card ? 'orangeShadowMark' : 'orangeMark'
    if(markObj.value >= 0) return markObj.card ? 'redShadowMark' : 'redMark'
    return 'noneShadowMark'
  }
  return (      
    <div>
        <MainHeader stud={stud} setStud={setStud} authVisible={authVisible} setAuthVisible={setAuthVisible} setCurTest={setCurTest} />
        {authVisible
        ?<Authorization setStud={setStud} setCurTest={setCurTest} setAuthVisible={setAuthVisible}/>
        :
        <Grow in={true} timeout={1500}>
          <Grid container>
            {curTest.map((test)=>{
              // Массив оценки студента для карточки теста
              const markArray = stud[0].marks.filter(mark => mark.id_test === test._id)
              // Оценка студента для карточки теста
              const markMark = markArray.length ? markArray[0].mark : -1
              // Попытки к тесту
              const markAttempts = markArray.length ? markArray[0].attempts : test.attempts
              let flagGroup = false 
              test.tagsGroups.forEach(tag => tag === stud[0].group ? flagGroup = true : flagGroup = false)
              
              if(test.tagsGroups.length == 0 || flagGroup){

                return(  
                  <Grid item style={{padding:20}} key={test._id} item xs={12} sm={6} lg={4}>
                    <Card 
                      test={test} 
                      className={markStyle({card: true, value: markMark})} 
                      variant="outlined"
                    >
                      <CardContent>
                        <Typography variant="h5" component="h2">
                          Тема:{test.theme}
                        </Typography>
                        <Typography variant="body2" component="p">
                          Оценка: 
                          {
                          markArray.length
                          ?<span className={markStyle({card: false, value:markMark})}>{markMark}%</span> 
                          :<span style = {{color:'white', backgroundColor:'#83898B', padding:'5px'}}>-</span> 
                          }
                        </Typography>
                        <Typography variant="body2" component="p">
                          Кол-во попыток: {markAttempts}/{test.attempts}
                        </Typography>
                        {/* Кол-во вопрососв или кол-во выдаваемых вопрососв? */}
                        {/* <Typography variant="body2" component="p">
                          Кол-во вопросов: {test.tasks.length}
                        </Typography> */}
                        <Typography variant="body2" component="p">
                          Длительность теста: {test.time} мин.
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button 
                          disabled={markAttempts <= 0}
                          variant="outlined" 
                          style = {{color:'#006F51',borderColor:'#006F51'}}
                          onClick={()=>{
                            if(markArray.length){
                              // Уменьшаем кол-во попыток, ЕСЛИ ОН БЫЛ СЛЕП И ГЛУП 
                              markArray[0].attempts -= 1
                              db.students.update({_id:stud[0]._id}, stud[0])
                              db.students.find({}, (err, docs)=>{
                                setStudents(docs)
                                window.location.replace('#/work?test='+test._id +'&student='+stud[0]._id)
                              })
                            }
                            else{
                                // Создаём оценку ДЛЯ НЕОФИТА, который в первый раз проходит тест
                                const newMark = {
                                  id: stud[0].marks.length+1,
                                  id_test: test._id,
                                  attempts: Number(test.attempts)-1,
                                  mark:0
                                }
                                db.students.update({_id:stud[0]._id}, {$push:{marks:newMark}})
                                db.students.find({}, (err, docs)=>{
                                  setStudents(docs)
                                  window.location.replace('#/work?test='+test._id +'&student='+stud[0]._id)
                                })
                              }
                              // Редирект с id выбранного теста и id студента
                            }
                          }>
                          Начать тест
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  )
              }
              else return false;
              })
            }
          </Grid>
        </Grow>
        }
      </div>
        
    )
  }

  export default Home

