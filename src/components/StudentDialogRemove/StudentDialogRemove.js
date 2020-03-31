import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete';

import StateContext from '../../context/StateContext'

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

const StudentDialogRemove = (props) => {

  const [open, setOpen] = React.useState(false)
  const {students} = React.useContext(StateContext)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let inputGroupForDelete;

 

  function uniques(array, key) {
    return array.reduce((acc, curr) => {
        if (!acc.find(item => item[key] === curr[key])) { acc.push(curr); }
        return acc;
      }, []);
    }

  return (
    <div>
      <Button size="large" style={{margin:'10px'}} color="secondary" startIcon={<DeleteIcon />} variant="outlined" onClick={handleClickOpen}>
        Удалить группу
      </Button>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Удалить группу
        </DialogTitle>
        <DialogContent dividers>
        <Autocomplete
          options={uniques(students, 'group')}
          getOptionLabel={option => option.group}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField
              {...params}
              label="Группа"
              variant="outlined" 
              fullWidth
              inputRef={node => inputGroupForDelete = node}
            />
          )}
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
                if(inputGroupForDelete.value !== ''){
                  props.removeStudentsByGroup(inputGroupForDelete.value);
                  handleClose()
                  props.setAlert({visible: true, text:'Группа успешно удалена!', severity: 'success'})
                    setTimeout(() => {props.setAlert({visible: false, text:' ', severity: 'success'})}, 5000);
                }  else {
                    props.setAlert({visible: true, text:'Некорректные данные!',severity: 'error'})
                    setTimeout(() => {props.setAlert({visible: false, text:' ',severity: 'error'})}, 5000);
                  }
              }
            }
            autoFocus
            color='secondary'
            variant='outlined' 
            >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StudentDialogRemove