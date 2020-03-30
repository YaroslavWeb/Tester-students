import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
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
export default function CustomizedDialogs(props){
  let spendTimeSec = (props.workTestTime * 60) - ((Number(props.timerText.min)*60)+Number(props.timerText.sec))
  let spendTime = {min:Math.floor(spendTimeSec/60), sec:spendTimeSec%60}
  return (
    <div>
      <Dialog  aria-labelledby="customized-dialog-title" open={props.openCompleteDialog}>
        <DialogTitle id="customized-dialog-title">
          Тест завершен!
        </DialogTitle>
        <MuiDialogContent dividers style= {{paddingTop:'20px',  paddingRight:'80px', paddingBottom:'40px', paddingLeft:'10px'}}>
          <Typography style ={{marginBottom:'5px',  paddingRight:'80px'}} >
           Колличество баллов: {props.correctAnswerCounter} из {props.maxScore}
          </Typography>
          <Typography style ={{marginBottom:'5px',  paddingRight:'80px'}} >
           Итоговая оценка: {props.finalMarkStudnet}%
          </Typography>
          <Typography style ={{marginBottom:'5px'}}>
            Потрачено времени: {spendTime.min}:{spendTime.sec}
          </Typography>
          <Typography style ={{marginBottom:'5px'}}>
            Осталось времени: {props.timerText.min}:{props.timerText.sec}
          </Typography>
        </MuiDialogContent>
        <MuiDialogActions>
          <Button autoFocus  variant="outlined"  
          onClick={()=>{window.location.replace('#/?student_id='+props.workStudent._id)}}
          style={{alignSelf: 'flex-end', color: '#006F51', borderColor:'#006F51'}} > 
            Покинуть тест
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}
