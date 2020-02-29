import React from 'react'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const WorkAnswersSingle =(props) => {
    const [value, setValue] = React.useState();

    const handleChange = event => {
      setValue(event.target.value);
    };

    return(
        <FormControl>
            <FormLabel>Выберите один ответ</FormLabel>
            <RadioGroup value={value} onChange={handleChange}>
                {props.actionTask.answers.map(answer=>{
                    return(
                        <FormControlLabel value={answer.answer} control={<Radio />} label={answer.answer} />
                    )
                })}
            </RadioGroup>
        </FormControl>
    )
}
export default WorkAnswersSingle;