import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom'


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
      {props.logoutStudent == null ? 
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Подтвердить выход
        </DialogTitle>
        <DialogContent dividers>
          Вы действительно хотите выйти?
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleClose}>
            Отмена
          </Button>
          <Link to='/'>
          <Button
            onClick={ () => {}}
            autoFocus
            variant="outlined"
            style ={{color: '#006F51'}}> 
              Подтверждаю
            </Button>
            </Link> 
        </DialogActions>
      </Dialog>
        : <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Подтвердить выход
        </DialogTitle>
        <DialogContent dividers>
          Вы действительно хотите выйти?
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleClose}>
            Отмена
          </Button>
          
          <Button
            onClick={
              ()=>{
                props.setExitVisible(false)
                props.setCurTest([])
                props.setStud(null)
                props.setAuthVisible(true)
              }}
            autoFocus
            variant="outlined"
            style ={{color: '#006F51'}}> 
              Подтверждаю
            </Button>
            
        </DialogActions>
        </Dialog>}  
      </div>
        );
      }
export default LogoutDialog

