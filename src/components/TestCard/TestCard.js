import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TestCardDialogRemove from './TestCardDialogDelete'
import TestCardDialogEdit from '../TestConstructorEdit'
const useStyles = makeStyles({
  card: {
    minWidth: 275,
    boxShadow: '0.4em 0.4em 5px rgba(122,122,122,0.5)',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TestCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Тема:{props.test.theme}
        </Typography>

        <Typography variant="body2" component="p">
          Кол-во вопросов: {props.test.tasks.length}
        </Typography>
        <Typography variant="body2" component="p">
          Кол-во попыток: {props.test.attempts}
        </Typography>
        <Typography variant="body2" component="p">
          Длительность теста: {props.test.time} мин.
        </Typography>
        <hr/>
      </CardContent>

      <CardActions>
        <TestCardDialogEdit 
          alertState = {props.alertState}
          setAlert= {props.setAlert}
          test = {props.test}/>

        <TestCardDialogRemove id_test = {props.test._id}/>
      </CardActions>
    </Card>
  );
}