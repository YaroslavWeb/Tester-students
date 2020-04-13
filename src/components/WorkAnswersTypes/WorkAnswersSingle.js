import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid'
const WorkAnswersSingle =(props) => {
    const handleChange = event => {
        props.setAnswerStudent([event.target.value]);
    };    
    return(
        <FormControl fullWidth={true}>
            <FormLabel style={{color:'black', padding:'15px',fontWeight:'bold'}}>Выберите один ответ</FormLabel>
            <Grid container direction="row" justify="space-between" alignItems="flex-start" style={{marginTop:'10px', padding:'15px'}}>
                {props.actionTask.answers.map(answer=>{
                    return(
                        <Grid item xs={12} sm={6} md={3} key={answer.id}>
                            <label className="form-radio-hidden">
                            <input
                                name={props.actionTask.id}
                                onChange={handleChange}
                                type="radio"
                                value={answer.id} 
                            />
                            <span className="radio"></span> 
                            {answer.answer} 
                            </label>
                           
                        </Grid>
                    )
                })}
            </Grid>
        </FormControl>
    )
}
export default WorkAnswersSingle;