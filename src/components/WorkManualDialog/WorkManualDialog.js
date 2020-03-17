import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import DescriptionIcon from '@material-ui/icons/Description'
import Typography from '@material-ui/core/Typography'
import PDFViewer from 'pdf-viewer-reactjs'

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


const TableDialogEdit = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="edit" onClick ={handleClickOpen}>
        <DescriptionIcon/>
      </IconButton>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Справка по тесту
        </DialogTitle>
        <DialogContent dividers>
           <PDFViewer style={{height:'500px', width:'100%'}} document={{url: "file://E:/programming/Tester-students/public/assets/doc/pres.pdf"}}/> 
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TableDialogEdit


{/* src="file://E:/programming/Tester-students/public/assets/doc/док.pdf" */}
{/* src="file://D:/Diplom_2.0/Tester-students/public/assets/doc/док.pdf" */}