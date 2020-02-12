import React from 'react'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const WorkAnswersSingle =(props) => {
    const [value, setValue] = React.useState('female');

    const handleChange = event => {
      setValue(event.target.value);
    };
    return(
        <FormControl>
            <FormLabel>Выбор ответа</FormLabel>
            <RadioGroup aria-label="gender" value={value} onChange={handleChange}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    )
}
export default WorkAnswersSingle;