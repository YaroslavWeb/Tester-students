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

const db = window.require('electron').remote.getGlobal('database');


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
  let spendTimeSec = (props.workTest.time * 60) - ((Number(props.timerText.min)*60)+Number(props.timerText.sec))
  let spendTime = {min:Math.floor(spendTimeSec/60), sec:spendTimeSec%60}

  let setMarkStudent = () =>{    
    // Ищем нужну оценку у студента
      props.workStudent.marks.forEach(mark =>{
        // Находим
        if (mark.id_test == props.workTest._id){
          // Если оценка больше оценки, которая уже имеется
          // ТО заносим новую оценку в БД
            if(props.finalMarkStudnet > Number(mark.mark)){
            let newMark = {
              ...mark,
              attempts:Number(mark.attempts),
              mark:props.finalMarkStudnet
            }
            let newMarks = props.workStudent.marks.map(mark=>{
              if(mark.id == newMark.id) 
                return (newMark) 
              else 
                return (mark)
            })

            let newStudent = {
              ...props.workStudent,
              marks: newMarks
            }
            db.students.update({_id:props.workStudent._id}, newStudent)
            db.students.find({}, (err, docs)=>{props.setStudents(docs)})
          }
        }
      })
  }
  let markStyle = (markObj)=>{
    if(markObj.value >= 90) return markObj.card ? 'greenShadowMark' : 'greenMark'
    if(markObj.value >= 75) return markObj.card ? 'salatShadowMark' : 'salatMark'
    if(markObj.value >= 60) return markObj.card ? 'orangeShadowMark' : 'orangeMark'
    if(markObj.value >= 0) return markObj.card ? 'redShadowMark' : 'redMark'
    return 'noneShadowMark'
  }
  setMarkStudent()
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
           Итоговая оценка:<span className={markStyle({card: false, value:props.finalMarkStudnet})}>{props.finalMarkStudnet}%</span> 
          </Typography>
          <Typography style ={{marginBottom:'5px',  paddingRight:'80px'}} >
           Осталось попыток: {props.allAttempts.studAttempts} из {props.allAttempts.maxAttempts}
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
            style={{alignSelf: 'flex-end', color: '#006F51', borderColor:'#006F51'}} 
          > 
            Покинуть тест
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}
