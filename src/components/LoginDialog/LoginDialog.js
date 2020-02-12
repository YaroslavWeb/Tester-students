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
import TextField from '@material-ui/core/TextField'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
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

const LoginDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let inputLogin,inputPassword;
  
  return (
    <div> 
      <IconButton color = "inherit" onClick={handleClickOpen}>
        <AccountCircleIcon/>
      </IconButton>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Авторизация
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Логин" 
            inputRef={node => inputLogin = node}
            variant="outlined" 
            multiline
            fullWidth={true} 
            margin="normal" 
          />
          <TextField
            label="Пароль"
            type = "password"
            inputRef={node => inputPassword = node}
            variant="outlined" 
            fullWidth={true} 
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleClose}>
            Отмена
          </Button>
           <Link to='/students'>
           <Button
            onClick={ () => {}}
            autoFocus
            variant="outlined"
            style ={{color: '#006F51'}}>
            Войти
            </Button>
           </Link> 
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default LoginDialog

