import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'

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

const StudentDialogAdd = (props) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let inputFIO,inputGroup;
  
  return (
    <div>
      <Button style={{margin:'10px', color: '#006F51' , borderColor:'#006F51'  } } size="large" startIcon={<PersonAddIcon />} variant="outlined" onClick={handleClickOpen}>
        Добавить студентов
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Добавить студентов
        </DialogTitle>
        <DialogContent dividers>
        <TextField
              label="ФИО" 
              inputRef={node => inputFIO = node}
              variant="outlined" 
              multiline
              rows="5"
              fullWidth={true} 
              margin="normal" 
            />
            <TextField
              label="Группа"
              inputRef={node => inputGroup = node}
              variant="outlined" 
              fullWidth={true} 
              margin="normal"
            />
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" 
          onClick={handleClose}
          style = {{color: 'black', borderColor:'#83898B'}}>
          
            Отмена
          </Button>
          <Button
            onClick={
              e=>{
                e.preventDefault()
                if(inputFIO.value !== '' 
                && inputGroup.value !== ''
                  ){
                    props.addStudent(inputFIO.value, inputGroup.value)
                    handleClose()
                    props.setAlert({visible: true, text:'Студент успешно добавлен!',severity: 'success'})
                    setTimeout(() => {props.setAlert({visible: false, text:' ',severity: 'success'})}, 5000);
                  } else {
                    props.setAlert({visible: true, text:'Некорректные данные!',severity: 'error'})
                    setTimeout(() => {props.setAlert({visible: false, text:' ',severity: 'error'})}, 5000);
                  }
              }
            }
            autoFocus
            variant="outlined"
            style = {{color: '#006F51', borderColor:'#006F51'}}>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StudentDialogAdd
