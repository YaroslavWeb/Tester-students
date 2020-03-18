import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const ExitWorkDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div> 
      <IconButton aria-label="close" color = "inherit" onClick={handleClickOpen}>
        <CloseIcon />
      </IconButton>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Покинуть тест
          <IconButton aria-label="close" style = {{position:'absolute', top: '2px', right : "5px"}}  onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div style={{marginBottom:'5px'}}>
            Вы действительно хотите завершить тестирование? 
            <br/>
            При досрочном выходе из теста попытка будет зачтена без выставления оценки.
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleClose}>
            Отмена
          </Button>
          <Button
            onClick={()=>{window.location.replace('#/?student_id='+props.workStudent._id)}}
            autoFocus
            variant="outlined"
            style ={{color: '#006F51', borderColor:'#006F51'}}>
             Подтверждаю
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ExitWorkDialog