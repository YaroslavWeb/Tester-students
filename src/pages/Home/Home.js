import React, {useEffect} from 'react'
import MainHeader from '../../components/MainHeader'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Authorization from '../../components/Authorization'
import StateContext from '../../context/StateContext'

const Home =() => {
  const [authVisible, setAuthVisible] = React.useState(true)
  const [stud, setStud] = React.useState()
  const [curTest, setCurTest] = React.useState([])
  const {tests, students, teachers} = React.useContext(StateContext)
  const link = window.location.href
  const index = link.split("student_id=")
  
  console.log(teachers);
  
  useEffect(()=>{
    if (index[1]){
      setStud(students.filter(student => student._id == index[1]))
      setCurTest(tests)
      setAuthVisible(false)
    }
  },[])
  
  let markStyle = (markObj  = {card: true, value: -1})=>{
    if(markObj.value >= 90) return markObj.card ? 'greenShadowMark' : 'greenMark'
    else if(markObj.value >= 75 && markObj.value < 90) return markObj.card ? 'salatShadowMark' : 'salatMark'
    else if(markObj.value >= 60 && markObj.value < 75) return markObj.card ? 'orangeShadowMark' : 'orangeMark'
    else if(markObj.value < 60 && markObj.value >= 0) return markObj.card ? 'redShadowMark' : 'redMark'
    else if(markObj.value == -1) return 'noneShadowMark'
  }

  return (      
    <div>
        <MainHeader stud={stud} setStud={setStud} authVisible={authVisible} setAuthVisible={setAuthVisible} setCurTest={setCurTest} />
        {authVisible
        ?<Authorization setStud={setStud} setCurTest={setCurTest} setAuthVisible={setAuthVisible}/>
        :
        <Grow
        in={true}
        timeout={1500}
        >
          <Grid container>
            {curTest.map((test)=>{
              const markArray = stud[0].marks.filter(mark => mark.id_test === test._id)
              return(  
                <Grid item style={{padding:20}} key={test._id} item xs={12} sm={6} md={4}>
                  <Card 
                    test={test} 
                    className={
                      markArray.length
                      ?markStyle({card: true, value: markArray[0].mark})
                      :markStyle()
                    } 
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
                        ?<span className={markStyle({card: false, value:markArray[0].mark})}>{markArray[0].mark}%</span> 
                        :<span style = {{color:'white', backgroundColor:'#83898B', padding:'5px'}}>-</span> 
                        }
                      </Typography>
                      <Typography variant="body2" component="p">
                        Кол-во вопросов: {
                        markArray.length
                        ?markArray[0].attempts
                        :test.attempts
                        }
                      </Typography>
                      <Typography variant="body2" component="p">
                        Кол-во вопросов: {test.tasks.length}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Длительность теста: {test.time} мин.
                      </Typography>
                    </CardContent>
            
                    <CardActions>
                      <Button variant="outlined" style = {{color:'#006F51',borderColor:'#006F51'}}
                        onClick={()=>{window.location.replace('#/work?test='+test._id +'&student='+stud[0]._id)}}>
                        Начать тест
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                )
              })
            }
          </Grid>
        </Grow>
        }
      </div>
    )
  }

  export default Home
