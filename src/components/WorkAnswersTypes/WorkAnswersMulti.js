import React from 'react'

import Checkbox from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const WorkAnswersSingle =(props) => {

    return(
        <FormControl>
            <FormLabel>Выберите один или несколько ответов</FormLabel>
                {props.actionTask.answers.map(answer=>{
                    return(
                        <FormControlLabel value={answer.answer} control={<Checkbox />} label={answer.answer} />
                    )
                })}
        </FormControl>
        
    )
}
export default WorkAnswersSingle;