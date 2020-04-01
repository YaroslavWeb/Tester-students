import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import StateContext from '../../context/StateContext'
import TextField from '@material-ui/core/TextField'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(4),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: theme.palette.grey[500],
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

const TableDialogEdit = (props) => {
  const {tests} = React.useContext(StateContext)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let editFIO, editGroup, listCounter = 0,
      editMarks=[], newMarks=[],  editAttempts=[], newAttempts=[]; 
  
  return (
    <div>
      <IconButton aria-label="edit" onClick ={handleClickOpen}>
        <EditIcon/>
      </IconButton>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Изменить информацию о студенте
        </DialogTitle>
        <DialogContent dividers>
        <form autoComplete="off">
          <TextField 
            defaultValue={props.student.name}
            inputRef={node => editFIO = node}
            margin="normal" 
            fullWidth={true} 
            id="outlined-basic" 
            label="ФИО" 
            variant="outlined" 
          />
          <TextField
            defaultValue={props.student.group}
            inputRef={node => editGroup = node}
            margin="normal"
            fullWidth={true}
            id="outlined-basic"
            label="Группа"
            variant="outlined" 
          />
          {tests.map(test => {
            listCounter++
            const markArray = props.student.marks.filter(mark => mark.id_test === test._id)
            if(markArray.length){
              return(
                <Grid container key={test._id}>
                  <Grid item xs={12} style={{borderTop: '2px solid #E0E0E0', paddingTop:'5px'}}>
                    <Typography variant="h6">{test.theme}</Typography>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <TextField
                      defaultValue={markArray[0].mark}
                      inputRef={node => editMarks[listCounter] = node}
                      margin="normal"
                      label='Оценка'
                      variant="outlined" 
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      defaultValue={markArray[0].attempts}
                      inputRef={node => editAttempts[listCounter] = node}
                      margin="normal"
                      label='Попытки'
                      variant="outlined" 
                    />
                  </Grid>
                </Grid>
                )
            }
            else{return null}
          })}
        </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}
          style = {{color: 'black', borderColor:'#83898B'}}>
            Отмена
          </Button>
          <Button
            onClick={()=>{
                editMarks.forEach(item => {newMarks.push(item.value)})
                editAttempts.forEach(item => {newAttempts.push(item.value)})
                if(editFIO.value !== '' && editGroup.value !== '')
                {
                  props.editStudent(props.student._id, editFIO.value, editGroup.value, newMarks, newAttempts)
                  handleClose()
                  props.setAlert({visible: true, text:'Студент успешно изменён!', severity: 'success'})
                  setTimeout(() => {props.setAlert({visible: false, text:' ', severity: 'success'})}, 5000);
                }  
                else {
                  props.setAlert({visible: true, text:'Некорректные данные!',severity: 'error'})
                  setTimeout(() => {props.setAlert({visible: false, text:' ',severity: 'error'})}, 5000);
                }
            }}
            variant="outlined"
            style ={{color: '#006F51',borderColor:'#006F51'}}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TableDialogEdit