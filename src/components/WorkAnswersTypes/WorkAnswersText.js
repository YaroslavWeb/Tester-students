import React from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const WorkAnswersSingle =(props) => {
    let inputAnswerText

    return(
        <FormControl>
            <FormLabel style={{color:'black', padding:'15px',fontWeight:'bold'}}>Напишите ответ</FormLabel>
            <TextField
                style={{color:'black',fontWeight:'bold',display:'flex',justifyContent:'center', margin:"15px"}} 
                id="outlined-basic"  
                label="Ваш ответ" 
                variant="outlined" 
                margin="normal"
                onChange={()=>{props.setAnswerStudentText(inputAnswerText.value)}}
                inputRef={node => inputAnswerText = node}
            />
        </FormControl>
    )
}
export default WorkAnswersSingle;