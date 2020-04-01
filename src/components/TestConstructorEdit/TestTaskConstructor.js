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
              fullWidth={true}
              multiline 
              onChange={event=>{props.task.question = event.target.value}}
              rows={8}
              label={`Задание №${props.task.id}`}
              defaultValue={props.task.question}
              variant="outlined"
              InputProps={{
              startAdornment:(
                <div>
                  <input 
                    style={{display: 'none'}}
                    id={"img-question"+props.task.id}
                    onChange={event=>{props.task.imgSrc = event.target.files[0].path}}
                    accept="image/*"
                    multiple
                    type="file"
                  />
                  <label htmlFor={"img-question"+props.task.id}>
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
            <TextField 
              defaultValue={props.task.score}
              onChange={event=>{props.task.score = event.target.value}}
              fullWidth={true} 
              type = "number" 
              label="Кол-во баллов" 
              variant="outlined" 
              margin="dense"
            /> 
            <Autocomplete
              disabled
              options={taskTypes}
              getOptionLabel={option => option.taskType}
              defaultValue={
                props.task.type == taskTypes[0].taskType 
                ? taskTypes[0]
                : props.task.type == taskTypes[1].taskType
                ? taskTypes[1]
                : taskTypes[2]
              }
              renderInput={params => (
              <TextField {...params} 
                label='Тип ответа'
                margin="dense"
                variant="outlined" 
                fullWidth={true}
              />
            )}/>
          </Grid>
          {props.task.answers.map((answer,index)=>{
            return(
              <Grid key={answer.id} style={{padding:5}} item xs={6} md={4} lg={3}>
                <TextField
                  onChange={event=>{answer.answer = event.target.value}}
                  defaultValue={answer.answer}
                  fullWidth={true}
                  label={`Ответ №${index+1}`}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FormControlLabel
                          control={
                          <Checkbox 
                            checked = {answer.correct}
                            icon = {<DoneOutlineIcon />} 
                            checkedIcon = {<DoneIcon />} 
                          />}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              )
            })}
        </Grid>
      </Slide>
    )
  }
  export default TestTaskConstructor
  