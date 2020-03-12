import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitWorkDialog from './ExitWorkDialog'
import LinearProgress from "@material-ui/core/LinearProgress";
import CompleteTestDialog from '../CompleteTestDialog/CompleteTestDialog'
const useStyles = makeStyles(theme => ({
  root: {
        flexGrow: 1,
        width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
      },},
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
}));
function LinearDeterminate(workTestTime) {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);
  React.useEffect(() => { 
    function progress() {
      setCompleted(oldCompleted => {
      if   (oldCompleted === 100) 
      {return 0}
        const diff = workTestTime /1000; //передавать время теста делить на 10000
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate"   value={0}/>
      <LinearProgress
        variant="determinate"
        value={completed}
        color="secondary"
      />
    </div>
  );
}
export default function MainHeader(props) {
  const classes = useStyles();
  return (
    <div >
      <AppBar position="static" style = {{background:'#006F51'}}>
        <Toolbar style = {{ display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant='h5' >
            {props.workTestTheme}
          </Typography>
            <div className={classes.root}>
            {LinearDeterminate(props.workTestTime)}
            </div>
           <ExitWorkDialog workStudent = {props.workStudent}/>
        </Toolbar>
     </AppBar>
   </div>
  );
}