import React, {useState} from 'react';
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
import TestCancelDialog from './TestCancelDialog';
import StateContext from '../../context/StateContext'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Divider from '@material-ui/core/Divider'
import TestTaskConstructor from "./TestTaskConstructor";
import Autocomplete from '@material-ui/lab/Autocomplete';
const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    background: '#006F51'
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
  const {editTest} = React.useContext(StateContext)
  const [open, setOpen] = React.useState(false);
  let [tasks, setTasks] = React.useState(props.test.tasks)
  let [changeFile, setChangeFile] = React.useState(false)

  let titleTest, timeTest, attemptsTest, maxTasks, manualSrc;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getPathManual = ()=>{
    manualSrc = document.getElementById('edit-manual').files[0].path
  }
  const {students} = React.useContext(StateContext)

  return (
    <div>
      <IconButton aria-label="edit" onClick ={handleClickOpen}>
        <EditIcon/>
      </IconButton>
      <Dialog 
        fullScreen 
        open={open} 
        onClose={handleClose} 
        TransitionComponent={Transition}
        scroll='paper'
      >
        <DialogTitle style={{padding:'0'}}>
          <AppBar className={classes.appBar}>
            <Toolbar> 
               <TestCancelDialog closeConstructor = {handleClose}/>
              <Typography variant="h6" className={classes.title}>
                Редактирование теста
              </Typography>
              <Button autoFocus color="inherit" onClick={()=>{
                if(titleTest.value!=="" && timeTest.value!=="" && attemptsTest.value!==""){
                  if(changeFile)getPathManual();
                  else manualSrc = props.test.manualSrc;
                  
                  editTest(props.test._id, titleTest.value, timeTest.value, attemptsTest.value, maxTasks.value, props.test.tagsGroups, manualSrc, tasks)
                  handleClose()                
              } 
              else {
                props.setAlert({visible: true, text:'Проверьте введенные данные!',severity: 'error'})
                  setTimeout(() => {props.setAlert({visible: false, text:' ',severity: 'error'})}, 5000);
              }}}>
                Сохранить
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
            <Grid item style={{padding:5}} xs={4} sm={8} lg={6}>
              <TextField
                label="Название теста" 
                defaultValue={props.test.theme}
                inputRef={node => titleTest = node}
                variant="outlined" 
                fullWidth={true} 
              />
            </Grid>
            <Grid item style={{padding:5}} xs={2} sm={4} lg={4}>
              <TextField
                defaultValue = {props.test.tagsGroups}
                disabled={true}
                fullWidth={true} 
                variant="outlined"
                label="Группы"
              />
            </Grid>

            <Grid style={{padding:5}} item xs={6} sm={6}  lg={2}>
                <TextField
                  label="Время" 
                  defaultValue={props.test.time}
                  inputRef={node => timeTest = node}
                  variant="outlined"
                  type="number"
                  fullWidth={true} 
                />
              </Grid>
              <Grid style={{padding:5}} item xs={6} sm={6}  lg={4}>
                <TextField
                  type = "number"
                  label="Количество выдаваемых вопросов" 
                  defaultValue={props.test.maxTasksWork}
                  inputRef={node => maxTasks = node}
                  variant="outlined" 
                  fullWidth={true} 
                />
              </Grid>
              <Grid style={{padding:5}} item xs={6} sm={6}  lg={4}>
                <TextField
                  label="Попытки" 
                  defaultValue={props.test.attempts}
                  inputRef={node => attemptsTest = node}
                  variant="outlined" 
                  variant="outlined" 
                  fullWidth={true} 
                />
              </Grid>
              <Grid style={{padding:5}} item xs={12} sm={6}  lg={4}>
              <div>
                <input style={{display: 'none'}}
                  id="edit-manual"
                  onChange={()=>{setChangeFile(true)}}
                  multiple
                  type="file"
                />
                <label htmlFor="edit-manual">
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
                key={task.id} 
                task={task}
                setTasks={setTasks}
              />
            )}
          </DialogContent>
      </Dialog>
    </div>
  );
}
