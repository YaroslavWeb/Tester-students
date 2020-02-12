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
import TestCancelDialog from './TestCancelDialog';
import StateContext from '../../context/StateContext'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton';

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
  
  let titleTest, timeTest, attemptsTest;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
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
        <DialogTitle>
          <AppBar className={classes.appBar}>
            <Toolbar> 
               <TestCancelDialog closeConstructor = {handleClose}/>
              <Typography variant="h6" className={classes.title}>
                Редактирование теста
              </Typography>
              <Button autoFocus color="inherit" onClick={()=>{
                if(titleTest.value!=="" && timeTest.value!=="" && attemptsTest.value!==""){
                editTest(props.test.id, titleTest.value, timeTest.value, attemptsTest.value)
                handleClose()                
              } else {
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
            <Grid item style={{padding:5}} xs={12} sm={12} md={6} lg={6}>
              <TextField
                label="Название теста" 
                defaultValue={props.test.theme}
                inputRef={node => titleTest = node}
                variant="outlined" 
                fullWidth={true} 
              />
            </Grid>

              <Grid style={{padding:5}} item xs={6} sm={4} md={2} lg={2}>
                <TextField
                  label="Время" 
                  defaultValue={props.test.time}
                  inputRef={node => timeTest = node}
                  variant="outlined"
                  type="number"
                  fullWidth={true} 
                />
              </Grid>
              <Grid style={{padding:5}} item xs={6} sm={4} md={2} lg={2}>
                <TextField
                  label="Попытки" 
                  defaultValue={props.test.attempts}
                  inputRef={node => attemptsTest = node}
                  variant="outlined" 
                  variant="outlined" 
                  fullWidth={true} 
                />
              </Grid>
              <Grid style={{padding:5}} item xs={12} sm={4} md={2} lg={2}>
                <Button
                  style={{height:'80%', width:'100%', color: '#FFFFFF', borderColor:'#006F51',background: '#006F51'}}
                  variant="contained" 
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  Справка
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
      </Dialog>
    </div>
  );
}
