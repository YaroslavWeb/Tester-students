import React from 'react';
import Grid from '@material-ui/core/Grid'

import TeacherHeader from '../../components/TeacherHeader'

const Info = props =>{
  return (
    <div>
     <TeacherHeader/>
     <Grid container style={{padding:'20px'}}>
      <Grid item xs={12}>
        Страница 'Студенты':
      </Grid>
      <Grid item xs={12}>
        Страница "Тесты":
      </Grid>
      <Grid item xs={12}>
        Рекомендации:
      </Grid>
     </Grid>
    </div>
  )
} 
export default Info;