import React from 'react'
import StateContext from '../../context/StateContext'
import MainHeader from '../../components/MainHeader'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Authorization from '../Authorization';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    boxShadow: '0.4em 0.4em 5px rgba(122,122,122,0.5)',
  },
  pos: {
    marginBottom: 12,
  },
});
const Home =(props) => {
  const classes = useStyles();
  const {students,tests } = React.useContext(StateContext)
    return (      
      <div>
        <MainHeader/>
        <Authorization/>
         
        <Grid container>
        {tests.map(test=>{
          return(  
          <Grow
            in={true}
            timeout={1500}
            key={test.id}
          >
            <Grid style={{padding:20}}  item xs={12} sm={6} md={4} lg={3} xl={2}>
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
              </CardContent>
        
              <CardActions>
                <Button variant="outlined" onClick={()=>{window.location.replace('#/work?test='+test.id)}}>
                  Начать тест
                </Button>
              </CardActions>
            </Card>
            </Grid>
          </Grow>
          )
        })}
      </Grid>
      </div>
    )
  }

  export default Home
