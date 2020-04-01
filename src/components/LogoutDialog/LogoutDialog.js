import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom'

const LogoutDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div> 
      <IconButton color = "inherit" onClick={handleClickOpen}>
        <ExitToAppIcon/>
      </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Подтвердить выход
          <IconButton style = {{position:'absolute', top: '2px', right : "5px"}} aria-label="close"  onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent dividers style={{padding:'25px'}}>
          Вы действительно хотите выйти?
        </DialogContent>
        <DialogActions style = {{paddingTop:'15px', paddingBottom:'15px'}}>
          <Button variant="outlined" style = {{display:'flex', justifyContent:'space-between', marginRight:'15px',color: 'black', borderColor:'#83898B'}} 
          onClick={handleClose}>
            Отмена
          </Button>
         { props.logoutStudent == null ?
          <Link to='/'>
          <Button
            onClick={ () => {}}
            variant="outlined"
            style ={{color: '#006F51',borderColor:'#006F51'}}> 
              Подтверждаю
            </Button>
            </Link> :  
            <Button onClick={()=>{
                  props.setCurTest([])
                  props.setStud(null)
                  props.setAuthVisible(true)
                }}
              autoFocus
              variant="outlined"
              style ={{color: '#006F51', borderColor:'#006F51'}}> 
                Подтверждаю
              </Button> }
        </DialogActions>
      </Dialog>
    </div>)}

export default LogoutDialog

