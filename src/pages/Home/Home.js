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
const useStyles = makeStyles({
  card: {
    minWidth: 275,
    boxShadow: '0.4em 0.4em 5px rgba(122,122,122,0.5)',
  },
  pos: {
    marginBottom: 12,
  },
});
const Home =() => {
  const [authVisible, setAuthVisible] = React.useState(true)
  const [stud, setStud] = React.useState()
  const [curTest, setCurTest] = React.useState([])
  const {tests, students} = React.useContext(StateContext)
  const classes = useStyles()
  const link = window.location.href
  const index = link.split("student_id=")
  
  useEffect(()=>{
    if (index[1]){
      setStud(students.filter(student => student._id == index[1]))
      setCurTest(tests)
      setAuthVisible(false)
    }
  },[])
  
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
                <Grid item style={{padding:20}} key={test._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Card test={test} className={classes.card} variant="outlined">
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        Тема:{test.theme}
                      </Typography>
              
                      <Typography variant="body2" component="p">
                        Кол-во вопросов: {test.tasks.length}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Длительность теста: {test.time} сек.
                      </Typography>
                      <Typography variant="body2" component="p">
                        Оценка: {markArray.length ? markArray[0].mark : '-'}%
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
