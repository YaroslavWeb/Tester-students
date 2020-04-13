import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid'
const WorkAnswersSingle =(props) => {
    let getAsnwers = event => {
        event.target.checked
        ?props.setAnswerStudent([...props.answerStudent, event.target.value])
        :props.setAnswerStudent(props.answerStudent.filter(item => item != event.target.value))
    }

    return(
        <FormControl>
            <FormLabel style={{color:'black', padding:'15px',fontWeight:'bold'}}>Выберите один или несколько ответов</FormLabel>
            <Grid container direction="row" justify="space-between" alignItems="flex-start" style={{marginTop:'2vh', padding:'15px',borderRadius: '25px'}}>
                {props.actionTask.answers.map(answer=>{
                    return(
                        <Grid item xs={12} sm={6} md={3} key={answer.id}>
                            <FormControlLabel 
                                onChange={getAsnwers}
                                value={answer.id} 
                                control={<Checkbox color="primary"/>} 
                                label={answer.answer} 
                            />
                        </Grid>
                    )
                })} 
            </Grid>
        </FormControl>
        
    )
}
export default WorkAnswersSingle;