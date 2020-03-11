import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let editFIO, editGroup, editMarks=[], newMarks=[]; 
  
  return (
    <div>
      <IconButton aria-label="edit" onClick ={handleClickOpen}>
        <EditIcon/>
      </IconButton>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Изменить студентика
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
          <hr/>
          <Typography variant="h6">Оценки</Typography>
          {props.student.marks.map(mark =>{
            return(
              <TextField
                key={mark.id}
                defaultValue={mark.mark}
                inputRef={node => editMarks[mark.id] = node}
                margin="normal"
                fullWidth={true}
                label={mark.theme}
                variant="outlined" 
              />
            )
          })}
        </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleClose}>
            Отмена
          </Button>
          <Button
            onClick={
              e=>{
                editMarks.forEach(element => {
                  newMarks.push(element.value)
                });
                e.preventDefault()
                if(editFIO.value !== '' && editGroup.value !== '')
                {
                    props.editStudent(props.student._id, editFIO.value, editGroup.value, newMarks)
                    handleClose()
                    props.setAlert({visible: true, text:'Студент успешно изменён!', severity: 'success'})
                    setTimeout(() => {props.setAlert({visible: false, text:' ', severity: 'success'})}, 5000);
                }  
                else {
                    props.setAlert({visible: true, text:'Некорректные данные!',severity: 'error'})
                    setTimeout(() => {props.setAlert({visible: false, text:' ',severity: 'error'})}, 5000);
                }
            }}
            autoFocus
            variant="outlined"
            color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TableDialogEdit