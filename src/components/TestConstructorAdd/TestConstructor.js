import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import TestTaskConstructor from './TestTaskConstructor'
import Divider from '@material-ui/core/Divider'
import TestCancelDialog from './TestCancelDialog';
import StateContext from '../../context/StateContext'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    background: '#006F51',
    padding: "0"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const {addTest} = React.useContext(StateContext)
  const [open, setOpen] = React.useState(false);
  let [tasks, setTasks] = React.useState([
    {id:1, question:'', score:0, section:1, type:'', imgSrc:'', answers:[
      {id:1, title:'Ответ №1', answer:'', correct:false},
      {id:2, title:'Ответ №2', answer:'', correct:false},
      {id:3, title:'Ответ №3', answer:'', correct:false},
      {id:4, title:'Ответ №4', answer:'', correct:false}
    ]}
  ]);
  let [changeFile, setChangeFile] = React.useState(false)
  let titleTest, timeTest, attemptsTest, maxTasks, manualSrc;
  
  const addTask = () =>{
    let newTask = {
      id: tasks.length+1,
      type:'',
      score:0,
      section:1,
      question:'',
      imgSrc:'',
      answers:[
        {id:1, title:'Ответ №1', answer:'', correct:false}
      ]
    }
    setTasks(tasks.concat(newTask))
  }
  const addAnswer = (id_task) =>{
    let newAnswer = {
      id:tasks[id_task-1].answers.length+1,
      answer:'',
      correct:false
    }
    setTasks(tasks.map(task=>{
      if(task.id === id_task)
        task.answers.push(newAnswer);
        return task;
       }
    ))
  }
  const removeAnswer = (id_task) =>{
    setTasks(tasks.map(task=>{
      if(task.id === id_task)
        task.answers.splice(-1,1);
        return task
    }))
  }
  const getPathManual = ()=>{
    manualSrc = document.getElementById('add-manual').files[0].path
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div style={{height:'100%', width:'100%'}}>
       <Button
        style={{height:'100%', width:'100%', color: '#006F51', borderColor: '#006F51'}}
        variant="outlined"
        startIcon={<AddIcon />}
        size="large"
        onClick = {handleClickOpen}
      >
        Добавить тест
      </Button>
      <Dialog 
        fullScreen 
        open={open} 
        onClose={handleClose} 
        TransitionComponent={Transition}
        scroll='paper'
      >
        <DialogTitle style = {{padding:'0'}}>
          <AppBar className={classes.appBar}>
            <Toolbar> 
               <TestCancelDialog closeConstructor = {handleClose}/>
              <Typography variant="h6" className={classes.title}>
                Создание теста
              </Typography>
              <Button autoFocus color="inherit" onClick={()=>{ 
                if(titleTest.value !== '' && timeTest.value !== '' && attemptsTest.value !== '')
                {
                  console.log(changeFile);
                  
                  if(changeFile)getPathManual();
                  else manualSrc = '';
                  addTest(titleTest.value, timeTest.value, attemptsTest.value, maxTasks.value, manualSrc, tasks)
                  handleClose() 
                  props.setAlert({visible: true, text:'Тест успешно добавлен!',severity: 'success'})
                  setTimeout(() => {props.setAlert({visible: false, text:' ',severity: 'success'})}, 5000);
                  } else { 
                    props.setAlert({visible: true, text:'Проверьте введенные данные!',severity: 'error'})
                    setTimeout(() => {props.setAlert({visible: false, text:' ',severity: 'error'})}, 5000);
                  }
                }
              }>
                Добавить
              </Button>
            </Toolbar>
          </AppBar> 
        </DialogTitle>
        <DialogContent>
          <Grid 
            container   
            direction="row"
            justify="center"
            alignItems="center"
            style={{padding:'10px'}}
          >
            <Grid item style={{padding:5}} xs={6} sm={12} lg={10}>
              <TextField
                label="Название теста" 
                inputRef={node =>titleTest = node}
                variant="outlined" 
                fullWidth={true} 
              />
            </Grid>

              <Grid style={{padding:5}} item xs={6} sm={6}  lg={2}>
                <TextField
                  type = "number"
                  label="Время" 
                  inputRef={node => timeTest = node}
                  variant="outlined" 
                  fullWidth={true} 
                />
              </Grid>
              <Grid style={{padding:5}} item xs={6} sm={6}  lg={4}>
                <TextField
                  type = "number"
                  label="Количество выдаваемых вопросов" 
                  inputRef={node => maxTasks = node}
                  variant="outlined" 
                  fullWidth={true} 
                />
              </Grid>

              <Grid style={{padding:5}} item xs={6} sm={6}  lg={4}>
                <TextField
                  type = "number"
                  label="Попытки" 
                  inputRef={node => attemptsTest = node}
                  variant="outlined" 
                  fullWidth={true} 
                />
              </Grid>
              <Grid style={{padding:5}} item xs={12} sm={6}  lg={4}>
                <div>
                <input 
                  style={{display: 'none'}}
                  id="add-manual"
                  onChange={()=>{setChangeFile(true)}}
                  multiple
                  type="file"
                />
                <label htmlFor="add-manual">
                  <Button 
                    variant="contained" 
                    component="span" 
                    id="taskBtnAddFile"  
                    style={{height:'56px', width:'100%', color: '#FFFFFF', borderColor:'#006F51',background: '#006F51'}} 
                    startIcon={<AddIcon />}
                  > 
                  <LibraryBooksIcon/>
                  </Button>
                </label>
                </div>
              </Grid>
            </Grid>
            <Divider variant="fullWidth"/>

            {tasks.map(task => 
              <TestTaskConstructor 
                addAnswer={addAnswer} 
                removeAnswer={removeAnswer} 
                key={task.id} 
                task={task}
              />
            )}

            <Grid 
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{padding:'10px'}}
            >
              <Grid style={{padding:5}} item xs={12}>
                <Button
                  style={{height:'100%', width:'100%', minHeight:100, color: '#006F51', borderColor:'#006F51'}}
                  variant="outlined" 
                  startIcon={<AddIcon />}
                  onClick={()=>{addTask()}}
                >
                  Добавить задание
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
      </Dialog>
    </div>
  );
}
