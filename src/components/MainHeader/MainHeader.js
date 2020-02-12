import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoginDialog from '../LoginDialog'

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
}));

export default function MainHeader() {
  const classes = useStyles();
  return (
    <div>
    <div className={classes.root}>
      <AppBar position="static" style = {{background:'#006F51'}}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant='h5'>
            Основы программирования
          </Typography>
			
           <LoginDialog/>
        </Toolbar>
     </AppBar>
   </div>
    </div>
  );
}