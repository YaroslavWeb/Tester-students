import React from 'react'
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
  const classes = useStyles();
  const [authVisible, setAuthVisible] = React.useState(true)
  const [exitVisible, setExitVisible] = React.useState(false)
  const [stud, setStud] = React.useState()
  const [curTest, setCurTest] = React.useState([])
  return (      
    <div>
        <MainHeader stud = {stud} exitVisible={exitVisible} setExitVisible={setExitVisible} setStud={setStud} setAuthVisible={setAuthVisible} setCurTest={setCurTest} />
         
        {authVisible
        ?<Authorization setStud={setStud} setCurTest={setCurTest} setAuthVisible={setAuthVisible} setExitVisible={setExitVisible}/>
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
                      <Button variant="outlined" onClick={()=>{window.location.replace('#/work?test='+test._id)}}>
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
