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
  let finalMark = Math.round(props.correctAnswerCounter * 100 / props.maxScore)
  let markStyle = (markObj)=>{
    if(markObj.value >= 90) return markObj.card ? 'greenShadowMark' : 'greenMark'
    if(markObj.value >= 75) return markObj.card ? 'salatShadowMark' : 'salatMark'
    if(markObj.value >= 60) return markObj.card ? 'orangeShadowMark' : 'orangeMark'
    if(markObj.value >= 0) return markObj.card ? 'redShadowMark' : 'redMark'
    return 'noneShadowMark'
  }
  
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
           Итоговая оценка: 
          <span className={markStyle({card: false, value:finalMark})}>{finalMark}%</span>
          </Typography>
          <Typography style ={{marginBottom:'5px'}}>
            Осталось попыток:
          </Typography>
          <Typography style ={{marginBottom:'5px'}}>
            Потрачено времени: {spendTime.min < 10 ? "0" +spendTime.min : spendTime.min}:{spendTime.sec < 10 ? "0" +spendTime.sec : spendTime.sec}
          </Typography>

          <Typography style ={{marginBottom:'5px'}}>
            Осталось времени: {props.timerText.min < 10 ? "0" +props.timerText.min : props.timerText.min}:{props.timerText.sec< 10 ? "0" +props.timerText.sec : props.timerText.sec}
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
