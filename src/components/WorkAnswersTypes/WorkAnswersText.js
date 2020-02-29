import React from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const WorkAnswersSingle =() => {
    return(
        <FormControl>
            <FormLabel>Напишите ответ</FormLabel>
            <TextField id="outlined-basic" label="Ваш ответ" variant="outlined" margin="normal"/>
        </FormControl>
    )
}
export default WorkAnswersSingle;