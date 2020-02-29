import React from 'react'
import StateContext from '../../context/StateContext'
import MainHeader from '../../components/MainHeader'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    card: {
      minWidth: 275,
      boxShadow: '0.4em 0.4em 5px rgba(122,122,122,0.5)',
    },
    pos: {
      marginBottom: 12,
    },
  });
  const Authorization =(props) => {
    const classes = useStyles();
    const {students,tests } = React.useContext(StateContext)
      return (      
        <div>
          {window.location.href}
          <MainHeader/>
            <div style={{margin:'20px'}}>
            <Autocomplete
                options={students}
                getOptionLabel={option => option.name}
                style={{width: '30%'}}
                renderInput={params => (
                  <TextField {...params} 
                  label='ФИО'
                  variant="outlined" fullWidth 
                 />
                )}/>
            </div>
        </div>
      )
    }
    export default Authorization
  