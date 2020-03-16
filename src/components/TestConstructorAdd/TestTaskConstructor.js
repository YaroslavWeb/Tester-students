import React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import DoneIcon from '@material-ui/icons/Done'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputAdornment from '@material-ui/core/InputAdornment'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
const TestTaskConstructor = (props) => {
  const taskTypes = [
    {taskType:"Одиночный выбор"},
    {taskType:"Множественный выбор"},
    {taskType:"Ввод текста"}
  ]
      return (
        <Slide direction="right" timeout={1000} in={true} mountOnEnter unmountOnExit>
          <Grid container style={{padding:'10px'}}>
            <Grid style={{padding:5}} item xs={12} md={8}>
              <TextField
               inputRef={node => props.task.question = node}
               fullWidth={true}
               multiline rows={8}
               label={props.task.title}
               variant="outlined"
               InputProps={{
                startAdornment: (
                  <div >
                <input style={{display: 'none'}}
                id="contained-button-file"
                  accept="image/*"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span" id="taskBtnAddImg">
                    <AddPhotoAlternateIcon/>
                  </Button>
                </label>
                </div>
                          
                ),
              }}
               /> 
            </Grid>
            <Grid style={{padding:5}} item xs={12} md={4}>
              <TextField inputRef={node => props.task.score = node} fullWidth={true} type = "number" label="Кол-во баллов" variant="outlined" margin="dense"/> 
              <TextField inputRef={node => props.task.section = node} fullWidth={true} type = "number" label="Тема вопроса" variant="outlined" margin="dense"/> 
              <Autocomplete
                options={taskTypes}
                getOptionLabel={option => option.taskType}
                renderInput={params => (
                <TextField {...params} 
                  label='Тип ответа'
                  margin="dense"
                  inputRef={node => props.task.type = node}
                  variant="outlined" 
                  fullWidth={true}
                />
              )}/>
            </Grid>
            {props.task.answers.map(answer=>{
              return(
              <Grid key={answer.id} style={{padding:5}} item xs={6} md={4} lg={3}>
                <TextField
                  fullWidth={true}
                  label={answer.title}
                  inputRef={node => answer.answer = node}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FormControlLabel
                          control={<Checkbox inputRef={node => answer.correct = node}
                          icon={<DoneOutlineIcon />} 
                          checkedIcon={<DoneIcon />} />}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              )
            })}
            <Grid style={{padding:5}} item xs={6} md={4} lg={3}>
              <ButtonGroup style={{minHeight:'55px'}} fullWidth={true} size="large">
                <Button onClick={()=>{props.removeAnswer(props.task.id)}} color="secondary" variant="outlined"><RemoveIcon/></Button>
                <Button onClick={()=>{props.addAnswer(props.task.id)}} variant="outlined" style={{color: '#006F51', borderColor:'#006F51'}}><AddIcon/></Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Slide>
      )
    }
    export default TestTaskConstructor
  