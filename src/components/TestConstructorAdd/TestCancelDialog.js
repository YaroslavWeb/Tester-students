import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const TestCancelDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
        <div>
         <IconButton edge="start" color="inherit" onClick={handleClickOpen} aria-label="close">
             <CloseIcon />
         </IconButton>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Подтвердить выход
        </DialogTitle>
        <DialogContent dividers>
          Вы действительно хотите выйти без сохранения теста?
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" 
          onClick={handleClose}
          style = {{color: 'black', borderColor:'#83898B'}}>
            Отмена
          </Button>
          <Button
            onClick= {() => {handleClose(); props.closeConstructor()}}
            autoFocus
            variant="outlined"
            style ={{color: '#006F51',  borderColor:'#006F51'}}> 
            Подтверждаю
            </Button>
        </DialogActions>
      </Dialog>
        </div>
  )
}

export default TestCancelDialog